import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketsService } from '@/services/tickets.service';
import { Ticket } from '@/@types/ticket.type';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ticket-details',
  imports: [MatCardModule, MatDividerModule, MatButtonModule],
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.scss',
})
export class TicketDetailsComponent implements OnInit {
  private ticketsService = inject(TicketsService);
  private activatedRoute = inject(ActivatedRoute);
  private route = inject(Router);
  protected ticket!: Ticket | null;

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id)
      this.ticketsService
        .GetTicketById(id)
        .subscribe((data) => (this.ticket = data));

    return;
  }

  backToTickets() {
    this.route.navigate(['tickets']);
  }
}
