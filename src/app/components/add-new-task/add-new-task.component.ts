import { Component, EventEmitter, Output } from '@angular/core';
import { TASKDATA } from '../../global.constants';

@Component({
  selector: 'app-add-new-task',
  imports: [],
  templateUrl: './add-new-task.component.html',
  styleUrl: './add-new-task.component.scss',
})
export class AddNewTaskComponent {
  @Output() addTaskEvent = new EventEmitter<TASKDATA>();
  counter: number = 0;

  addNewTask(newTask: HTMLTextAreaElement) {
    console.log('Add task clicked!');
    const data = newTask.value.trim();
    if (data.length === 0) return;
    this.counter += 1;
    this.addTaskEvent.emit({ data, counter: this.counter , title: 'todo'});
    newTask.value = '';
  }
}
