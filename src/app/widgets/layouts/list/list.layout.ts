import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-list-layout',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    CommonModule,
    MatCardModule,
  ],
  templateUrl: './list.layout.html',
  standalone: true,
})
export class ListLayout<T> {
  @Input() title = '';
  @Input() data: T[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() loading = false;
  @Input() pageIndex = 0;
  @Input() pageSize = 20;
  @Input() length = 0;
  @Input() columnLabels: Record<string, string> = {};
  @Input() columnTemplates: Record<string, TemplateRef<unknown>> = {};

  @Output() rowClicked = new EventEmitter<T>();
  @Output() pageChange = new EventEmitter<PageEvent>();
}
