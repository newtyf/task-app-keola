import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';
import { Priority, Status, Task } from '../models/task.interface';
import { LocalStorageService } from './localstorage.service';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks: Task[] = [];
  private _logger;
  private _localstorage;

  constructor(logger: LoggerService, localstorage: LocalStorageService) {
    this._logger = logger;
    this._localstorage = localstorage;
  }

  saveTask(tile: string, endDate: Date, priority: Priority, key?: string) {

    const newTask: Task = {
      id: new Date().getMilliseconds(),
      title: tile,
      endDate: endDate,
      priority: priority,
      status: Status.PENDING
    }

    this._localstorage.saveItem(newTask)

    this._logger.log('Tasks save with default key');
  }

  getTasks(key?: string) {
    if (!!key) {
      this._logger.log('Get All Tasks with default key');
      this.tasks = this._localstorage.getAll(key);
    } else {
      this._logger.log('Get All Tasks without default key');
      this.tasks = this._localstorage.getAll();
    }

    return this.tasks;
  }

  deleteTask(id: number, key?: string) {
    if (!!key) {
      this._localstorage.removeItem(id, key);
      this.getTasks(key)
      this._logger.log('Delete task');
    } else {
      this._localstorage.removeItem(id);
      this.getTasks()
      this._logger.log('Delete task');
      this.tasks = this._localstorage.getAll();
    }
  }
}
