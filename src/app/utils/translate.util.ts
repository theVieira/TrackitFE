import {
  TicketCategory,
  TicketPriority,
  TicketStatus,
  TicketTag,
} from '@/@types/ticket.type';
import { Injectable } from '@angular/core';

@Injectable()
export class Translate {
  tStatus(status: TicketStatus): string {
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

  tCategory(category: TicketCategory): string {
    switch (category) {
      case TicketCategory.Daily:
        return 'Diário';
      case TicketCategory.Budget:
        return 'Orçamento';
      case TicketCategory.Delivery:
        return 'Entrega';
      case TicketCategory.Maintenance:
        return 'Manutenção';
    }
  }

  tPriority(priority: TicketPriority): string {
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

  tTag(tag: TicketTag): string {
    switch (tag) {
      case TicketTag.Critical:
        return 'Critico';
      case TicketTag.NetworkFailure:
        return 'Falha de rede';
      case TicketTag.HardwareFailure:
        return 'Falha de hardware';
      case TicketTag.SoftwareFailure:
        return 'Falha no software';
      case TicketTag.Maintenance:
        return 'Manutenção';
    }
  }
}
