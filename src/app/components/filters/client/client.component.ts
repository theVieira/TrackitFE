import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ClientService } from '@/services/client.service';
import { Client } from '@/@types/client.type';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-client-filter',
  templateUrl: 'client.component.html',
  styleUrls: ['client.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
  ],
})
export class ClientComponent implements OnInit {
  @Output() clientSelected = new EventEmitter<Client>();

  private clientService = inject(ClientService);

  protected myControl = new FormControl<string | Client>('');
  protected allOptions: Client[] = [];
  protected filteredOptions: Client[] = [];

  ngOnInit(): void {
    const allOption: Client = {
      name: 'Todos',
      id: '',
      cnpj: '',
      createdAt: new Date(),
      email: '',
      phone: '',
      smallId: '',
    };

    this.clientService.getAllClients().subscribe(({ items }) => {
      this.allOptions = [allOption, ...items];
      this.filteredOptions = this.allOptions;
    });

    this.myControl.valueChanges.pipe(startWith('')).subscribe((value) => {
      const name =
        typeof value === 'string'
          ? value.toLowerCase()
          : value?.name.toLowerCase();
      this.filteredOptions = this.allOptions.filter(({ name: optName }) =>
        optName.toLowerCase().includes(name ?? '')
      );

      const selected = this.allOptions.find(
        ({ name: optName }) => optName.toLowerCase() === name
      );

      if (selected) {
        if (selected.name === 'Todos') {
          this.clientSelected.emit({ ...allOption, name: '' });
        } else {
          this.clientSelected.emit(selected as Client);
        }
      }
    });
  }

  displayFn(client: Client | { name: string } | string): string {
    return typeof client === 'string' ? client : client?.name ?? '';
  }
}
