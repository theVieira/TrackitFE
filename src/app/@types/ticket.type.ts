import { Attachment } from './attachment.type';
import { BaseType } from './base.type';
import { Client } from './client.type';
import { Tech } from './tech.type';

export interface Ticket extends BaseType {
  client: Client;
  description: string;
  status: TicketStatus;
  createdBy: Tech;
  category: TicketCategory;
  priority: TicketPriority;
  tag: TicketTag;
  attachments: Attachment[];
}

export enum TicketStatus {
  Open = 'Open',
  Progress = 'Progress',
  Finish = 'Finish',
  Cancelled = 'Cancelled',
}

export enum TicketCategory {
  Daily = 'Daily',
  Budget = 'Budget',
  Delivery = 'Delivery',
  Maintenance = 'Maintenance',
}

export enum TicketPriority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Urgent = 'Urgent',
}

export enum TicketTag {
  Critical = 'Critical',
  NetworkFailure = 'NetworkFailure',
  HardwareFailure = 'HardwareFailure',
  SoftwareFailure = 'SoftwareFailure',
  Maintenance = 'Maintenance',
}
