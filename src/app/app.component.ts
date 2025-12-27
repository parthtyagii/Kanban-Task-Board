import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { AddNewTaskComponent } from './components/add-new-task/add-new-task.component';
import { AllTasksComponent } from './components/all-tasks/all-tasks.component';
import { TASKDATA } from './global.constants';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, AddNewTaskComponent, AllTasksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  latestTask: TASKDATA = { data: '', counter: 0, title: '' };

  handleAddNewTask(task: TASKDATA): void {
    console.log('New task received in AppComponent:', task);
    this.latestTask = task;
  }
}
