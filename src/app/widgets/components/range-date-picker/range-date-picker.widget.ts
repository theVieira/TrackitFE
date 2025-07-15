import {
  ChangeDetectionStrategy,
  Component,
  effect,
  EventEmitter,
  Output,
  signal,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { TranslocoModule } from '@jsverse/transloco';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-range-date-picker',
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    TranslocoModule,
    ReactiveFormsModule,
  ],
  templateUrl: './range-date-picker.widget.html',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangeDatePickerWidget {
  protected startDate = new FormControl<Date | null>(null);
  protected endDate = new FormControl<Date | null>(null);

  @Output() dateSelected = new EventEmitter<{ start: Date; end: Date }>();

  protected startSignal = signal<Date | null>(null);
  protected endSignal = signal<Date | null>(null);

  constructor() {
    this.startDate.valueChanges.subscribe(this.startSignal.set);
    this.endDate.valueChanges.subscribe(this.endSignal.set);

    effect(() => {
      const start = this.startSignal();
      const end = this.endSignal();
      if (start && end) {
        this.dateSelected.emit({ start, end });
      }
    });
  }
}
