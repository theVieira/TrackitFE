import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ClientService } from '@/services/client.service';
import { Client } from '@/@types/client.type';

@Component({
  selector: 'app-client-filter',
  templateUrl: 'client.component.html',
  styleUrl: 'client.component.scss',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
})
export class ClientComponent implements OnInit {
  @Output() clientSelected = new EventEmitter<string>();

  private clientService = inject(ClientService);

  protected myControl = new FormControl<string>('');
  protected options: string[] = [];

  ngOnInit(): void {
    this.clientService.getAllClients().subscribe(({ items }) => {
      this.options = items.map(({ name }: Client) => name);
      this.options.unshift('Todos');
    });

    this.myControl.valueChanges.subscribe((selectedValue) => {
      if (selectedValue && this.options.includes(selectedValue)) {
        if (selectedValue == 'Todos') {
          this.clientSelected.emit('');
          return;
        }

        this.clientSelected.emit(selectedValue);
        return;
      }
    });
  }
}
