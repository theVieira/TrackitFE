import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { TicketStatus } from '@/@types/ticket.type';
import { Translate } from '@/utils/translate.util';

@Component({
  selector: 'app-status-filter',
  imports: [MatFormFieldModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss',
})
export class StatusComponent implements OnChanges {
  @Input() defaultSelected: TicketStatus[] = [];
  @Output() statusChange = new EventEmitter<TicketStatus[]>();

  protected translate = new Translate();

  protected toppings = new FormControl<TicketStatus[]>([]);
  protected toppingList: TicketStatus[] = [
    TicketStatus.Open,
    TicketStatus.Progress,
    TicketStatus.Finish,
  ];

  constructor() {
    this.toppings.valueChanges.subscribe((values) => {
      this.statusChange.emit(values ?? []);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['defaultSelected'] && changes['defaultSelected'].currentValue) {
      this.toppings.setValue(this.defaultSelected);
    }
  }
}
