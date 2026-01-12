export const ColumnTitles = {
  TODO: 'ToDo',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
};

export interface TASKDATA {
  id: string;
  title: string;
  description: string;
  status: string;
}

export const TASK_STATUS = {
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
};

export const CARD_MOVEMENT = {
  FORWARD: 'forward',
  BACKWARD: 'backward',
};
