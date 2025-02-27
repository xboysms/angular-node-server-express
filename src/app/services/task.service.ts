import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl+'/addTask', task, { headers: this.getAuthHeaders() });
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl+'/getTasks', { headers: this.getAuthHeaders() });
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl+'/getTaskById'}/${id}`, { headers: this.getAuthHeaders() });
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl+'/updateTask'}/${task.id}`, task, { headers: this.getAuthHeaders() });
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl+'/deleteTask'}/${id}`, { headers: this.getAuthHeaders() });
  }
}
