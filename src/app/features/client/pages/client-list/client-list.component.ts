import {
  Component,
  effect,
  inject,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ListLayoutComponent } from '@widgets/layouts/list-layout/list-layout.component';
import { TranslocoModule } from '@jsverse/transloco';
import { iClient } from '@features/client/models/client.model';
import { LoadingService } from '@shared/services/loading.service';
import { ClientService } from '@features/client/services/client.service';
import { iPaginatedRequest } from '@shared/interfaces/paginated-request.interface';
import { PageEvent } from '@angular/material/paginator';
import { eClientTag } from '@features/client/enums/client-tag.enum';
import { MatButtonModule } from '@angular/material/button';
import { AvatarComponent } from '@shared/components/avatar/avatar.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ClientFiltersDialogComponent } from '@features/client/dialogs/client-filters-dialog/client-filters-dialog.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-client-list',
  imports: [
    RouterLink,
    ListLayoutComponent,
    TranslocoModule,
    MatButtonModule,
    AvatarComponent,
    MatIconModule,
  ],
  templateUrl: './client-list.component.html',
})
export class ListClientsComponent {
  private readonly _bottomSheet = inject(MatBottomSheet);
  private readonly _router = inject(Router);
  private readonly _loadingService = inject(LoadingService);
  private readonly _clientService = inject(ClientService);
  private readonly _pagination = signal<iPaginatedRequest>({
    skip: 0,
    take: 20,
  });

  private client = signal<iClient | null>(null);

  protected clients = signal<iClient[]>([]);
  protected total = signal<number>(0);
  protected pageSize = signal<number>(20);
  protected loading = signal(this._loadingService.loading());

  private readonly _getClients = effect(() => {
    this._loadingService.start();
    this._clientService
      .getClients(this._pagination(), this.client()?.name)
      .subscribe(({ items, total }) => {
        this.clients.set(items);
        this.total.set(total);
        this._loadingService.stop();
      });
  });

  @ViewChild('nameTemplate', { static: true })
  nameTemplate!: TemplateRef<string>;
  @ViewChild('cnpjTemplate', { static: true })
  cnpjTemplate!: TemplateRef<string>;
  @ViewChild('tagTemplate', { static: true })
  tagTemplate!: TemplateRef<eClientTag>;

  protected onPageChange(ev: PageEvent) {
    console.log(ev);
  }

  protected onRowClicked({ id }: iClient) {
    this._router.navigate([`client/details/${id}`]);
  }

  protected onClientSelected(client: iClient | null) {
    this.client.set(client);
  }

  protected openFilterDialog() {
    this._bottomSheet.open(ClientFiltersDialogComponent, {
      autoFocus: false,
      data: {
        changeClient: this.onClientSelected.bind(this),
      },
    });
  }
}
