import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./pages/sign-in/sign-in.component').then(
        (x) => x.SignInComponent
      ),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./pages/forgot-password/forgot-password.component').then(
        (x) => x.ForgotPasswordComponent
      ),
  },
];
