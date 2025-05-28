import { eTicketPriority } from '@features/ticket/enums/ticket-priority.enum';

export const selectPriorityFilterConst: eTicketPriority[] = [
  eTicketPriority.LOW,
  eTicketPriority.MEDIUM,
  eTicketPriority.HIGH,
  eTicketPriority.URGENT,
];
