import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { AllTasksComponent } from './components/all-tasks/all-tasks.component';
import { TASKDATA } from './models/global.constants';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
