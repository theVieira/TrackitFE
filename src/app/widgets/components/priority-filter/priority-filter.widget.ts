import { Component, effect, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { StorageService } from '@core/services/storage.service';
import { eTicketPriority } from '@features/ticket/enums/ticket-priority.enum';
import { TranslocoModule } from '@jsverse/transloco';
import { PRIORITY_FILTER_CONST } from '@widgets/components/priority-filter/priority-filter.constant';

@Component({
  selector: 'app-priority-filter',
  imports: [
    MatSelectModule,
    ReactiveFormsModule,
    TranslocoModule,
    MatButtonModule,
  ],
  templateUrl: './priority-filter.widget.html',
})
export class PriorityFilterWidget {
  @Output() priorityChanged = new EventEmitter();

  private readonly _storageService = inject(StorageService);
  private readonly _priorityStorageName = 'priority_select_filter';

  protected priorityForm = new FormControl<eTicketPriority[]>(
    PRIORITY_FILTER_CONST
  );
  protected priorityList: eTicketPriority[] = PRIORITY_FILTER_CONST;

  private readonly _getPriority = effect(() => {
    const priority = this._storageService.getItem<eTicketPriority[]>(
      this._priorityStorageName
    );

    if (priority) {
      this.priorityForm.setValue(priority);
      this.priorityChanged.emit(priority);
    }
  });

  onSelect() {
    this._storageService.setItem(
      this._priorityStorageName,
      this.priorityForm.getRawValue()
    );

    this.priorityChanged.emit(this.priorityForm.getRawValue());
  }
}
