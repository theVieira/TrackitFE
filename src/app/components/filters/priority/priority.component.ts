import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TicketPriority } from '@/@types/ticket.type';
import { PriorityTranslate } from './priority-translate';

@Component({
  selector: 'app-priority-filter',
  imports: [ReactiveFormsModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './priority.component.html',
  styleUrl: './priority.component.scss',
})
export class PriorityComponent implements OnChanges {
  translate = new PriorityTranslate();
  toppings = new FormControl<TicketPriority[]>([]);
  toppingList: TicketPriority[] = [
    TicketPriority.Low,
    TicketPriority.Medium,
    TicketPriority.High,
    TicketPriority.Urgent,
  ];

  @Input() defaultSelected: TicketPriority[] = [];
  @Output() priorityChange = new EventEmitter<TicketPriority[]>();

  constructor() {
    this.toppings.valueChanges.subscribe((values) => {
      this.priorityChange.emit(values ?? []);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['defaultSelected'] && changes['defaultSelected'].currentValue) {
      this.toppings.setValue(this.defaultSelected);
    }
  }
}
