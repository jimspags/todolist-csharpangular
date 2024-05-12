import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Todo } from '../../models/todo-model';
import { AddTodoModel } from '../../models/add-todo-model';
import { UpdateTodoModel } from '../../models/update-todo-model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  apiUrl: string = 'https://localhost:7274/api/todo';

  constructor(private httpClient: HttpClient) {}

  public getTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(this.apiUrl);
  }

  public addTodo(todo: AddTodoModel): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl, todo);
  }

  public deleteTodo(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/${id}`);
  }

  public getTodo(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/${id}`);
  }

  public updateTodo(todo: UpdateTodoModel): Observable<any> {
    return this.httpClient.put<any>(`${this.apiUrl}/${todo.id}`, todo);
  }
}
