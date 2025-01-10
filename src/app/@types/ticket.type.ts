import { BaseType } from './base.type';
import { Client } from './client.type';

export interface Ticket extends BaseType {
  client: Client;
  description: string;
  status: TicketStatus;
}

export enum TicketStatus {
  Open = 'Open',
  Progress = 'Progress',
  Finish = 'Finish',
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
