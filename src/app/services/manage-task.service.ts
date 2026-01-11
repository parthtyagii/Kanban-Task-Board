import { Injectable, OnInit } from '@angular/core';
import { TASK_STATUS, TASKDATA } from '../models/global.constants';

@Injectable({
  providedIn: 'root',
})
export class ManageTaskService implements OnInit {
  private allTasks: TASKDATA[] = [];
  private todoTasks: TASKDATA[] = [];
  private inProgressTasks: TASKDATA[] = [];
  private doneTasks: TASKDATA[] = [];
  TASKSTATUS = TASK_STATUS;

  constructor() {}

  ngOnInit(): void {
    this.loadTasksFromLocalStorage();
  }

  loadTasksFromLocalStorage(): void {
    const allTasksData = localStorage.getItem('allTasks');
    this.allTasks = allTasksData ? JSON.parse(allTasksData) : [];
    this.todoTasks = this.allTasks.filter(
      (task) => task.status === this.TASKSTATUS.TODO
    );
    this.inProgressTasks = this.allTasks.filter(
      (task) => task.status === this.TASKSTATUS.IN_PROGRESS
    );
    this.doneTasks = this.allTasks.filter(
      (task) => task.status === this.TASKSTATUS.DONE
    );
    console.log('All Tasks: ', this.allTasks);
    console.log('TODO Tasks: ', this.todoTasks);
    console.log('In Progress Tasks: ', this.inProgressTasks);
    console.log('Done Tasks: ', this.doneTasks);
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
    this.loadTasksFromLocalStorage();
  }
}
