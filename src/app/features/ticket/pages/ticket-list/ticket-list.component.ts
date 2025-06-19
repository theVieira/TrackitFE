import { MatButtonModule } from '@angular/material/button';
import { PageEvent } from '@angular/material/paginator';
import { Router, RouterLink } from '@angular/router';
import { LoadingService } from '@shared/services/loading.service';
import { iClient } from '@features/client/models/client.model';
import { eTicketCategory } from '@features/ticket/enums/ticket-category.enum';
import { eTicketPriority } from '@features/ticket/enums/ticket-priority.enum';
import { eTicketStatus } from '@features/ticket/enums/ticket-status.enum';
import { iTicket } from '@features/ticket/models/ticket.model';
import { TicketService } from '@features/ticket/services/ticket.service';
import { TranslocoModule } from '@jsverse/transloco';
import { iPaginatedRequest } from '@shared/interfaces/paginated-request.interface';
import { SELECT_CATEGORY_FILTER_CONST } from '@widgets/constants/select-category-filter.constant';
import { ListLayoutComponent } from '@widgets/layouts/list-layout/list-layout.component';
import { SELECT_STATUS_FILTER_CONST } from '@widgets/constants/select-status-filter.constant';
import { SELECT_PRIORITY_FILTER_CONST } from '@widgets/constants/select-priority-filter.constant';
import { TicketFiltersDialogComponent } from '@features/ticket/dialogs/ticket-filters-dialog/ticket-filters-dialog.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';
import {
  Component,
  effect,
  inject,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { eTicketTag } from '@features/ticket/enums/ticket-tag.enum';
import { iTech } from '@features/tech/models/tech.model';
import { SelectCategoryFilterComponent } from '../../../../widgets/components/select-category-filter/select-category-filter.component';
import { SelectPriorityFilterComponent } from '../../../../widgets/components/select-priority-filter/select-priority-filter.component';
import { SelectStatusFilterComponent } from '../../../../widgets/components/select-status-filter/select-status-filter.component';

@Component({
  selector: 'app-list-tickets',
  imports: [
    MatButtonModule,
    ListLayoutComponent,
    TranslocoModule,
    MatIconModule,
    RouterLink,
    SelectCategoryFilterComponent,
    SelectPriorityFilterComponent,
    SelectStatusFilterComponent,
  ],
  templateUrl: './ticket-list.component.html',
})
export class ListTicketsComponent {
  private _bottomSheet = inject(MatBottomSheet);
  private readonly _ticketService = inject(TicketService);
  private readonly _loadingService = inject(LoadingService);
  private readonly _router = inject(Router);
  private readonly _pagination = signal<iPaginatedRequest>({
    skip: 0,
    take: 10,
  });

  private client = signal<iClient | null>(null);
  private category = signal<eTicketCategory[]>(SELECT_CATEGORY_FILTER_CONST);
  private status = signal<eTicketStatus[]>(SELECT_STATUS_FILTER_CONST);
  private priority = signal<eTicketPriority[]>(SELECT_PRIORITY_FILTER_CONST);

  protected pageSize = signal<number>(this._pagination().take ?? 0);
  protected tickets = signal<iTicket[]>([]);
  protected total = signal<number>(0);
  protected loading = signal<boolean>(this._loadingService.loading());

  @ViewChild('clientTemplate', { static: true })
  clientTemplate!: TemplateRef<iClient>;
  @ViewChild('descriptionTemplate', { static: true })
  descriptionTemplate!: TemplateRef<string>;
  @ViewChild('statusTemplate', { static: true })
  statusTemplate!: TemplateRef<eTicketStatus>;
  @ViewChild('priorityTemplate', { static: true })
  priorityTemplate!: TemplateRef<eTicketPriority>;
  @ViewChild('tagTemplate', { static: true })
  tagTemplate!: TemplateRef<eTicketTag>;
  @ViewChild('createdByTemplate', { static: true })
  createdByTemplate!: TemplateRef<iTech>;

  private readonly _getTickets = effect(() => {
    this._loadingService.start();
    this._ticketService
      .getTickets({
        pagination: this._pagination(),
        client: this.client()?.name,
        category: this.category(),
        priority: this.priority(),
        status: this.status(),
      })
      .subscribe(({ items, total }) => {
        this.tickets.set(items);
        this.total.set(total);
        this._loadingService.stop();
      });
  });

  protected onChangeCategory(category: eTicketCategory[]) {
    this.category.set(category);
  }

  protected onChangeStatus(status: eTicketStatus[]) {
    this.status.set(status);
  }

  protected onChangePriority(priority: eTicketPriority[]) {
    this.priority.set(priority);
  }

  protected onChangeClient(client: iClient | null) {
    this.client.set(client);
  }

  protected onPageChange({ pageIndex, pageSize }: PageEvent) {
    this._pagination.set({ skip: pageIndex * pageSize, take: pageSize });
  }

  protected onRowClicked({ id }: iTicket) {
    this._router.navigate([`ticket/details/${id}`]);
  }

  protected openFilterDialog() {
    this._bottomSheet.open(TicketFiltersDialogComponent, {
      autoFocus: false,
      data: {
        changeClient: this.onChangeClient.bind(this),
        changeCategory: this.onChangeCategory.bind(this),
        changePriority: this.onChangePriority.bind(this),
        changeStatus: this.onChangeStatus.bind(this),
      },
    });
  }
}
