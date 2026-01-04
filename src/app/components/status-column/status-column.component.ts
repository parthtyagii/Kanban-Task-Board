import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { CommonModule } from '@angular/common';
import { TASKDATA } from '../../global.constants';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-status-column',
  imports: [TaskComponent, CommonModule, MatIconModule],
  templateUrl: './status-column.component.html',
  styleUrl: './status-column.component.scss',
})
export class StatusColumnComponent implements OnInit {
  @Input({ required: true }) title: string = 'title';
  @Input() allTasks: TASKDATA[] = [];
  @Output() taskMovementEvent = new EventEmitter();
  @Output() taskDeletionEvent = new EventEmitter();
  @Output() taskEditEvent = new EventEmitter();

  ngOnInit(): void {
    // Initialization logic can go here if needed
  }

  handleTaskMovement(event: { move: string; task: TASKDATA }): void {
    this.taskMovementEvent.emit(event);
  }

  handleTaskDeletion(taskToDelete: TASKDATA): void {
    this.taskDeletionEvent.emit(taskToDelete);
  }

  handleTaskEdit(event: { task: TASKDATA; newData: string }): void {
    this.taskEditEvent.emit(event);
  }
}
