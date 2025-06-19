import { Component, computed, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { iTicket } from '@features/ticket/models/ticket.model';
import { TicketService } from '@features/ticket/services/ticket.service';
import { TranslocoModule } from '@jsverse/transloco';
import { MatExpansionModule } from '@angular/material/expansion';
import { AvatarComponent } from '@shared/components/avatar/avatar.component';
import { DateUtil } from '@shared/utils/date.util';
import { iTicketTimeline } from '@features/ticket/models/ticket-timeline.model';
import { MatDialog } from '@angular/material/dialog';
import { TicketAddNoteDialogComponent } from '@features/ticket/dialogs/ticket-add-note-dialog/ticket-add-note-dialog.component';
import { NotificationService } from '@shared/services/notification.service';
import { eTicketStatus } from '@features/ticket/enums/ticket-status.enum';
import { TicketFinishDialogComponent } from '@features/ticket/dialogs/ticket-finish-dialog/ticket-finish-dialog.component';
import { ConfirmDeleteComponent } from '@widgets/dialogs/confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-ticket-details',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    TranslocoModule,
    AvatarComponent,
    MatExpansionModule,
  ],
  templateUrl: './ticket-details.component.html',
})
export class TicketDetailsComponent {
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

  protected formatDate(date: Date): string {
    return DateUtil.getFormattedDate(date);
  }

  protected openAddNoteDialog(): void {
    this._dialog.open(TicketAddNoteDialogComponent);
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
    this._dialog.open(TicketFinishDialogComponent);
  }

  protected confirmDelete(): void {
    this._dialog.open(ConfirmDeleteComponent);
  }

  protected print() {
    window.print();
  }
}
