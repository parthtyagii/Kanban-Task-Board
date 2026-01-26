import { Routes } from '@angular/router';
import { AllTasksComponent } from './components/all-tasks/all-tasks.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: AllTasksComponent,
  },
  {
    path: 'task/:status/:id',
    component: TaskDetailsComponent, // individual task component info
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
