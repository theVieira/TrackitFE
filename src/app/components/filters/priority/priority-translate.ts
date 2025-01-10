import { TicketPriority } from '@/@types/ticket.type';

export class PriorityTranslate {
  t(priority: TicketPriority): string {
    switch (priority) {
      case TicketPriority.Low:
        return 'Baixa';
      case TicketPriority.Medium:
        return 'Média';
      case TicketPriority.High:
        return 'Alta';
      case TicketPriority.Urgent:
        return 'Urgente';
    }
  }
}
