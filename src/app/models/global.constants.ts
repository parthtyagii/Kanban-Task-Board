export const ColumnTitles = {
  TODO: 'ToDo',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
};

export interface TASKDATA {
  id: string;
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
}

export const TASK_STATUS = {
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
} as const;
