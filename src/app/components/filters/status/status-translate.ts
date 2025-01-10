import { TicketStatus } from '@/@types/ticket.type';

export class StatusTranslate {
  t(status: TicketStatus): string {
    switch (status) {
      case TicketStatus.Open:
        return 'Aberto';
      case TicketStatus.Progress:
        return 'Progresso';
      case TicketStatus.Finish:
        return 'Finalizado';
      case TicketStatus.Cancelled:
        return 'Cancelado';
    }
  }
}
