import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/client-list/client-list.component').then(
        (x) => x.ListClientsComponent
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/client-create/client-create.component').then(
        (x) => x.CreateClientComponent
      ),
  },
];
