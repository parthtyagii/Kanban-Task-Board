import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { AddNewTaskComponent } from './components/add-new-task/add-new-task.component';
import { AllTasksComponent } from './components/all-tasks/all-tasks.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, AddNewTaskComponent, AllTasksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Kanban-Task-Board';
}
