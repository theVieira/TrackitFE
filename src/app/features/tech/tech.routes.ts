import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/tech-profile/tech-profile.component').then(
        (x) => x.TechProfileComponent
      ),
  },
];
