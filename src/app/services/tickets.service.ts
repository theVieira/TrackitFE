import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  Ticket,
  TicketCategory,
  TicketPriority,
  TicketStatus,
} from '@/@types/ticket.type';
import { environment } from '@/../environments/environment.development';
import { ListResponse } from '@/@types/list-response.type';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  private httpClient = inject(HttpClient);

  public GetAllTickets(
    status: TicketStatus[],
    category: TicketCategory[],
    priority: TicketPriority[],
    client?: string,
    skip?: number,
    take?: number
  ) {
    const statusQuery = status.map((s) => `status=${s}`).join('&');
    const categoryQuery = category.map((s) => `category=${s}`).join('&');
    const priorityQuery = priority.map((s) => `priority=${s}`).join('&');

    const response = this.httpClient.get<ListResponse<Ticket>>(
      `${environment.api_url}/tickets?skip=${skip}&take=${take}&${statusQuery}&${categoryQuery}&${priorityQuery}&client=${client}`
    );

    return response;
  }

  public GetTicketById(id: string) {
    const response = this.httpClient.get<Ticket | null>(
      `${environment.api_url}/tickets/${id}`
    );

    return response;
  }

  downloadAttachment(id: string) {
    const response = this.httpClient.get(
      `${environment.api_url}/tickets/attachment/${id}`,
      { responseType: 'blob' as 'blob' }
    );

    return response;
  }
}
