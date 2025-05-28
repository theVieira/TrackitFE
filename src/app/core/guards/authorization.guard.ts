import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '@core/services/storage.service';
import { environment } from '@environment';
import { iTech } from '@features/tech/models/tech.model';

export const authorizationGuard: CanActivateFn = (route) => {
  const _storageService = inject(StorageService);
  const _router = inject(Router);

  const requiredRoles = route.data['roles'] as string[];

  const tech = _storageService.getItem<iTech>(environment.techCookieName);

  if (tech && requiredRoles.includes(tech.role)) return true;

  _router.navigate(['unauthorized']);

  return false;
};
