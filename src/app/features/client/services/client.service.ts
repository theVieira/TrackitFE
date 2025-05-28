import { inject, Injectable } from '@angular/core';
import { iClient } from '../models/client.model';
import { HttpClient } from '@angular/common/http';
import { iPaginatedResponse } from '@shared/interfaces/paginated-response.interface';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { iPaginatedRequest } from '@shared/interfaces/paginated-request.interface';
import { iCreateClientRequest } from '../interfaces/create-client-request.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private readonly _httpClient = inject(HttpClient);

  public getClients({
    skip,
    take,
  }: iPaginatedRequest): Observable<iPaginatedResponse<iClient>> {
    return this._httpClient.get<iPaginatedResponse<iClient>>(
      `${environment.apiUrl}/clients?skip=${skip}&take=${take}`
    );
  }

  public getClientByName(name: string): Observable<iClient | null> {
    return this._httpClient.get<iClient | null>(
      `${environment.apiUrl}/clients?clientName=${name}`
    );
  }

  public getAllClients(): Observable<iClient[]> {
    return this._httpClient.get<iClient[]>(`${environment.apiUrl}/all-clients`);
  }

  public createClient({
    cnpj,
    email,
    name,
    phone,
    tag,
  }: iCreateClientRequest): Observable<object> {
    return this._httpClient.post(`${environment.apiUrl}/clients`, {
      cnpj,
      email,
      name,
      phone,
      tag,
    });
  }
}
