import { eTicketStatus } from '@features/ticket/enums/ticket-status.enum';

export const STATUS_FILTER_CONST: eTicketStatus[] = [
  eTicketStatus.OPEN,
  eTicketStatus.PROGRESS,
  eTicketStatus.FINISH,
];
