import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
  selector: 'app-ticket-add-note-dialog',
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './ticket-add-note.dialog.html',
})
export class TicketAddNoteDialog {
  private readonly _dialogRef = inject(MatDialogRef);
  private readonly _notificationService = inject(NotificationService);
  private readonly _formBuilder = inject(NonNullableFormBuilder);
  private readonly _ticketService = inject(TicketService);
  private readonly _data = inject<{ id: string }>(MAT_DIALOG_DATA);

  protected form = this._formBuilder.group({
    content: ['', [Validators.required, Validators.minLength(12)]],
  });

  protected onSubmit(ev: SubmitEvent): void {
    ev.preventDefault();
    this._ticketService
      .addTicketNote(this._data.id, this.form.getRawValue().content)
      .subscribe({
        next: (res) => {
          this._notificationService.success('Nota adicionada com sucesso');
          this._dialogRef.close(res);
        },
      });
  }
}
