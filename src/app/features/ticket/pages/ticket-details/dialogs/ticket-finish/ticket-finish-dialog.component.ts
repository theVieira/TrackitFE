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
import { TranslocoModule } from '@jsverse/transloco';
import { NotificationService } from '@shared/services/notification.service';

@Component({
  selector: 'app-ticket-finish-dialog',
  imports: [
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    TranslocoModule,
  ],
  templateUrl: './ticket-finish-dialog.component.html',
})
export class TicketFinishDialog {
  private readonly _data = inject<{ id: string }>(MAT_DIALOG_DATA);
  private readonly _formBuilder = inject(NonNullableFormBuilder);
  private readonly _ticketService = inject(TicketService);
  private readonly _notificationService = inject(NotificationService);
  private readonly _dialogRef = inject(MatDialogRef);

  protected readonly form = this._formBuilder.group({
    content: ['', [Validators.required, Validators.minLength(12)]],
  });

  protected onSubmit(ev: SubmitEvent): void {
    ev.preventDefault();

    if (this.form.invalid) return;

    const { content } = this.form.getRawValue();
    this._ticketService.setFinish(this._data.id, content).subscribe({
      error: (err) => {
        console.log(err);
        this._notificationService.error('Ocorreu um erro');
      },
      next: () => {
        this._notificationService.success('Ticket finalizado com sucesso');
        this._dialogRef.close(200);
      },
    });
  }
}
