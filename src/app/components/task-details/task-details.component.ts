import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManageTaskService } from '../../services/manage-task.service';
import { TASKDATA } from '../../models/global.constants';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-details',
  imports: [],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss',
})
export class TaskDetailsComponent implements OnInit {
  taskInfo!: TASKDATA | undefined;
  paramMapSubscription!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private manageTaskService: ManageTaskService,
  ) {}

  ngOnInit(): void {
    this.paramMapSubscription = this.activatedRoute.paramMap.subscribe(
      (params) => {
        const id = params.get('id') ?? '';
        const status = params.get('status') ?? '';
        this.taskInfo = this.manageTaskService.getTaskByStatusAndId(status, id);
      },
    );
  }

  ngOnDestroy(): void {
    this.paramMapSubscription.unsubscribe();
  }
}
