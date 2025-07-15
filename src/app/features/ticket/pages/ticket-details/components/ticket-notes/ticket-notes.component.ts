import { DatePipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@jsverse/transloco';
import { TicketAddNoteDialog } from '../../dialogs/ticket-add-note/ticket-add-note.dialog';
import { iTicket } from '@features/ticket/models/ticket.model';

@Component({
  selector: 'app-ticket-notes',
  imports: [
    MatExpansionModule,
    MatIconModule,
    TranslocoModule,
    DatePipe,
    MatButtonModule,
  ],
  templateUrl: './ticket-notes.component.html',
})
export class TicketNotesComponent {
  private readonly _dialog = inject(MatDialog);

  @Input({ required: true }) ticket!: iTicket;

  protected openAddNoteDialog() {
    const dialogRef = this._dialog.open(TicketAddNoteDialog, {
      data: { id: this.ticket.id },
    });

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        this.ticket.notes.unshift(res);
      },
    });
  }
}
