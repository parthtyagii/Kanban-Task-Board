import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { StatusColumnComponent } from '../status-column/status-column.component';
import { ColumnTitles, TASK_STATUS, TASKDATA } from '../../models/global.constants';

@Component({
  selector: 'app-all-tasks',
  imports: [StatusColumnComponent],
  templateUrl: './all-tasks.component.html',
  styleUrl: './all-tasks.component.scss',
})
export class AllTasksComponent implements OnInit {
  columnTitles = ColumnTitles;
  taskStatus = TASK_STATUS;

  ngOnInit(): void {}
}
