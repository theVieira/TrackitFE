import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from '@/services/authentication.service';

export const authorizationGuard: CanActivateFn = (route) => {
  const authenticationService = inject(AuthenticationService);

  const requiredRoles = route.data['roles'] as string[];

  const tech = authenticationService.getTech();

  if (tech && requiredRoles.includes(tech.role)) return true;

  authenticationService.redirectToUnauthorized();

  return false;
};
