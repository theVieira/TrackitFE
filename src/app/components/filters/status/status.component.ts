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
import { StatusTranslate } from './status-translate';

@Component({
  selector: 'app-status-filter',
  imports: [MatFormFieldModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss',
})
export class StatusComponent implements OnChanges {
  translate = new StatusTranslate();
  toppings = new FormControl<TicketStatus[]>([]);
  toppingList: TicketStatus[] = [
    TicketStatus.Open,
    TicketStatus.Progress,
    TicketStatus.Finish,
  ];

  @Input() defaultSelected: TicketStatus[] = [];
  @Output() statusChange = new EventEmitter<TicketStatus[]>();

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
