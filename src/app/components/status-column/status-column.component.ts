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
import { MatIconModule } from '@angular/material/icon';
import { AddNewTaskComponent } from '../add-new-task/add-new-task.component';
import { ColumnTitles, TASKDATA } from '../../models/global.constants';
import { ManageTaskService } from '../../services/manage-task.service';

@Component({
  selector: 'app-status-column',
  imports: [TaskComponent, CommonModule, MatIconModule, AddNewTaskComponent],
  templateUrl: './status-column.component.html',
  styleUrl: './status-column.component.scss',
})
export class StatusColumnComponent implements OnInit {
  @Input({ required: true }) title!: string;
  allTasks: TASKDATA[] = [];
  allowAddTask: boolean = false;
  colunnTitles = ColumnTitles;

  constructor(private manageTaskService: ManageTaskService) {}

  ngOnInit(): void {
    // Initialization logic can go here if needed
    if (this.title == this.colunnTitles.TODO) {
      this.allowAddTask = true;
    }
    
    this.manageTaskService.tasksInfo$.subscribe(() => {
      this.loadTasks();
    });
  }

  loadTasks(): void {
    // get all tasks from service for this column
    this.allTasks = this.manageTaskService.getTasksByStatus(this.title);
    console.log('Tasks loaded for', this.title);
    console.log(this.allTasks);
  }
}
