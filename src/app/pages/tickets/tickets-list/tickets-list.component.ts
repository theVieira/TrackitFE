import {
  Ticket,
  TicketCategory,
  TicketPriority,
  TicketStatus,
} from '@/@types/ticket.type';
import { CategoryComponent } from '@/components/filters/category/category.component';
import { ClientComponent } from '@/components/filters/client/client.component';
import { PriorityTranslate } from '@/components/filters/priority/priority-translate';
import { PriorityComponent } from '@/components/filters/priority/priority.component';
import { StatusTranslate } from '@/components/filters/status/status-translate';
import { StatusComponent } from '@/components/filters/status/status.component';
import { TicketsService } from '@/services/tickets.service';
import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tickets-list',
  styleUrl: 'tickets-list.component.scss',
  templateUrl: 'tickets-list.component.html',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    StatusComponent,
    CategoryComponent,
    PriorityComponent,
    ClientComponent,
    MatProgressSpinnerModule,
  ],
})
export class TicketsListComponent implements AfterViewInit, OnInit {
  private ticketsService = inject(TicketsService);
  private route = inject(Router);

  protected pageEvent!: PageEvent;
  protected pageIndex = 0;
  protected pageSize = 10;
  protected length = 50;

  protected statusTranslate = new StatusTranslate();
  protected priorityTranslate = new PriorityTranslate();

  protected statusDefaultSelected = [TicketStatus.Open, TicketStatus.Progress];
  protected categoryDefaultSelected = [
    TicketCategory.Daily,
    TicketCategory.Budget,
    TicketCategory.Delivery,
    TicketCategory.Maintenance,
  ];
  protected priorityDefaultSelected = [
    TicketPriority.Low,
    TicketPriority.Medium,
    TicketPriority.High,
    TicketPriority.Urgent,
  ];
  protected clientDefaultSelected: string = '';

  displayedColumns: string[] = ['client', 'description', 'status', 'priority'];
  dataSource = new MatTableDataSource<Ticket>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getTickets();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getTickets() {
    this.ticketsService
      .GetAllTickets(
        this.statusDefaultSelected,
        this.categoryDefaultSelected,
        this.priorityDefaultSelected,
        this.clientDefaultSelected,
        this.pageIndex * this.pageSize,
        this.pageSize
      )
      .subscribe(({ items, total }) => {
        this.dataSource.data = items;
        this.length = total;
      });
  }

  statusChanged(status: TicketStatus[]) {
    this.statusDefaultSelected = status;
    this.getTickets();
  }

  categoryChanged(category: TicketCategory[]) {
    this.categoryDefaultSelected = category;
    this.getTickets();
  }

  priorityChanged(priority: TicketPriority[]) {
    this.priorityDefaultSelected = priority;
    this.getTickets();
  }

  clientSelected(client: string) {
    this.clientDefaultSelected = client;
    this.getTickets();
  }

  showTicketInfo({ id }: Ticket) {
    this.route.navigate([`/ticket/${id}`]);
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.length = e.length;
  }
}
