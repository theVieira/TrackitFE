import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/ticket-list/ticket-list.page').then(
        (x) => x.ListTicketsPage
      ),
  },
  {
    path: 'details/:id',
    loadComponent: () =>
      import('./pages/ticket-details/ticket-details.page').then(
        (x) => x.TicketDetailsPage
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/ticket-create/ticket-create.page').then(
        (x) => x.CreateTicketPage
      ),
  },
];
