import { eTicketStatus } from '@features/ticket/enums/ticket-status.enum';

export const selectStatusFilterConst: eTicketStatus[] = [
  eTicketStatus.OPEN,
  eTicketStatus.PROGRESS,
  eTicketStatus.FINISH,
  eTicketStatus.CANCELLED,
];
