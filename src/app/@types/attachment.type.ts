import { BaseType } from './base.type';

export interface Attachment extends BaseType {
  url: string;
  filename: string;
}
