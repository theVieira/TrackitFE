import { Component, inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { ClientAutocompleteWidget } from '@widgets/components/client-autocomplete/client-autocomplete.widget';
import { iClient } from '@features/client/models/client.model';

@Component({
  selector: 'app-client-filters-dialog',
  imports: [MatListModule, ClientAutocompleteWidget],
  templateUrl: './client-filters.dialog.html',
})
export class ClientFiltersDialogComponent {
  private _data = inject(MAT_BOTTOM_SHEET_DATA) as {
    changeClient: (client: iClient | null) => void;
  };

  protected onChangeClient(client: iClient | null) {
    this._data.changeClient(client);
  }
}
