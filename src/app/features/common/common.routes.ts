import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'not-found',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (x) => x.NotFoundComponent
      ),
  },
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./pages/unauthorized/unauthorized.component').then(
        (x) => x.UnauthorizedComponent
      ),
  },
];
