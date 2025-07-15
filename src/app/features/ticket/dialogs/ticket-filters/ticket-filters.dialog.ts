import { eTicketPriority } from '@features/ticket/enums/ticket-priority.enum';
import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { CategoryFilterWidget } from '@widgets/components/category-filter/category-filter.widget';
import { StatusFilterWidget } from '@widgets/components/status-filter/status-filter.widget';
import { RangeDatePickerWidget } from '@widgets/components/range-date-picker/range-date-picker.widget';
import { eTicketCategory } from '@features/ticket/enums/ticket-category.enum';
import { eTicketStatus } from '@features/ticket/enums/ticket-status.enum';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ClientAutocompleteWidget } from '@widgets/components/client-autocomplete/client-autocomplete.widget';
import { iClient } from '@features/client/models/client.model';
import { PriorityFilterWidget } from '@widgets/components/priority-filter/priority-filter.widget';

@Component({
  selector: 'app-ticket-filters-dialog',
  imports: [
    MatListModule,
    PriorityFilterWidget,
    CategoryFilterWidget,
    StatusFilterWidget,
    RangeDatePickerWidget,
    ClientAutocompleteWidget,
  ],
  templateUrl: './ticket-filters.dialog.html',
})
export class TicketFiltersDialog {
  private _data = inject(MAT_BOTTOM_SHEET_DATA) as {
    changeCategory: (category: eTicketCategory[]) => void;
    changeStatus: (status: eTicketStatus[]) => void;
    changePriority: (priority: eTicketPriority[]) => void;
    changeClient: (client: iClient | null) => void;
    changeDate: ({ end, start }: { start: Date; end: Date }) => void;
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

  protected onChangeDate({ start, end }: { start: Date; end: Date }) {
    this._data.changeDate({ start, end });
  }
}
