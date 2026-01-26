import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {
  CARD_MOVEMENT,
  TASK_STATUS,
  TASKDATA,
} from '../../models/global.constants';
import { ManageTaskService } from '../../services/manage-task.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  imports: [MatIconModule, CommonModule, RouterLink],
})
export class TaskComponent implements OnInit, AfterViewInit {
  @ViewChild('taskTextarea') taskTextarea!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('taskInput') taskInput!: ElementRef<HTMLInputElement>;
  @Input({ required: true }) task!: TASKDATA;
  disabledFields: boolean = true;
  disableEditButton: boolean = false;
  taskStatus = TASK_STATUS;
  cardMovement = CARD_MOVEMENT;

  constructor(private manageTaskService: ManageTaskService) {}

  ngOnInit(): void {
    if (this.task.status !== this.taskStatus.TODO) {
      this.disableEditButton = true;
    }
  }

  ngAfterViewInit(): void {
    this.taskInput.nativeElement.value = this.task.title;
    this.taskTextarea.nativeElement.value = this.task.description;
  }

  handleDeleteTask(): void {
    this.manageTaskService.deleteTask(this.task);
  }

  handleEditTask(): void {
    if (this.disableEditButton) return;
    if (!this.disabledFields) {
      const updatedTask: TASKDATA = {
        ...this.task,
        title: this.taskInput.nativeElement.value,
        description: this.taskTextarea.nativeElement.value,
      };
      this.manageTaskService.editTask(updatedTask);
    }
    this.disabledFields = !this.disabledFields;
  }

  handleCardMovement(move: string): void {
    if (move === this.cardMovement.FORWARD) {
      if (this.task.status === this.taskStatus.TODO) {
        this.manageTaskService.handleTaskMove(
          this.task,
          this.taskStatus.IN_PROGRESS,
        );
      } else if (this.task.status === this.taskStatus.IN_PROGRESS) {
        this.manageTaskService.handleTaskMove(this.task, this.taskStatus.DONE);
      }
    } else if (move === this.cardMovement.BACKWARD) {
      if (this.task.status === this.taskStatus.IN_PROGRESS) {
        this.manageTaskService.handleTaskMove(this.task, this.taskStatus.TODO);
      } else if (this.task.status === this.taskStatus.DONE) {
        this.manageTaskService.handleTaskMove(
          this.task,
          this.taskStatus.IN_PROGRESS,
        );
      }
    }
  }
}
