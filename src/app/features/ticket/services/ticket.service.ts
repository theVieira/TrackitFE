import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { iPaginatedResponse } from '@shared/interfaces/paginated-response.interface';
import { Observable } from 'rxjs';
import { iTicket } from '../models/ticket.model';
import { environment } from '@environment';
import { iGetTicketsRequest } from '../interfaces/get-tickets-request.interface';
import { iCreateTicketRequest } from '../interfaces/create-ticket-request.interface';
import { iTicketTimeline } from '../models/ticket-timeline.model';

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
  }: iGetTicketsRequest): Observable<iPaginatedResponse<iTicket>> {
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
      `${environment.apiUrl}/tickets/${id}/progress`,
      {}
    );
  }

  public setFinish(id: string, feedback: string): Observable<object> {
    return this._httpClient.put(`${environment.apiUrl}/tickets/${id}/finish`, {
      feedback,
    });
  }

  public createTicket({
    category,
    clientId,
    description,
    priority,
    tag,
  }: iCreateTicketRequest): Observable<object> {
    return this._httpClient.post(`${environment.apiUrl}/tickets`, {
      category,
      clientId,
      description,
      priority,
      tag,
    });
  }

  public getTicketTimeline(id: string): Observable<iTicketTimeline[]> {
    return this._httpClient.get<iTicketTimeline[]>(
      `${environment.apiUrl}/tickets/${id}/timeline`
    );
  }

  public addTicketNote(id: string, content: string) {
    return this._httpClient.post(`${environment.apiUrl}/${id}/note`, {
      content,
    });
  }
}
