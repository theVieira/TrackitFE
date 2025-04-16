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
import { MatPaginatorModule } from '@angular/material/paginator';
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
  templateUrl: './list-layout.component.html',
  styleUrl: './list-layout.component.scss',
  standalone: true,
})
export class ListLayoutComponent {
  @Input() title: string = '';
  @Input() data: any[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() loading = false;
  @Input() pageIndex = 0;
  @Input() pageSize = 20;
  @Input() length = 0;
  @Input() columnLabels: { [key: string]: string } = {};
  @Input() columnTemplates: { [key: string]: TemplateRef<any> } = {};

  @Output() rowClicked = new EventEmitter<any>();
  @Output() pageChange = new EventEmitter<any>();
}
