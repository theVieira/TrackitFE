import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-range-date-picker',
  imports: [MatFormFieldModule, MatDatepickerModule, TranslocoModule],
  templateUrl: './range-date-picker.widget.html',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangeDatePickerWidget {}
