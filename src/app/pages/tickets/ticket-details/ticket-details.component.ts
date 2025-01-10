import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketsService } from '@/services/tickets.service';
import { Ticket } from '@/@types/ticket.type';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { format } from 'date-fns';
import { Translate } from '@/utils/translate.util';

@Component({
  selector: 'app-ticket-details',
  imports: [MatCardModule, MatDividerModule, MatButtonModule],
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.scss',
})
export class TicketDetailsComponent implements OnInit {
  private ticketsService = inject(TicketsService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  protected ticket!: Ticket | null;
  protected translate = new Translate();

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id)
      this.ticketsService.GetTicketById(id).subscribe((data) => {
        if (!data) this.router.navigate(['not-found']);
        else this.ticket = data;
      });
    else this.router.navigate(['not-found']);
  }

  backToTickets() {
    this.router.navigate(['tickets']);
  }

  formatDate(date: Date) {
    const dateFormatted = `🗓️ ${format(date, 'dd/MM/yyyy')}`;
    const hourFormatted = `⏱️ ${format(date, 'hh:mm')}`;

    return `${dateFormatted} ${hourFormatted}`;
  }
}
