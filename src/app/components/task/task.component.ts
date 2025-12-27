import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TASKDATA } from '../../global.constants';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  imports: [MatIconModule, CommonModule],
})
export class TaskComponent implements OnInit {
  disabledTextarea: boolean = true;
  disableEditButton: boolean = false;
  @Output() taskMovementEvent = new EventEmitter();
  @Output() taskDeletionEvent = new EventEmitter();
  @Output() taskEditEvent = new EventEmitter();
  @Input({ required: true }) task: TASKDATA = {
    data: '',
    counter: 0,
    title: '',
  };

  ngOnInit(): void {
    if (this.task.title !== 'todo') {
      this.disableEditButton = true;
    }
  }

  enableDisableEditing(taskTextarea: HTMLTextAreaElement): void {
    if (this.disableEditButton) return;
    this.disabledTextarea = !this.disabledTextarea;
    if (this.disabledTextarea) {
      this.taskEditEvent.emit({ task: this.task, newData: taskTextarea.value });
    }
  }

  handleMoveBackward(): void {
    console.log('Move Backward clicked for task:', this.task);
    this.taskMovementEvent.emit({ move: 'backward', task: this.task });
  }

  handleMoveForward(): void {
    console.log('Move Forward clicked for task:', this.task);
    this.taskMovementEvent.emit({ move: 'forward', task: this.task });
  }

  handleTaskDeletion(): void {
    this.taskDeletionEvent.emit(this.task);
  }
}
