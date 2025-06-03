import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '@core/services/storage.service';
import { environment } from '@environment';
import { jwtDecode, JwtPayload } from 'jwt-decode';

export const authorizationGuard: CanActivateFn = (route) => {
  const _storageService = inject(StorageService);
  const _router = inject(Router);

  const requiredRoles = route.data['roles'] as string[];

  const token = _storageService.getItem<string>(environment.tokenCookieName);
  if(!token) {
    _router.navigate(['auth/sign-in'])
    return false
  }

  const decoded = jwtDecode<JwtPayload>(token) 

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']

  if (token && requiredRoles.includes(role)) return true;

  _router.navigate(['unauthorized']);

  return false;
};
