import {
  Ticket,
  TicketCategory,
  TicketPriority,
  TicketStatus,
} from '@/@types/ticket.type';
import { CategoryComponent } from '@/components/filters/category/category.component';
import { ClientComponent } from '@/components/filters/client/client.component';
import { PriorityComponent } from '@/components/filters/priority/priority.component';
import { StatusComponent } from '@/components/filters/status/status.component';
import { TicketsService } from '@/services/tickets.service';
import {
  Component,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { ListLayoutComponent } from '../../../layouts/list-layout/list-layout.component';
import { Translate } from '@/utils/translate.util';
import { Client } from '@/@types/client.type';

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
    ListLayoutComponent,
  ],
})
export class TicketsListComponent implements OnInit {
  private router = inject(Router);
  private ticketsService = inject(TicketsService);

  protected translate = new Translate();

  protected loading: boolean = false;
  protected pageEvent!: PageEvent;
  protected pageIndex = 0;
  protected pageSize = 10;
  protected length = 50;
  protected data: Ticket[] = [];

  protected statusFilter = [TicketStatus.Open, TicketStatus.Progress];
  protected categoryFilter = [
    TicketCategory.Daily,
    TicketCategory.Budget,
    TicketCategory.Delivery,
    TicketCategory.Maintenance,
  ];
  protected priorityFilter = [
    TicketPriority.Low,
    TicketPriority.Medium,
    TicketPriority.High,
    TicketPriority.Urgent,
  ];
  protected clientFilter: string = '';

  @ViewChild('clientTemplate', { static: true })
  clientTemplate!: TemplateRef<any>;
  @ViewChild('descriptionTemplate', { static: true })
  descriptionTemplate!: TemplateRef<any>;
  @ViewChild('statusTemplate', { static: true })
  statusTemplate!: TemplateRef<any>;
  @ViewChild('priorityTemplate', { static: true })
  priorityTemplate!: TemplateRef<any>;

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;

    this.ticketsService
      .GetAllTickets(
        this.statusFilter,
        this.categoryFilter,
        this.priorityFilter,
        this.clientFilter,
        this.pageIndex * this.pageSize,
        this.pageSize
      )
      .subscribe(({ items, total }) => {
        this.data = items;
        this.length = total;
        this.loading = false;
      });
  }

  onStatusChange(status: TicketStatus[]) {
    this.statusFilter = status;
    this.fetchData();
  }

  onCategoryChange(category: TicketCategory[]) {
    this.categoryFilter = category;
    this.fetchData();
  }

  onPriorityChange(priority: TicketPriority[]) {
    this.priorityFilter = priority;
    this.fetchData();
  }

  onClientChange(client: Client) {
    if (client) this.clientFilter = client.name;

    this.fetchData();
  }

  showTicketInfo({ id }: Ticket) {
    this.router.navigate([`/ticket/${id}`]);
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.length = e.length;
  }

  createTicket() {
    this.router.navigate(['create-ticket']);
  }
}
