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
import { TASK_STATUS, TASKDATA } from '../../models/global.constants';
import { ManageTaskService } from '../../services/manage-task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  imports: [MatIconModule, CommonModule],
})
export class TaskComponent implements OnInit, AfterViewInit {
  @ViewChild('taskTextarea') taskTextarea!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('taskInput') taskInput!: ElementRef<HTMLInputElement>;
  @Input({ required: true }) task!: TASKDATA;
  disabledFields: boolean = true;
  disableEditButton: boolean = false;
  taskStatus = TASK_STATUS;

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

  enableDisableEditing(taskTextarea: HTMLTextAreaElement): void {
    if (this.disableEditButton) return;
    this.disabledFields = !this.disabledFields;
  }

  handleDeleteTask(): void {
    this.manageTaskService.deleteTask(this.task);
  }
}
