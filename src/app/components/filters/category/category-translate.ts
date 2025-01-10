import { TicketCategory } from '@/@types/ticket.type';

export class CategoryTranslate {
  t(category: TicketCategory): string {
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
}
