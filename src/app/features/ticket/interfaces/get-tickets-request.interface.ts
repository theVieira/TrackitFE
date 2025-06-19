import { iPaginatedRequest } from '@shared/interfaces/paginated-request.interface';
import { eTicketCategory } from '../enums/ticket-category.enum';
import { eTicketPriority } from '../enums/ticket-priority.enum';
import { eTicketStatus } from '../enums/ticket-status.enum';

export interface iGetTicketsRequest {
  status: eTicketStatus[];
  priority: eTicketPriority[];
  category: eTicketCategory[];
  pagination: iPaginatedRequest;
  client?: string;
}
