import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoService } from './services/todo-service/todo.service';
import { Todo } from './models/todo-model';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs';
import { FormsModule, NgForm } from '@angular/forms';
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
  showUpdateModal: boolean = false;
  todoToUpdate: Todo = new Todo();
  isAddFormSubmitted: boolean = false;

  todoToAdd: any = {
    title: '',
    description: '',
  };

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
            this.toast.error({
              detail: 'Error',
              summary: error.message,
              duration: 5000,
            });
          } else {
            this.toast.error({
              detail: 'Error',
              summary: error.message,
              duration: 5000,
            });
          }
          return [];
        })
      )
      .subscribe((result: Todo[]) => {
        this.todos = result;
      });
  }

  addTodo(newTodo: AddTodoModel) {
    this.todoService
      .addTodo(newTodo)
      .pipe(
        catchError((error) => {
          if (error instanceof ErrorEvent) {
            this.toast.error({
              detail: 'Error',
              summary: error.message,
              duration: 5000,
            });
          } else {
            this.toast.error({
              detail: 'Error',
              summary: error.message,
              duration: 5000,
            });
          }
          return error;
        })
      )
      .subscribe((result: any) => {
        this.getTodos();

        this.toast.success({
          detail: 'Success',
          summary: 'Todo Added',
          duration: 5000,
        });
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

  updateTodoStatus(todo: Todo) {
    this.todoToUpdate = todo;
    this.saveUpdateTodo();
  }

  saveUpdateTodo() {
    this.todoService
      .updateTodo(this.todoToUpdate)
      .pipe(
        catchError((error) => {
          if (error instanceof ErrorEvent) {
            this.toast.error({
              detail: 'Error',
              summary: error.message,
              duration: 5000,
            });
          } else {
            this.toast.error({
              detail: 'Error',
              summary: error.message,
              duration: 5000,
            });
          }

          return error;
        })
      )
      .subscribe((result: any) => {
        this.showUpdateModal = false;

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

  onAddSubmit(form: NgForm) {
    this.isAddFormSubmitted = true;

    let newTodo = new AddTodoModel();
    newTodo.title = this.todoToAdd.title;
    newTodo.description = this.todoToAdd.description;

    if (form.valid) {
      this.addTodo(newTodo);

      this.isAddFormSubmitted = false;

      this.todoToAdd.title = '';
      this.todoToAdd.description = '';

      form.form.reset();
    }
  }
}
