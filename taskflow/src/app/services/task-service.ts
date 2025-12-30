import { Injectable } from '@angular/core';
import { TaskItem } from '../models/taskItem';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TaskStats } from '../models/taskItem';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl = `${environment.apiUrl}/api/task`;

   constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<TaskItem[]>(this.baseUrl);
  }

  getByCategory(categoryId: string) {
    return this.http.get<TaskItem[]>(`${this.baseUrl}?categoryId=${categoryId}`);
  }

  create(task: Partial<TaskItem>) {
    return this.http.post<TaskItem>(this.baseUrl, task);
  }

  update(taskId: string, task: Partial<TaskItem>) {
    return this.http.put<TaskItem>(`${this.baseUrl}/${taskId}`, task);
  }

  delete(taskId: string) {
    return this.http.delete(`${this.baseUrl}/${taskId}`);
  }

  getStats() {
  return this.http.get<TaskStats>(`${this.baseUrl}/stats`);
}

}
