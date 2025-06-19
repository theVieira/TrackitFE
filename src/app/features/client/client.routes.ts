import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/client-list/client-list.page').then(
        (x) => x.ListClientsPage
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/client-create/client-create.page').then(
        (x) => x.CreateClientPage
      ),
  },
  {
    path: 'details/:id',
    loadComponent: () =>
      import('./pages/client-details/client-details.page').then(
        (x) => x.ClientDetailsPage
      ),
  },
];
