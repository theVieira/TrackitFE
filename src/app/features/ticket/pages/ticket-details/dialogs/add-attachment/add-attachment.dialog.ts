import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TicketService } from '@features/ticket/services/ticket.service';
import { NotificationService } from '@shared/services/notification.service';

@Component({
  selector: 'app-add-attachment',
  imports: [
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './add-attachment.dialog.html',
})
export class AddAttachmentDialog {
  private readonly _data = inject<{ id: string }>(MAT_DIALOG_DATA);
  private readonly _ticketService = inject(TicketService);
  private readonly _notificationService = inject(NotificationService);
  private readonly _dialogRef = inject(MatDialogRef);

  protected selectedFile: File | null = null;

  protected onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  protected onSubmit(ev: SubmitEvent): void {
    ev.preventDefault();

    if (!this.selectedFile)
      return this._notificationService.error('Selecione um arquivo');

    if (!this._data.id)
      return this._notificationService.error('Id não passado');

    this._ticketService
      .addAttachment({
        id: this._data.id,
        file: this.selectedFile!,
      })
      .subscribe({
        next: (res) => {
          this._notificationService.success('Anexado com sucesso!');
          this._dialogRef.close(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
