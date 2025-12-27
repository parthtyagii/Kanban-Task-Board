import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { StatusColumnComponent } from '../status-column/status-column.component';
import { TASKDATA } from '../../global.constants';

@Component({
  selector: 'app-all-tasks',
  imports: [StatusColumnComponent],
  templateUrl: './all-tasks.component.html',
  styleUrl: './all-tasks.component.scss',
})
export class AllTasksComponent implements OnChanges {
  @Input() latestTask: TASKDATA = { data: '', counter: 0, title: '' };
  todoTasks: TASKDATA[] = [];
  inProgressTasks: TASKDATA[] = [];
  doneTasks: TASKDATA[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes detected in StatusColumnComponent:', changes);
    if (changes['latestTask']) this.handleAddNewTask();
  }

  handleAddNewTask(): void {
    console.log('Handling new task in', this.latestTask);
    if (this.latestTask.data.trim().length === 0) return;
    this.todoTasks = [this.latestTask, ...this.todoTasks];
  }

  handleTaskMovement(event: { move: string; task: TASKDATA }): void {
    if (event.move === 'forward') {
      this.moveTaskForward(event.task);
    } else {
      this.moveTaskBackward(event.task);
    }
  }

  private moveTaskForward(task: TASKDATA): void {
    if (task.title === 'todo') {
      this.todoTasks = this.todoTasks.filter((t) => t.data !== task.data);
      task.title = 'in-progress';
      this.inProgressTasks = [task, ...this.inProgressTasks];
    } else if (task.title === 'in-progress') {
      this.inProgressTasks = this.inProgressTasks.filter(
        (t) => t.data !== task.data
      );
      task.title = 'done';
      this.doneTasks = [task, ...this.doneTasks];
    }
  }

  private moveTaskBackward(task: TASKDATA): void {
    if (task.title === 'in-progress') {
      this.inProgressTasks = this.inProgressTasks.filter(
        (t) => t.data !== task.data
      );
      task.title = 'todo';
      this.todoTasks = [task, ...this.todoTasks];
    } else if (task.title === 'done') {
      this.doneTasks = this.doneTasks.filter((t) => t.data !== task.data);
      task.title = 'in-progress';
      this.inProgressTasks = [task, ...this.inProgressTasks];
    }
  }

  handleTaskDeletion(taskToDelete: TASKDATA): void {
    if (taskToDelete.title === 'todo') {
      this.todoTasks = this.todoTasks.filter(
        (t) => t.data !== taskToDelete.data
      );
    } else if (taskToDelete.title === 'in-progress') {
      this.inProgressTasks = this.inProgressTasks.filter(
        (t) => t.data !== taskToDelete.data
      );
    } else if (taskToDelete.title === 'done') {
      this.doneTasks = this.doneTasks.filter(
        (t) => t.data !== taskToDelete.data
      );
    }
  }

  handleTaskEdit(event: { task: TASKDATA; newData: string }): void {
    this.todoTasks = this.todoTasks.filter((t) => t.data === event.task.data);
  }
}
