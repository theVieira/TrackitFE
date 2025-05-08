import {
  Component,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Client } from '@/@types/client.type';
import { ClientService } from '@/services/client.service';
import { ClientComponent } from '@/components/filters/client/client.component';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { ListLayoutComponent } from '../../../layouts/list-layout/list-layout.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-clients',
  imports: [MatButtonModule, ClientComponent, ListLayoutComponent],
  templateUrl: './clients-list.component.html',
  styleUrl: './clients-list.component.scss',
})
export class ClientsListComponent implements OnInit {
  private clientService = inject(ClientService);
  private router = inject(Router);

  protected data: Client[] = [];
  protected loading = false;
  protected pageEvent!: PageEvent;
  protected pageIndex = 0;
  protected pageSize = 10;
  protected length = 50;
  protected defaultClientSelected: string = '';

  @ViewChild('name', { static: true }) nameTemplate!: TemplateRef<any>;
  @ViewChild('name', { static: true }) cnpjTemplate!: TemplateRef<any>;

  ngOnInit(): void {
    this.getClients();
  }

  getClients() {
    this.loading = true;

    this.clientService
      .getAllClients(this.defaultClientSelected)
      .subscribe(({ items, total }) => {
        this.data = items;
        this.length = total;
        this.loading = false;
      });
  }

  handlePageEvent(e: PageEvent) {
    console.log(e);
  }

  showClientInfo({ id }: Client) {
    this.router.navigate([`/client/${id}`]);
  }

  onClientChange(client: Client | null) {
    if (client) this.defaultClientSelected = client.name;
    this.getClients();
  }

  createClient() {
    this.router.navigate([`/create-client`]);
  }
}
