import { eTicketPriority } from '@features/ticket/enums/ticket-priority.enum';
import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { SelectCategoryFilterComponent } from '@widgets/components/select-category-filter/select-category-filter.component';
import { SelectPriorityFilterComponent } from '@widgets/components/select-priority-filter/select-priority-filter.component';
import { SelectStatusFilterComponent } from '@widgets/components/select-status-filter/select-status-filter.component';
import { RangeDatePickerComponent } from '@widgets/components/range-date-picker/range-date-picker.component';
import { eTicketCategory } from '@features/ticket/enums/ticket-category.enum';
import { eTicketStatus } from '@features/ticket/enums/ticket-status.enum';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { SelectClientAutocompleteComponent } from '../../../../widgets/components/select-client-autocomplete/select-client-autocomplete.component';
import { iClient } from '@features/client/models/client.model';

@Component({
  selector: 'app-ticket-filters-dialog',
  imports: [
    MatListModule,
    SelectPriorityFilterComponent,
    SelectCategoryFilterComponent,
    SelectStatusFilterComponent,
    RangeDatePickerComponent,
    SelectClientAutocompleteComponent,
  ],
  templateUrl: './ticket-filters-dialog.component.html',
})
export class TicketFiltersDialogComponent {
  private _data = inject(MAT_BOTTOM_SHEET_DATA) as {
    changeCategory: (category: eTicketCategory[]) => void;
    changeStatus: (status: eTicketStatus[]) => void;
    changePriority: (priority: eTicketPriority[]) => void;
    changeClient: (client: iClient | null) => void;
  };

  protected onChangeCategory(category: eTicketCategory[]) {
    this._data.changeCategory(category);
  }

  protected onChangeStatus(status: eTicketStatus[]) {
    this._data.changeStatus(status);
  }

  protected onChangePriority(priority: eTicketPriority[]) {
    this._data.changePriority(priority);
  }

  protected onChangeClient(client: iClient | null) {
    this._data.changeClient(client);
  }
}
