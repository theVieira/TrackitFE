import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from '@/services/authentication.service';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);

  if (authenticationService.isAuthenticated()) return true;

  authenticationService.redirectToAuthentication();

  return false;
};
