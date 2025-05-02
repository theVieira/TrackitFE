import { Component, ElementRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketsService } from '@/services/tickets.service';
import {
  Ticket,
  TicketCategory,
  TicketPriority,
  TicketStatus,
} from '@/@types/ticket.type';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Translate } from '@/utils/translate.util';
import { MatIconModule } from '@angular/material/icon';
import { FormatDate } from '@/utils/format-date.util';

@Component({
  selector: 'app-ticket-details',
  imports: [MatCardModule, MatDividerModule, MatButtonModule, MatIconModule],
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.scss',
})
export class TicketDetailsComponent implements OnInit {
  private hostElement = inject(ElementRef);
  private ticketsService = inject(TicketsService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  protected ticket!: Ticket | null;
  protected translate = new Translate();
  protected formatDate = new FormatDate();
  protected ticketStatus = TicketStatus;

  protected statusStyle!: string;
  protected priorityStyle!: string;
  protected categoryStyle!: string;

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id)
      this.ticketsService.GetTicketById(id).subscribe((data) => {
        if (!data) this.router.navigate(['not-found']);
        else this.ticket = data;

        this.getStatusStyle();
        this.getCategoryStyle();
        this.getPriorityStyle();
      });
    else this.router.navigate(['not-found']);
  }

  printPage() {
    const host = this.hostElement.nativeElement as HTMLElement;

    const originalBody = document.body.innerHTML;

    document.body.innerHTML = host.innerHTML;

    window.print();

    document.body.innerHTML = originalBody;
  }

  getStatusStyle() {
    if (this.ticket)
      switch (this.ticket.status) {
        case TicketStatus.Open:
          return (this.statusStyle = 'background: #a62f26');
        case TicketStatus.Progress:
          return (this.statusStyle = 'background: #b09321');
        case TicketStatus.Finish:
          return (this.statusStyle = 'background: #6aab20');
        case TicketStatus.Cancelled:
          return (this.statusStyle = 'background: #545c4a');
      }

    return;
  }

  getCategoryStyle() {
    if (this.ticket)
      switch (this.ticket.category) {
        case TicketCategory.Daily:
          return (this.categoryStyle = 'background: #a62f26');
        case TicketCategory.Budget:
          return (this.categoryStyle = 'background: #3a65a6');
        case TicketCategory.Delivery:
          return (this.categoryStyle = 'background: #6aab20');
        case TicketCategory.Maintenance:
          return (this.categoryStyle = 'background: #bf642c');
      }

    return;
  }

  getPriorityStyle() {
    if (this.ticket)
      switch (this.ticket.priority) {
        case TicketPriority.Low:
          return (this.priorityStyle = 'background: #3a65a6');
        case TicketPriority.Medium:
          return (this.priorityStyle = 'background: #6aab20');
        case TicketPriority.High:
          return (this.priorityStyle = 'background: #bf642c');
        case TicketPriority.Urgent:
          return (this.priorityStyle = 'background: #a62f26');
      }

    return;
  }
}
