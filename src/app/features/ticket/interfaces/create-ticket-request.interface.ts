import { eTicketCategory } from '../enums/ticket-category.enum';
import { eTicketPriority } from '../enums/ticket-priority.enum';
import { eTicketTag } from '../enums/ticket-tag.enum';

export interface iCreateTicketRequest {
  description: string;
  clientId: string;
  category: eTicketCategory;
  priority: eTicketPriority;
  tag: eTicketTag;
}
