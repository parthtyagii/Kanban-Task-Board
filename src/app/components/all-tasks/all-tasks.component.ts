import { Component, Input } from '@angular/core';
import { StatusColumnComponent } from '../status-column/status-column.component';

@Component({
  selector: 'app-all-tasks',
  imports: [StatusColumnComponent],
  templateUrl: './all-tasks.component.html',
  styleUrl: './all-tasks.component.scss',
})
export class AllTasksComponent {
  @Input() latestTask: { data: string; counter: number } = { data: '', counter: 0 };
}
