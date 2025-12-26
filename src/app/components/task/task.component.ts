import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  imports: [],
})
export class TaskComponent {
  @Input({ required: true }) task: { data: string; counter: number } = { data: '', counter: 0 };
}
