import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { JsonPipe, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, RouterLink, NgIf],
  templateUrl: './add-todo.component.html',
})
export class AddTodoComponent {
  addTodoForm;

  constructor(private formBuilder: FormBuilder, private service: TaskService, private router: Router) {
    this.addTodoForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(1)]],
      endDate: ['', [Validators.required]],
      priority: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.addTodoForm.valid) {
      this.service.saveTask(
        this.addTodoForm.value.title as string,
        new Date(this.addTodoForm.value.endDate as string),
        parseInt(this.addTodoForm.value.priority as string)
      );
      this.router.navigate(["/"])
      console.warn('Your order has been submitted', this.addTodoForm.value);
    }

  }
}
