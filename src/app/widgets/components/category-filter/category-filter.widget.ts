import { MatSelectModule } from '@angular/material/select';
import { Component, effect, EventEmitter, inject, Output } from '@angular/core';
import { eTicketCategory } from '@features/ticket/enums/ticket-category.enum';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import { StorageService } from '@core/services/storage.service';
import { CATEGORY_FILTER_CONST } from '@widgets/components/category-filter/category-filter.constant';

@Component({
  selector: 'app-category-filter',
  imports: [
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    TranslocoModule,
  ],
  templateUrl: './category-filter.widget.html',
})
export class CategoryFilterWidget {
  @Output() categoryChanged = new EventEmitter();

  private readonly _storageService = inject(StorageService);
  private readonly _categoryStorageName = '_category_select_filter';

  protected categoryForm = new FormControl<eTicketCategory[]>(
    CATEGORY_FILTER_CONST
  );

  protected categoryList: eTicketCategory[] = CATEGORY_FILTER_CONST;

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
