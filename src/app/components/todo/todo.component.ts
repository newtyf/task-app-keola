import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.interface';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PriorityPipe } from '../../pipes/priority.pipe';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [NgFor, RouterLink, DatePipe, PriorityPipe, NgIf],
  templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit {
  todos: Task[] = [];
  hideSorts: boolean = true;
  hideFiltersPriority: boolean = true;
  hideFiltersDate: boolean = true;
  hideFiltersStatus: boolean = true;

  private _service;
  constructor(service: TaskService) {
    this._service = service;
  }

  ngOnInit(): void {
    this.todos = this._service.getTasks();
  }

  showAndHideSortsDropdown() {
    this.hideSorts = !this.hideSorts;
  }

  showAndHideFiltersProrityDropdown() {
    this.hideFiltersPriority = !this.hideFiltersPriority;
  }

  showAndHideFiltersDateDropdown() {
    this.hideFiltersDate = !this.hideFiltersDate;
  }

  showAndHideFiltersStatusDropdown() {
    this.hideFiltersStatus = !this.hideFiltersStatus;
  }

  doneTask(id: number, checked: boolean) {
    console.log(checked);
  }

  sortByPriority() {
    this.todos.sort((a, b) => a.priority - b.priority);
    this.showAndHideSortsDropdown();
  }

  sortByEndDate() {
    this.todos.sort(
      (a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
    );
    this.showAndHideSortsDropdown();
  }

  filterByPriority(priority: number) {
    this.todos = this._service.getTasks()
    this.todos = this.todos.filter((todo) => todo.priority == priority);
    this.showAndHideFiltersProrityDropdown();
  }

  filterByStatus(status: number) {
    this.todos = this._service.getTasks()
    this.todos = this.todos.filter((todo) => todo.status == status);
    this.showAndHideFiltersStatusDropdown();
  }

  filterByEndDate(date: string) {
    this.todos = this._service.getTasks()
    this.todos = this.todos.filter((todo) => todo.endDate == new Date(date));
    this.showAndHideFiltersDateDropdown();
  }

  resetFilters() {
    this.todos = this._service.getTasks()
  }

  deleteTask(id: number) {
    this._service.deleteTask(id)
    this.todos = this._service.getTasks();
  }
}
