/* eslint-disable @angular-eslint/no-output-on-prefix */
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { eTicketStatus } from '@features/ticket/enums/ticket-status.enum';
import { iTicket } from '@features/ticket/models/ticket.model';
import { TicketService } from '@features/ticket/services/ticket.service';
import { TranslocoModule } from '@jsverse/transloco';
import { NotificationService } from '@shared/services/notification.service';
import { TicketFinishDialog } from '../../dialogs/ticket-finish/ticket-finish-dialog.component';
import { ConfirmDeleteDialog } from '@widgets/dialogs/confirm-delete/confirm-delete.dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-actions',
  imports: [MatCardModule, MatIconModule, TranslocoModule, MatButtonModule],
  templateUrl: './ticket-actions.component.html',
})
export class TicketActionsComponent {
  private readonly _ticketService = inject(TicketService);
  private readonly _notificationService = inject(NotificationService);
  private readonly _dialog = inject(MatDialog);
  private readonly _router = inject(Router);

  @Input({ required: true }) ticket!: iTicket;
  @Output() onUpdated = new EventEmitter<void>();

  protected readonly eTicketStatus = eTicketStatus;

  protected setProgress(): void {
    this._ticketService.setProgress(this.ticket.id).subscribe({
      next: () => {
        this.ticket.status = eTicketStatus.PROGRESS;
        this.onUpdated.emit();
        this._notificationService.success('Ticket marcado em progresso');
      },
    });
  }

  protected setFinish(): void {
    const dialogRef = this._dialog.open(TicketFinishDialog, {
      data: {
        id: this.ticket.id,
      },
    });

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res !== 200) return;
        this.ticket.status = this.eTicketStatus.FINISH;
        this.onUpdated.emit();
      },
    });
  }

  protected delete(): void {
    const dialogRef = this._dialog.open(ConfirmDeleteDialog);

    dialogRef.afterClosed().subscribe((data) => {
      if (!data) return;

      this._ticketService.deleteTicket(this.ticket.id).subscribe({
        next: () => {
          this._notificationService.success('Ticket deletado');
          this._router.navigate(['/ticket']);
        },
      });
    });
  }

  protected reopenTicket() {
    this._ticketService.reopenTicket(this.ticket.id).subscribe({
      next: () => {
        this.ticket.status = eTicketStatus.OPEN;
        this.onUpdated.emit();
      },
    });
  }
}
