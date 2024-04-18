export enum Priority {
  LOW,
  MEDIUM,
  HIGH
}

export enum Status {
  PENDING,
  DONE,
}


export interface Task {
  id: number;
  title: string;
  priority: Priority;
  endDate: Date;
  status: Status
}