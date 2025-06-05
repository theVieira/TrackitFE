import { Routes } from '@angular/router';
import { SidenavComponent } from '@core/layouts/sidenav/sidenav.component';
import { authenticationGuard } from './core/guards/authentication.guard';

export const routes: Routes = [
  {
    path: '',
    component: SidenavComponent,
    canActivate: [authenticationGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/dashboard/pages/home/home.component').then(
            (x) => x.HomeComponent
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('./features/common/common.routes').then((x) => x.routes),
      },
      {
        path: 'ticket',
        loadChildren: () =>
          import('./features/ticket/ticket.routes').then((x) => x.routes),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.routes').then((x) => x.routes),
      },
      {
        path: 'client',
        loadChildren: () =>
          import('./features/client/client.routes').then((x) => x.routes),
      },
      {
        path: 'tech',
        loadChildren: () =>
          import('./features/tech/tech.routes').then((x) => x.routes),
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/authentication/authentication.routes').then(
        (x) => x.routes
      ),
  },
];
