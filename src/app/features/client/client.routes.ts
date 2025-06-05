import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/list-clients/list-clients.component').then(
        (x) => x.ListClientsComponent
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/create-client/create-client.component').then(
        (x) => x.CreateClientComponent
      ),
  },
];
