import { Component, effect, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { iTicket } from '@features/ticket/models/ticket.model';
import { TicketService } from '@features/ticket/services/ticket.service';

@Component({
  selector: 'app-ticket-details',
  imports: [MatCardModule],
  templateUrl: './ticket-details.component.html',
})
export class TicketDetailsComponent {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _ticketService = inject(TicketService);

  protected ticket = signal<iTicket | null>(null);

  private readonly _getTicket = effect(() => {
    const id = this._activatedRoute.snapshot.paramMap.get('id');

    if (!id) {
      this._router.navigate(['not-found']);
      return;
    }

    this._ticketService.getTicketById(id).subscribe((data) => {
      if (data) this.ticket.set(data);
      else this._router.navigate(['not-found']);
    });

    this._router.navigate(['../' + this.ticket()?.smallId], {
      replaceUrl: true,
      relativeTo: this._activatedRoute,
    });
  });
}
