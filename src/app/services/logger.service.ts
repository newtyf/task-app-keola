import { Injectable } from '@angular/core';

@Injectable({providedIn: "root"})
export class LoggerService {
  constructor() {
    // window.console.log = function () { };
    // window.console.warn = function () { };
    // window.console.error = function () { };
  }
  log(msg: any)   { console.log(msg); }
  error(msg: any) { console.error(msg); }
  warn(msg: any)  { console.warn(msg); }
}