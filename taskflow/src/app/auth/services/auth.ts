import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private baseUrl = `${environment.apiUrl}/api/auth`;
 private currentUserSource = new BehaviorSubject<User | null>(this.getUserFromStorage());
  currentUser$ = this.currentUserSource.asObservable();

    constructor(private http: HttpClient) {}

    register(data: FormData) {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  login(data: any) {
    return this.http.post<User>(`${this.baseUrl}/login`, data).pipe(
      map(user => {
        if (user && user.token) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user;
      })
    );
  }

  getUserFromStorage(): User | null {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }

  get isProfileComplete(): boolean {
    const u = this.getUserFromStorage();
    if (!u) return false;
    return !!(u.imageUrl);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  get isLoggedIn(): boolean {
  return this.getUserFromStorage() !== null;
}

}
