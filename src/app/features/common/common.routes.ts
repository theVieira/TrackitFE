import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'not-found',
    loadComponent: () =>
      import('./pages/not-found/not-found.page').then((x) => x.NotFoundPage),
  },
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./pages/unauthorized/unauthorized.page').then(
        (x) => x.UnauthorizedPage
      ),
  },
];
