import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { eClientTag } from '@features/client/enums/client-tag.enum';
import { ClientService } from '@features/client/services/client.service';
import { NotificationService } from '@shared/services/notification.service';

@Component({
  selector: 'app-client-create',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './client-create.page.html',
})
export class CreateClientPage {
  private readonly _formBuilder = inject(NonNullableFormBuilder);
  private readonly _notificationService = inject(NotificationService);
  private readonly _clientService = inject(ClientService);

  protected form = this._formBuilder.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    cnpj: [
      '',
      [Validators.required, Validators.minLength(14), Validators.maxLength(18)],
    ],
    phone: [
      '',
      [Validators.required, Validators.minLength(13), Validators.maxLength(19)],
    ],
    email: ['', [Validators.required, Validators.email]],
    tag: [eClientTag.VIP, Validators.required],
  });

  protected onSubmit(event: SubmitEvent) {
    event.preventDefault();

    this._clientService
      .createClient(this.form.getRawValue())
      .pipe()
      .subscribe({
        next: () => {
          this.form.reset();
          this._notificationService.success('Cliente criado');
        },
        error: (err) => {
          console.log(err);
          this._notificationService.error(
            'Verifique os dados e tente novamente',
            'Ocorreu um erro'
          );
        },
      });
  }
}
