import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '@/services/client.service';
import { Client } from '@/@types/client.type';
import { MatCardModule } from '@angular/material/card';
import { FormatDate } from '@/utils/format-date.util';
import {
  Ticket,
  TicketCategory,
  TicketPriority,
  TicketStatus,
} from '@/@types/ticket.type';
import { TicketsService } from '@/services/tickets.service';

@Component({
  selector: 'app-client-details',
  imports: [MatCardModule],
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.scss',
})
export class ClientDetailsComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private clientServices = inject(ClientService);
  private ticketServices = inject(TicketsService);

  protected formatDate = new FormatDate();
  protected client!: Client | null;
  protected tickets: Ticket[] = [];

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (!id) return;

    this.clientServices
      .getClientById(id)
      .subscribe((data) => (this.client = data));

    this.getTicketsOpen();
  }

  getTicketsOpen() {
    if (this.client) {
      this.ticketServices.GetAllTickets(
        [TicketStatus.Open],
        [
          TicketCategory.Budget,
          TicketCategory.Daily,
          TicketCategory.Delivery,
          TicketCategory.Maintenance,
        ],
        [
          TicketPriority.High,
          TicketPriority.Low,
          TicketPriority.Medium,
          TicketPriority.Urgent,
        ],
        this.client.name
      );
    }
  }
}
