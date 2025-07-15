import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { iPaginatedResponse } from '@shared/api/paginated.response';
import { Observable } from 'rxjs';
import { iTicket } from '../models/ticket.model';
import { environment } from '@environment';
import { iGetTicketsRequest } from '../api/get-tickets.request';
import { iCreateTicketRequest } from '../api/create-ticket.request';
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
    date: { endDate, startDate },
    client,
  }: iGetTicketsRequest): Observable<iPaginatedResponse<iTicket>> {
    if (client == undefined) client = '';

    const statusQuery = status.map((s) => `status=${s}`).join('&');
    const categoryQuery = category.map((s) => `category=${s}`).join('&');
    const priorityQuery = priority.map((s) => `priority=${s}`).join('&');

    let query = `skip=${skip}&take=${take}&${statusQuery}&${categoryQuery}&${priorityQuery}&client=${client}`;

    if (endDate && startDate) {
      query = `skip=${skip}&take=${take}&${statusQuery}&${categoryQuery}&${priorityQuery}&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}&client=${client}`;
    }

    return this._httpClient.get<iPaginatedResponse<iTicket>>(
      `${environment.apiUrl}/tickets?${query}`
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
    return this._httpClient.post(`${environment.apiUrl}/tickets/${id}/note`, {
      content,
    });
  }

  public addAttachment({ id, file }: { id: string; file: File }) {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('ticketId', id);

    return this._httpClient.post(
      `${environment.apiUrl}/tickets/attachment`,
      formData
    );
  }

  public deleteTicket(id: string): Observable<object> {
    return this._httpClient.delete(`${environment.apiUrl}/tickets`, {
      body: {
        ticketId: id,
      },
    });
  }

  public reopenTicket(id: string): Observable<object> {
    return this._httpClient.put(`${environment.apiUrl}/tickets/reopen`, {
      ticketId: id,
    });
  }
}
