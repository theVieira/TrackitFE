import { eTicketPriority } from '@features/ticket/enums/ticket-priority.enum';

export const SELECT_PRIORITY_FILTER_CONST: eTicketPriority[] = [
  eTicketPriority.LOW,
  eTicketPriority.MEDIUM,
  eTicketPriority.HIGH,
  eTicketPriority.URGENT,
];
