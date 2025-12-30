import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { Auth } from '../../auth/services/auth';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../services/sidebar-service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
loggedInUser!: Observable<User | null>
private baseUrl = environment.apiUrl;

constructor(private authSer: Auth, private sidebarSer: SidebarService){}

ngOnInit(): void {
    this.loggedInUser = this.authSer.currentUser$;
}

  getImageUrl(path: string | undefined): string{
    return path ?`${this.baseUrl}${path}` : "assets/img/img-1.jpg"
  }

  toggleSidebar(){
    this.sidebarSer.toggleSidebar();
  }

}
