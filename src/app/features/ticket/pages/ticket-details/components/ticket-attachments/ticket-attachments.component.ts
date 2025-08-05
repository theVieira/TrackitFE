import { Component, effect, inject, Input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { iAttachment } from '@shared/models/attachment.model';
import { AddAttachmentDialog } from '../../dialogs/add-attachment/add-attachment.dialog';
import { DatePipe } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';
import { TicketService } from '@features/ticket/services/ticket.service';
import { NotificationService } from '@shared/services/notification.service';
import { StorageService } from '@core/services/storage.service';
import { environment } from '@environment';
import { iTech } from '@features/tech/models/tech.model';
import { AuthorizationService } from '@core/services/authorization.service';

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

  private readonly _storageService = inject(StorageService);
  private readonly _ticketService = inject(TicketService);
  private readonly _notificationService = inject(NotificationService);
  private readonly _authorizationService = inject(AuthorizationService);

  protected techId = signal<string>('');

  protected isAdmin = effect(() => {
    const techStorage = this._storageService.getItem<iTech>(
      environment.techCookieName
    );

    this.techId.set(techStorage!.id);

    return this._authorizationService.isAdmin();
  });

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

  protected deleteAttachment(id: string) {
    this._ticketService.deleteAttachment(id).subscribe({
      next: () => {
        const index = this.attachments.findIndex((el) => el.id === id);
        this.attachments.splice(index, 1);
        this._notificationService.success('Anexo deletado');
      },
      error: (err) => {
        console.log(err);
        this._notificationService.error('Ocorreu um erro ao tentar deletar');
      },
    });
  }
}
