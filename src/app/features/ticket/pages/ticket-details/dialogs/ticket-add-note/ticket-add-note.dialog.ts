import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TicketService } from '@features/ticket/services/ticket.service';

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
  private readonly _formBuilder = inject(NonNullableFormBuilder);
  private readonly _ticketService = inject(TicketService);

  protected form = this._formBuilder.group({
    content: ['', [Validators.required, Validators.minLength(12)]],
  });

  protected onSubmit(ev: SubmitEvent): void {
    ev.preventDefault();
  }
}
