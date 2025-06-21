import { Component, computed, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { iTicket } from '@features/ticket/models/ticket.model';
import { TicketService } from '@features/ticket/services/ticket.service';
import { TranslocoModule } from '@jsverse/transloco';
import { MatExpansionModule } from '@angular/material/expansion';
import { AvatarShared } from '@shared/components/avatar/avatar.shared';
import { iTicketTimeline } from '@features/ticket/models/ticket-timeline.model';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '@shared/services/notification.service';
import { eTicketStatus } from '@features/ticket/enums/ticket-status.enum';
import { TicketFinishDialog } from '@features/ticket/pages/ticket-details/dialogs/ticket-finish/ticket-finish-dialog.component';
import { ConfirmDelete } from '@widgets/dialogs/confirm-delete/confirm-delete.dialog';
import { TicketTimelineComponent } from './components/ticket-timeline/ticket-timeline.component';
import { TicketNotesComponent } from './components/ticket-notes/ticket-notes.component';

@Component({
  selector: 'app-ticket-details',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    TranslocoModule,
    AvatarShared,
    MatExpansionModule,
    TicketTimelineComponent,
    TicketNotesComponent,
  ],
  templateUrl: './ticket-details.page.html',
})
export class TicketDetailsPage {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _ticketService = inject(TicketService);
  private readonly _dialog = inject(MatDialog);
  private readonly _notificationService = inject(NotificationService);

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
      if (data) this.signalTicket.set(data);
      else this._router.navigate(['not-found']);
    });

    this.getTicketTimeline();
  });

  private getTicketTimeline() {
    this._ticketService
      .getTicketTimeline(this.ticket()!.id)
      .subscribe((data) => {
        if (data) this.signalTimeline.set(data);
      });
  }

  protected setProgress(): void {
    this._ticketService.setProgress(this.ticket().id).subscribe({
      next: () => {
        this.ticket().status = eTicketStatus.PROGRESS;
        this.getTicketTimeline();
        this._notificationService.success('Ticket marcado em progresso');
      },
    });
  }

  protected setFinish(): void {
    this._dialog.open(TicketFinishDialog);
  }

  protected confirmDelete(): void {
    this._dialog.open(ConfirmDelete);
  }

  protected print() {
    window.print();
  }
}
