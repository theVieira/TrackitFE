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
          return (this.statusStyle = 'background: red');
        case TicketStatus.Progress:
          return (this.statusStyle = 'background: orange');
        case TicketStatus.Finish:
          return (this.statusStyle = 'background: green');
        case TicketStatus.Cancelled:
          return (this.statusStyle = 'background: gray');
      }

    return;
  }

  getCategoryStyle() {
    if (this.ticket)
      switch (this.ticket.category) {
        case TicketCategory.Daily:
          return (this.categoryStyle = 'background: red');
        case TicketCategory.Budget:
          return (this.categoryStyle = 'background: red');
        case TicketCategory.Delivery:
          return (this.categoryStyle = 'background: red');
        case TicketCategory.Maintenance:
          return (this.categoryStyle = 'background: red');
      }

    return;
  }

  getPriorityStyle() {
    if (this.ticket)
      switch (this.ticket.priority) {
        case TicketPriority.Low:
          return (this.priorityStyle = 'background: red');
        case TicketPriority.Medium:
          return (this.priorityStyle = 'background: red');
        case TicketPriority.High:
          return (this.priorityStyle = 'background: red');
        case TicketPriority.Urgent:
          return (this.priorityStyle = 'background: red');
      }

    return;
  }
}
