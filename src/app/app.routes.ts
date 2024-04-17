import { Routes } from '@angular/router';
import { TodoComponent } from './components/todo/todo.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';

export const routes: Routes = [
  {path: "", component: TodoComponent},
  {path: "add", component: AddTodoComponent}
];
