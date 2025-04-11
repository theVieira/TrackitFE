import { ClientTag } from '@/@types/client.type';
import { ClientService } from '@/services/client.service';
import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-new-client',
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './create-new-client.component.html',
  styleUrl: './create-new-client.component.scss',
})
export class CreateNewClientComponent {
  private clientServices = inject(ClientService);

  private formBuilder = inject(NonNullableFormBuilder);
  private toastService = inject(ToastrService);

  protected form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(30)]],
    cnpj: ['', [Validators.required, Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.maxLength(20)]],
    tag: ['' as ClientTag, [Validators.required]],
  });

  protected selectedTag = '';

  protected onSubmit(e: Event) {
    e.preventDefault();

    if (!this.form.valid) {
      this.toastService.error(
        'Verifique e tente novamente',
        'O formulário não é válido'
      );

      return;
    }

    const rawValue = this.form.getRawValue();

    const response = this.clientServices.createNewClient({
      ...rawValue,
      cnpj: String(rawValue.cnpj),
      phone: String(rawValue.phone),
    });

    response.subscribe({
      next: () => {
        this.toastService.success('Cliente criado com sucesso');
        this.form.reset();
        return;
      },
      error: (err) => {
        console.log(err);
        this.toastService.error('Ocorreu um erro ao criar o cliente');
      },
    });
  }

  protected cleanForm() {
    this.form.reset();
  }
}
