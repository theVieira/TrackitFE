import { Component, inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { SelectClientAutocompleteComponent } from '../../../../widgets/components/select-client-autocomplete/select-client-autocomplete.component';
import { iClient } from '@features/client/models/client.model';

@Component({
  selector: 'app-client-filters-dialog',
  imports: [MatListModule, SelectClientAutocompleteComponent],
  templateUrl: './client-filters-dialog.component.html',
})
export class ClientFiltersDialogComponent {
  private _data = inject(MAT_BOTTOM_SHEET_DATA) as {
    changeClient: (client: iClient | null) => void;
  };

  protected onChangeClient(client: iClient | null) {
    this._data.changeClient(client);
  }
}
