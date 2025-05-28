import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/list-tickets/list-tickets.component').then(
        (x) => x.ListTicketsComponent
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/ticket-details/ticket-details.component').then(
        (x) => x.TicketDetailsComponent
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/create-ticket/create-ticket.component').then(
        (x) => x.CreateTicketComponent
      ),
  },
];
