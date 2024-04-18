import { Pipe, PipeTransform } from '@angular/core';
import { Priority } from '../models/task.interface';

@Pipe({
  name: 'priority',
  standalone: true,
})
export class PriorityPipe implements PipeTransform {
  transform(value: number): string {
    let transformed = '';

    switch (value) {
      case Priority.LOW:
        transformed = 'LOW';
        break;
      case Priority.MEDIUM:
        transformed = 'MEDIUM';
        break;
      case Priority.HIGH:
        transformed = 'HIGH';
        break;
      default:
        break;
    }
    return transformed;
  }
}
