import { Component, computed, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { iTicket } from '@features/ticket/models/ticket.model';
import { TicketService } from '@features/ticket/services/ticket.service';
import { TranslocoModule } from '@jsverse/transloco';
import { MatExpansionModule } from '@angular/material/expansion';
import { iTicketTimeline } from '@features/ticket/models/ticket-timeline.model';
import { eTicketStatus } from '@features/ticket/enums/ticket-status.enum';
import { TicketTimelineComponent } from './components/ticket-timeline/ticket-timeline.component';
import { TicketNotesComponent } from './components/ticket-notes/ticket-notes.component';
import { TicketActionsComponent } from './components/ticket-actions/ticket-actions.component';
import { PrintButtonShared } from '../../../../shared/components/print-button/print-button.shared';
import { NoPrintDirective } from '@widgets/directives/no-print.directive';
import { TicketMainInformationComponent } from './components/ticket-main-information/ticket-main-information.component';
import { TicketAttachmentsComponent } from './components/ticket-attachments/ticket-attachments.component';

@Component({
  selector: 'app-ticket-details',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    TranslocoModule,
    MatExpansionModule,
    TicketTimelineComponent,
    TicketNotesComponent,
    TicketActionsComponent,
    PrintButtonShared,
    NoPrintDirective,
    TicketMainInformationComponent,
    TicketAttachmentsComponent,
  ],
  templateUrl: './ticket-details.page.html',
})
export class TicketDetailsPage {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _ticketService = inject(TicketService);

  protected signalTicket = signal<iTicket | null>(null);
  protected signalTimeline = signal<iTicketTimeline[]>([]);

  protected readonly ticket = computed(() => this.signalTicket()!);
  protected readonly timeline = computed(() => this.signalTimeline()!);

  protected readonly eTicketStatus = eTicketStatus;

  private readonly _getTicket = effect(() => {
    const id = this._activatedRoute.snapshot.paramMap.get('id');

    if (!id) {
      this._router.navigate(['not-found']);
      return;
    }

    this._ticketService.getTicketById(id).subscribe((data) => {
      if (data) {
        this.signalTicket.set(data);
        this.getTimeline();
      } else this._router.navigate(['not-found']);
    });
  });

  protected getTimeline() {
    this._ticketService
      .getTicketTimeline(this.ticket().id)
      .subscribe((data) => {
        this.signalTimeline.set(data);
      });
  }
}
