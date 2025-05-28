import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '@core/services/authentication.service';

export const authenticationGuard: CanActivateFn = () => {
  const _authenticationService = inject(AuthenticationService);
  const _router = inject(Router);

  if (_authenticationService.isAuthenticated()) return true;

  _router.navigate(['auth/sign-in']);

  return false;
};
