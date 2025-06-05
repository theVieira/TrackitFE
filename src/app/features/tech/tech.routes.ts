import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.component').then(
        (x) => x.ProfileComponent
      ),
  },
];
