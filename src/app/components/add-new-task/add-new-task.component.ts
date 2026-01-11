import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ManageTaskService } from '../../services/manage-task.service';

@Component({
  selector: 'app-add-new-task',
  imports: [MatIconModule],
  templateUrl: './add-new-task.component.html',
  styleUrl: './add-new-task.component.scss',
})
export class AddNewTaskComponent {
  @ViewChild('newTaskInput') newTaskInput!: ElementRef<HTMLInputElement>;

  constructor(private manageTaskService: ManageTaskService) {}

  addNewTask(newTask: HTMLInputElement): void {
    console.log('Adding new task:', newTask.value);
    const data = newTask.value.trim();
    if (data.length === 0) return;
    // pass data to service to handle whatever the fuck.
    this.manageTaskService.addNewTask(newTask.value);
    this.newTaskInput.nativeElement.value = '';
  }
}
