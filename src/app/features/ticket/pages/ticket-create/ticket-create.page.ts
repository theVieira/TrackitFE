import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ClientAutocompleteWidget } from '../../../../widgets/components/client-autocomplete/client-autocomplete.widget';
import { iClient } from '@features/client/models/client.model';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TicketService } from '@features/ticket/services/ticket.service';
import { NotificationService } from '@shared/services/notification.service';
import { iCreateTicketRequest } from '@features/ticket/api/create-ticket.request';

@Component({
  selector: 'app-create-ticket',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    ClientAutocompleteWidget,
  ],
  templateUrl: './ticket-create.page.html',
})
export class CreateTicketPage {
  private readonly _formBuilder = inject(NonNullableFormBuilder);
  private readonly _ticketService = inject(TicketService);
  private readonly _notificationService = inject(NotificationService);

  protected form = this._formBuilder.group({
    description: [
      '',
      [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(600),
      ],
    ],
    clientId: ['', [Validators.required]],
    priority: [null, [Validators.required]],
    category: [null, [Validators.required]],
    tag: [null, [Validators.required]],
  });

  protected onSubmit(event: SubmitEvent) {
    event.preventDefault();

    const { category, priority, tag, clientId, description } =
      this.form.getRawValue();

    if (this.form.invalid || !category || !priority || !tag)
      return this._notificationService.error(
        'Verifique as informações e tente novamente',
        'Formulário inválido'
      );

    const payload: iCreateTicketRequest = {
      category,
      priority,
      tag,
      clientId,
      description,
    };

    this._ticketService.createTicket(payload).subscribe({
      next: () => {
        this._notificationService.success('Ticket criado com sucesso');
      },
      error: (err) => {
        console.log(err);
        this._notificationService.error('Ocorreu um erro ao criar o ticket');
      },
    });
  }

  protected onClientSelected(client: iClient | null) {
    if (client) this.form.controls.clientId.setValue(client.id);
  }
}
