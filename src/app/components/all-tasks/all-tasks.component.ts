import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { StatusColumnComponent } from '../status-column/status-column.component';
import { TASKDATA } from '../../global.constants';

@Component({
  selector: 'app-all-tasks',
  imports: [StatusColumnComponent],
  templateUrl: './all-tasks.component.html',
  styleUrl: './all-tasks.component.scss',
})
export class AllTasksComponent implements OnChanges, OnInit {
  @Input() latestTask: TASKDATA = { data: '', counter: 0, title: '' };
  todoTasks: TASKDATA[] = [];
  inProgressTasks: TASKDATA[] = [];
  doneTasks: TASKDATA[] = [];

  ngOnInit(): void {
    const todo = localStorage.getItem('todoTasks');
    const inProgress = localStorage.getItem('inProgressTasks');
    const done = localStorage.getItem('doneTasks');

    this.todoTasks = todo ? JSON.parse(todo) : [];
    this.inProgressTasks = inProgress ? JSON.parse(inProgress) : [];
    this.doneTasks = done ? JSON.parse(done) : [];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['latestTask']) this.handleAddNewTask();
  }

  handleAddNewTask(): void {
    if (this.latestTask.data.trim().length === 0) return;
    this.todoTasks = [this.latestTask, ...this.todoTasks];
    localStorage.setItem('todoTasks', JSON.stringify(this.todoTasks));
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
      localStorage.setItem('todoTasks', JSON.stringify(this.todoTasks));
      localStorage.setItem(
        'inProgressTasks',
        JSON.stringify(this.inProgressTasks)
      );
    } else if (task.title === 'in-progress') {
      this.inProgressTasks = this.inProgressTasks.filter(
        (t) => t.data !== task.data
      );
      task.title = 'done';
      this.doneTasks = [task, ...this.doneTasks];
      localStorage.setItem(
        'inProgressTasks',
        JSON.stringify(this.inProgressTasks)
      );
      localStorage.setItem('doneTasks', JSON.stringify(this.doneTasks));
    }
  }

  private moveTaskBackward(task: TASKDATA): void {
    if (task.title === 'in-progress') {
      this.inProgressTasks = this.inProgressTasks.filter(
        (t) => t.data !== task.data
      );
      task.title = 'todo';
      this.todoTasks = [task, ...this.todoTasks];
      localStorage.setItem(
        'inProgressTasks',
        JSON.stringify(this.inProgressTasks)
      );
      localStorage.setItem('todoTasks', JSON.stringify(this.todoTasks));
    } else if (task.title === 'done') {
      this.doneTasks = this.doneTasks.filter((t) => t.data !== task.data);
      task.title = 'in-progress';
      this.inProgressTasks = [task, ...this.inProgressTasks];
      localStorage.setItem('doneTasks', JSON.stringify(this.doneTasks));
      localStorage.setItem(
        'inProgressTasks',
        JSON.stringify(this.inProgressTasks)
      );
    }
  }

  handleTaskDeletion(taskToDelete: TASKDATA): void {
    if (taskToDelete.title === 'todo') {
      this.todoTasks = this.todoTasks.filter(
        (t) => t.data !== taskToDelete.data
      );
      localStorage.setItem('todoTasks', JSON.stringify(this.todoTasks));
    } else if (taskToDelete.title === 'in-progress') {
      this.inProgressTasks = this.inProgressTasks.filter(
        (t) => t.data !== taskToDelete.data
      );
      localStorage.setItem(
        'inProgressTasks',
        JSON.stringify(this.inProgressTasks)
      );
    } else if (taskToDelete.title === 'done') {
      this.doneTasks = this.doneTasks.filter(
        (t) => t.data !== taskToDelete.data
      );
      localStorage.setItem('doneTasks', JSON.stringify(this.doneTasks));
    }
  }

  handleTaskEdit(event: { task: TASKDATA; newData: string }): void {
    this.todoTasks = this.todoTasks.map((t) =>
      t.data === event.task.data ? { ...t, data: event.newData } : t
    );
    localStorage.setItem('todoTasks', JSON.stringify(this.todoTasks));
  }
}
