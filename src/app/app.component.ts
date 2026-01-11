import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { AllTasksComponent } from './components/all-tasks/all-tasks.component';
import { TASKDATA } from './models/global.constants';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, AllTasksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  latestTask: TASKDATA = { id: '', description: '', title: '', status: 'TODO' };

  handleAddNewTask(task: TASKDATA): void {
    this.latestTask = task;
  }
}
