import { BaseType } from './base.type';
import { Tech } from './tech.type';

export interface Attachment extends BaseType {
  url: string;
  filename: string;
  uploadedBy: Tech;
  size: number;
}
