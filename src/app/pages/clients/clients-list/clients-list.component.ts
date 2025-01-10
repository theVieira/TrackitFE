import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Client } from '@/@types/client.type';
import { ClientService } from '@/services/client.service';
import { ClientComponent } from '@/components/filters/client/client.component';
import { Router } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-clients',
  imports: [MatTableModule, ClientComponent, MatPaginatorModule],
  templateUrl: './clients-list.component.html',
  styleUrl: './clients-list.component.scss',
})
export class ClientsListComponent implements OnInit, AfterViewInit {
  private clientService = inject(ClientService);
  private router = inject(Router);

  protected displayedColumns: string[] = ['id', 'name', 'cnpj'];
  protected dataSource = new MatTableDataSource<Client>([]);

  protected defaultClientSelected: string = '';

  protected length = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getClients();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getClients() {
    this.clientService
      .getAllClients(this.defaultClientSelected)
      .subscribe(({ items, total }) => {
        this.dataSource.data = items;
        this.length = total;
      });
  }

  onClickRow({ id }: Client) {
    this.router.navigate([`/client/${id}`]);
  }

  onClientSelected(client: string) {
    this.defaultClientSelected = client;
    this.getClients();
  }
}
