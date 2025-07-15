import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { eTicketCategoryColor } from '@features/ticket/enums/ticket-category-color.enum';
import { eTicketPriorityColor } from '@features/ticket/enums/ticket-priority-color.enum';
import { eTicketStatusColor } from '@features/ticket/enums/ticket-status-color.enum';
import { eTicketTagColor } from '@features/ticket/enums/ticket-tag-color.enum';
import { iTicket } from '@features/ticket/models/ticket.model';
import { TranslocoModule } from '@jsverse/transloco';
import { AvatarShared } from '@shared/components/avatar/avatar.shared';

@Component({
  selector: 'app-ticket-main-information',
  imports: [MatCardModule, TranslocoModule, AvatarShared],
  templateUrl: './ticket-main-information.component.html',
})
export class TicketMainInformationComponent {
  @Input({ required: true }) ticket!: iTicket;

  protected getCategoryColor(): string {
    return eTicketCategoryColor[
      this.ticket.category.toUpperCase() as keyof typeof eTicketCategoryColor
    ];
  }

  protected getPriorityColor(): string {
    return eTicketPriorityColor[
      this.ticket.priority.toUpperCase() as keyof typeof eTicketPriorityColor
    ];
  }

  protected getStatusColor(): string {
    return eTicketStatusColor[
      this.ticket.status.toUpperCase() as keyof typeof eTicketStatusColor
    ];
  }

  protected getTagColor(): string {
    return eTicketTagColor[
      this.ticket.tag.toUpperCase() as keyof typeof eTicketTagColor
    ];
  }
}
