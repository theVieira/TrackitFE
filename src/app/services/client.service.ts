import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Client } from '@/@types/client.type';
import { environment } from '@/../environments/environment.development';
import { ListResponse } from '@/@types/list-response.type';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private httpClient = inject(HttpClient);

  getAllClients(client?: string) {
    if (client == undefined) {
      client = '';
    }

    const response = this.httpClient.get<ListResponse<Client>>(
      `${environment.api_url}/clients?clientName=${client}`
    );

    return response;
  }

  getClientById(id: string) {
    const response = this.httpClient.get<Client | null>(
      `${environment.api_url}/clients/${id}`
    );

    return response;
  }
}
