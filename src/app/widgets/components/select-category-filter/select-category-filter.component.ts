import { MatSelectModule } from '@angular/material/select';
import { Component, effect, EventEmitter, inject, Output } from '@angular/core';
import { eTicketCategory } from '@features/ticket/enums/ticket-category.enum';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import { StorageService } from '@core/services/storage.service';
import { selectCategoryFilterConst } from '@widgets/constants/select-category-filter.constant';

@Component({
  selector: 'app-select-category-filter',
  imports: [
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    TranslocoModule,
  ],
  templateUrl: './select-category-filter.component.html',
})
export class SelectCategoryFilterComponent {
  @Output() categoryChanged = new EventEmitter();

  private readonly _storageService = inject(StorageService);
  private readonly _categoryStorageName = '_category_select_filter';

  protected categoryForm = new FormControl<eTicketCategory[]>(
    selectCategoryFilterConst
  );

  protected categoryList: eTicketCategory[] = selectCategoryFilterConst;

  private readonly _getCategory = effect(() => {
    const category = this._storageService.getItem<eTicketCategory[]>(
      this._categoryStorageName
    );

    if (category) {
      this.categoryForm.setValue(category);
      this.categoryChanged.emit(category);
    }
  });

  onSelect() {
    this._storageService.setItem(
      this._categoryStorageName,
      this.categoryForm.getRawValue() || []
    );

    this.categoryChanged.emit(this.categoryForm.getRawValue());
  }
}
