import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { iPaginatedResponse } from '@shared/interfaces/paginated-response.interface';
import { Observable } from 'rxjs';
import { iTicket } from '../models/ticket.model';
import { environment } from '@environment';
import { iGetTickets } from '../interfaces/get-tickets.interface';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private readonly _httpClient = inject(HttpClient);

  public getTickets({
    pagination: { skip, take },
    category,
    priority,
    status,
    client,
  }: iGetTickets): Observable<iPaginatedResponse<iTicket>> {
    if (client == undefined) client = '';

    const statusQuery = status.map((s) => `status=${s}`).join('&');
    const categoryQuery = category.map((s) => `category=${s}`).join('&');
    const priorityQuery = priority.map((s) => `priority=${s}`).join('&');

    return this._httpClient.get<iPaginatedResponse<iTicket>>(
      `${environment.apiUrl}/tickets?skip=${skip}&take=${take}&${statusQuery}&${categoryQuery}&${priorityQuery}&client=${client}`
    );
  }

  public getTicketById(id: string): Observable<iTicket | null> {
    return this._httpClient.get<iTicket | null>(
      `${environment.apiUrl}/tickets/${id}`
    );
  }

  public setProgress(id: string): Observable<object> {
    return this._httpClient.put(
      `${environment.apiUrl}/tickets/progress/${id}`,
      {}
    );
  }

  public setFinish(id: string, feedback: string): Observable<object> {
    return this._httpClient.put(`${environment.apiUrl}/tickets/finish/${id}`, {
      feedback,
    });
  }
}
