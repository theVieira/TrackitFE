import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from '@/services/authentication.service';
import { isPlatformBrowser } from '@angular/common';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) return false;

  if (authenticationService.isAuthenticated()) return true;

  authenticationService.redirectToAuthentication();

  return false;
};
