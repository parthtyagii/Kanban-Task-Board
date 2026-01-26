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
    const allTasksData = localStorage.getItem('allTasks');
    this.allTasks = allTasksData ? JSON.parse(allTasksData) : [];
    this.updateTaskCategories(this.allTasks);
  }

  updateTaskCategories(allTasks: TASKDATA[]): void {
    this.todoTasks = this.allTasks.filter(
      (task) => task.status === this.TASKSTATUS.TODO,
    );
    this.inProgressTasks = this.allTasks.filter(
      (task) => task.status === this.TASKSTATUS.IN_PROGRESS,
    );
    this.doneTasks = this.allTasks.filter(
      (task) => task.status === this.TASKSTATUS.DONE,
    );
    this.tasksInfoSubject$.next([]);
  }

  addNewTask(data: string): void {
    const newTask: TASKDATA = {
      id: crypto.randomUUID(),
      title: data,
      description: '',
      status: this.TASKSTATUS.TODO,
    };
    this.allTasks = [newTask, ...this.allTasks];
    localStorage.setItem('allTasks', JSON.stringify(this.allTasks));
    this.updateTaskCategories(this.allTasks);
  }

  deleteTask(task: TASKDATA): void {
    this.allTasks = this.allTasks.filter((t) => t.id !== task.id);
    localStorage.setItem('allTasks', JSON.stringify(this.allTasks));
    this.updateTaskCategories(this.allTasks);
  }

  editTask(updatedTask: TASKDATA): void {
    this.allTasks = this.allTasks.map((task) => {
      if (task.id === updatedTask.id) {
        return updatedTask;
      }
      return task;
    });
    localStorage.setItem('allTasks', JSON.stringify(this.allTasks));
    this.updateTaskCategories(this.allTasks);
  }

  handleTaskMove(task: TASKDATA, newStatus: string): void {
    const updatedTask: TASKDATA = {
      ...task,
      status: newStatus,
    };

    this.allTasks = this.allTasks.map((task) => {
      if (task.id === updatedTask.id) return updatedTask;
      else return task;
    });
    localStorage.setItem('allTasks', JSON.stringify(this.allTasks));
    this.updateTaskCategories(this.allTasks);
  }

  getTasksByStatus(status: string): TASKDATA[] {
    switch (status) {
      case TASK_STATUS.TODO:
        return this.todoTasks;
      case TASK_STATUS.IN_PROGRESS:
        return this.inProgressTasks;
      case TASK_STATUS.DONE:
        return this.doneTasks;
      default:
        return [];
    }
  }

  getTaskByStatusAndId(status: string, id: string): TASKDATA | undefined {
    console.log('Fetching task with ID:', id, 'and Status:', status);
    console.log(this.getTasksByStatus(status));

    return this.getTasksByStatus(status).find((t) => t.id === id);
  }
}
