import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { StatusColumnComponent } from '../status-column/status-column.component';
import { ColumnTitles, TASKDATA } from '../../models/global.constants';

@Component({
  selector: 'app-all-tasks',
  imports: [StatusColumnComponent],
  templateUrl: './all-tasks.component.html',
  styleUrl: './all-tasks.component.scss',
})
export class AllTasksComponent implements OnInit {
  columnTitles = ColumnTitles;

  ngOnInit(): void {}
}
