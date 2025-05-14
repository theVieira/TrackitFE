import { BaseType } from './base.type';
import { Tech } from './tech.type';

export interface TimeAction extends BaseType {
  author: Tech;
  type: TimeActionType;
}

export enum TimeActionType {
  Progress = 'Progress',
  Finish = 'Finish',
  Reopen = 'Reopen',
}
