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
import { MatFormFieldModule } from '@angular/material/form-field';
import { ClientComponent } from '../../../components/filters/client/client.component';

@Component({
  selector: 'app-create-new-ticket',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    ClientComponent,
  ],
  templateUrl: './create-ticket.component.html',
  styleUrl: './create-ticket.component.scss',
})
export class CreateTicketComponent {
  private formBuilder = inject(NonNullableFormBuilder);

  protected form = this.formBuilder.group({
    client: ['', Validators.required],
  });

  onSubmit(e: Event) {}

  onClientSelected(e: string) {
    this.form.controls.client.setValue(e);
    console.log(this.form.controls.client.value);
  }
}
