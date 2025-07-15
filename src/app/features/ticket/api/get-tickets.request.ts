import { iPaginatedRequest } from '@shared/api/paginated.request';
import { eTicketCategory } from '../enums/ticket-category.enum';
import { eTicketPriority } from '../enums/ticket-priority.enum';
import { eTicketStatus } from '../enums/ticket-status.enum';

export interface iGetTicketsRequest {
  status: eTicketStatus[];
  priority: eTicketPriority[];
  category: eTicketCategory[];
  pagination: iPaginatedRequest;
  date: { startDate?: Date; endDate?: Date };
  client?: string;
}
