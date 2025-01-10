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
import { TicketCategory } from '@/@types/ticket.type';
import { CategoryTranslate } from './category-translate';

@Component({
  selector: 'app-category-filter',
  imports: [ReactiveFormsModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnChanges {
  translate = new CategoryTranslate();
  toppings = new FormControl<TicketCategory[]>([]);
  toppingList: TicketCategory[] = [
    TicketCategory.Daily,
    TicketCategory.Delivery,
    TicketCategory.Budget,
    TicketCategory.Maintenance,
  ];

  @Input() defaultSelected: TicketCategory[] = [];
  @Output() categoryChange = new EventEmitter<TicketCategory[]>();

  constructor() {
    this.toppings.valueChanges.subscribe((values) => {
      this.categoryChange.emit(values ?? []);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['defaultSelected'] && changes['defaultSelected'].currentValue) {
      this.toppings.setValue(this.defaultSelected);
    }
  }
}
