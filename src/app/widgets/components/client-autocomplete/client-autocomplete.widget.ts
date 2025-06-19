import {
  Component,
  effect,
  EventEmitter,
  inject,
  Output,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { iClient } from '@features/client/models/client.model';
import { ClientService } from '@features/client/services/client.service';

@Component({
  selector: 'app-client-autocomplete',
  imports: [
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './client-autocomplete.widget.html',
})
export class ClientAutocompleteWidget {
  @Output() clientSelected = new EventEmitter<iClient | null>();

  private readonly _clientService = inject(ClientService);

  protected clientForm = new FormControl<iClient | null>(null);
  private _allClients = signal<iClient[]>([]);
  protected filteredClients = signal<iClient[]>([]);

  private _getClients = effect(() => {
    this._clientService
      .getClients({ skip: 0, take: 20 })
      .subscribe(({ items }) => {
        this._allClients.set(items);
        this.filteredClients.set(items);
      });

    this.clientForm.valueChanges.subscribe((value: string | iClient | null) => {
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        this.filteredClients.set(this._allClients());
        this.clientSelected.emit(null);
      }

      const searchInput =
        typeof value === 'string'
          ? value.toLowerCase()
          : value?.name?.toLowerCase() ?? '';

      this.filteredClients.set(
        this._allClients().filter((client) =>
          client.name.toLowerCase().includes(searchInput)
        )
      );
    });
  });

  protected displayFn(client: iClient | { name: string } | string): string {
    return typeof client === 'string' ? client : client?.name ?? '';
  }

  protected onClientSelected(client: iClient): void {
    this.clientSelected.emit(client);
  }
}
