import { Component, effect, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { StorageService } from '@core/services/storage.service';
import { eTicketStatus } from '@features/ticket/enums/ticket-status.enum';
import { TranslocoModule } from '@jsverse/transloco';
import { STATUS_FILTER_CONST } from '@widgets/components/status-filter/status-filter.constant';

@Component({
  selector: 'app-status-filter',
  imports: [
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    TranslocoModule,
  ],
  templateUrl: './status-filter.widget.html',
})
export class StatusFilterWidget {
  @Output() statusChanged = new EventEmitter();

  private readonly _storageService = inject(StorageService);
  private readonly _statusStorageName = '_status_select_filter';

  protected statusForm = new FormControl(STATUS_FILTER_CONST);

  protected statusList: eTicketStatus[] = STATUS_FILTER_CONST;

  private readonly _getStatus = effect(() => {
    const status = this._storageService.getItem<eTicketStatus[]>(
      this._statusStorageName
    );

    if (status) {
      this.statusForm.setValue(status);
      this.statusChanged.emit(status);
    }
  });

  onSelect() {
    this._storageService.setItem(
      this._statusStorageName,
      this.statusForm.getRawValue()
    );

    this.statusChanged.emit(this.statusForm.getRawValue());
  }
}
