import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/ticket-list/ticket-list.component').then(
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
      import('./pages/ticket-create/ticket-create.component').then(
        (x) => x.CreateTicketComponent
      ),
  },
];
