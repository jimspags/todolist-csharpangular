import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoService } from './services/todo-service/todo.service';
import { Todo } from './models/todo-model';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AddTodoModel } from './models/add-todo-model';
import { NgToastModule, NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    CommonModule,
    FormsModule,
    NgToastModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [TodoService],
})
export class AppComponent implements OnInit {
  title = 'UI';
  todos: Todo[] = []; // List of todo
  todo: AddTodoModel = new AddTodoModel(); // Todo to add
  showUpdateModal: boolean = false;
  todoToUpdate: Todo = new Todo();

  /**
   *
   */
  constructor(
    private todoService: TodoService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos() {
    this.todoService
      .getTodos()
      .pipe(
        catchError((error) => {
          if (error instanceof ErrorEvent) {
            console.error(error);
          } else {
            console.error(error);
          }
          return [];
        })
      )
      .subscribe((result: Todo[]) => {
        this.todos = result;
      });
  }

  addTodo() {
    this.todoService
      .addTodo(this.todo)
      .pipe(
        catchError((error) => {
          if (error instanceof ErrorEvent) {
            console.error(error);
          } else {
            console.error(error);
          }
          return error;
        })
      )
      .subscribe((result: any) => {
        console.log(result);
        this.getTodos();

        this.toast.success({
          detail: 'Success',
          summary: 'Todo Added',
          duration: 5000,
        });

        this.todo = new AddTodoModel();
      });
  }

  deleteTodo(id: string) {
    this.todoService
      .deleteTodo(id)
      .pipe(
        catchError((error) => {
          if (error instanceof ErrorEvent) {
            console.error(error);
          } else {
            console.error(error);
          }
          return error;
        })
      )
      .subscribe((result: any) => {
        console.log(result);
        this.getTodos();
      });
  }

  updateTodo(todo: Todo) {
    this.toggleUpdateModal();
    this.todoToUpdate = todo;
  }

  saveUpdateTodo() {
    this.todoService
      .updateTodo(this.todoToUpdate)
      .pipe(
        catchError((error) => {
          if (error instanceof ErrorEvent) {
            console.error(error);
          } else {
            console.error(error);
          }

          return error;
        })
      )
      .subscribe((result: any) => {
        console.log(result);

        this.toggleUpdateModal();

        this.toast.success({
          detail: 'Success',
          summary: 'Todo Updated',
          duration: 5000,
        });

        this.getTodos();
      });
  }

  toggleUpdateModal() {
    this.showUpdateModal = !this.showUpdateModal;
  }
}
