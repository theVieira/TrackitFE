import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { iAttachment } from '@shared/models/attachment.model';
import { AddAttachmentDialog } from '../../dialogs/add-attachment/add-attachment.dialog';
import { DatePipe } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-ticket-attachments',
  imports: [
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    DatePipe,
    TranslocoModule,
  ],
  templateUrl: './ticket-attachments.component.html',
})
export class TicketAttachmentsComponent {
  private readonly _dialog = inject(MatDialog);

  @Input({ required: true }) attachments!: iAttachment[];
  @Input({ required: true }) ticketId!: string;

  protected addAttachment(): void {
    const dialogRef = this._dialog.open(AddAttachmentDialog, {
      data: { id: this.ticketId },
    });

    dialogRef.afterClosed().subscribe({
      next: (data) => {
        this.attachments.unshift(data);
      },
    });
  }
}
