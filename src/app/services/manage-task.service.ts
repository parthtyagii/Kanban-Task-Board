import { Injectable, OnInit } from '@angular/core';
import {
  ColumnTitles,
  TASK_STATUS,
  TASKDATA,
} from '../models/global.constants';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ManageTaskService {
  private tasksInfoSubject$ = new BehaviorSubject<[]>([]);
  private allTasks: TASKDATA[] = [];
  private todoTasks: TASKDATA[] = [];
  private inProgressTasks: TASKDATA[] = [];
  private doneTasks: TASKDATA[] = [];

  TASKSTATUS = TASK_STATUS;
  columnTitles = ColumnTitles;
  tasksInfo$ = this.tasksInfoSubject$.asObservable();

  constructor() {
    this.loadTasksFromLocalStorage();
  }

  loadTasksFromLocalStorage(): void {
    console.log('Updating task categories');
    const allTasksData = localStorage.getItem('allTasks');
    this.allTasks = allTasksData ? JSON.parse(allTasksData) : [];
    this.updateTaskCategories(this.allTasks);
  }

  updateTaskCategories(allTasks: TASKDATA[]): void {
    console.log(allTasks);
    this.todoTasks = this.allTasks.filter(
      (task) => task.status === this.TASKSTATUS.TODO
    );
    this.inProgressTasks = this.allTasks.filter(
      (task) => task.status === this.TASKSTATUS.IN_PROGRESS
    );
    this.doneTasks = this.allTasks.filter(
      (task) => task.status === this.TASKSTATUS.DONE
    );
    this.tasksInfoSubject$.next([]);
  }

  addNewTask(data: string): void {
    console.log('Adding new task!');
    const newTask: TASKDATA = {
      id: crypto.randomUUID(),
      title: data,
      description: '',
      status: this.TASKSTATUS.TODO,
    };
    this.allTasks.push(newTask);
    localStorage.setItem('allTasks', JSON.stringify(this.allTasks));
    this.updateTaskCategories(this.allTasks);
  }

  deleteTask(task: TASKDATA): void {
    this.allTasks = this.allTasks.filter((t) => t.id !== task.id);
    localStorage.setItem('allTasks', JSON.stringify(this.allTasks));
    this.updateTaskCategories(this.allTasks);
  }

  getTasksByStatus(status: string): TASKDATA[] {
    switch (status) {
      case this.columnTitles.TODO:
        return this.todoTasks;
      case this.columnTitles.IN_PROGRESS:
        return this.inProgressTasks;
      case this.columnTitles.DONE:
        return this.doneTasks;
      default:
        return [];
    }
  }
}
