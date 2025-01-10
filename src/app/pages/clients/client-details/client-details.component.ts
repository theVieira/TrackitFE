import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '@/services/client.service';
import { Client } from '@/@types/client.type';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-client-details',
  imports: [MatCardModule],
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.scss',
})
export class ClientDetailsComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private clientServices = inject(ClientService);
  private route = inject(Router);

  protected client!: Client | null;

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (!id) return;

    this.clientServices
      .getClientById(id)
      .subscribe((data) => (this.client = data));
  }
}
