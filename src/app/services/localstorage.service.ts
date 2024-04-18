import { Injectable } from '@angular/core';
import { Task } from '../models/task.interface';
import { LoggerService } from './logger.service';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private _logger;
  private _defaulttKey: string = "tasks";

  constructor(logger: LoggerService) {
    this._logger = logger;
  }

  getAll(key: string = this._defaulttKey): Task[] {
    const data = localStorage.getItem(key);
    if (!!data) {
      return JSON.parse(data);
    } else {
      this._logger.error("Not found data")
      return [];
    }
  }

  saveItem(value: Task, key: string = this._defaulttKey): void {
    const data = localStorage.getItem(key);

    if (!!data) {
      let tasks = JSON.parse(data) as Task[];
      tasks.push(value);
      localStorage.setItem(key, JSON.stringify(tasks))
    } else {
      localStorage.setItem(key, JSON.stringify([value]))
      this._logger.warn("Not found key in localstorage we will create new")
    }
  }

  removeItem(id: number, key: string = this._defaulttKey) {
    const data = localStorage.getItem(key);

    if (!!data) {
      let tasks = JSON.parse(data) as Task[];

      tasks = tasks.filter((task) => task.id !== id)
      localStorage.setItem(key, JSON.stringify(tasks))
    } else {
      this._logger.warn("Not found key in localstorage")
    }
  }
}
