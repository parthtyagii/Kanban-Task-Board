import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-column',
  imports: [TaskComponent, CommonModule],
  templateUrl: './status-column.component.html',
  styleUrl: './status-column.component.scss',
})
export class StatusColumnComponent implements OnChanges, OnInit {
  @Input({ required: true }) title: string = 'title';
  @Input() latestTask: { data: string; counter: number } = { data: '', counter: 0 };
  allTasks: { data: string; counter: number }[] = [];

  ngOnInit(): void {
    // Initialization logic can go here if needed
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes detected in StatusColumnComponent:', changes);
    if (changes['latestTask']) this.handleAddNewTask();
  }

  handleAddNewTask(): void {
    console.log('Handling new task in', this.title, this.latestTask);
    if (this.latestTask.data.trim().length === 0) return;
    this.allTasks.push(this.latestTask);
  }
}
