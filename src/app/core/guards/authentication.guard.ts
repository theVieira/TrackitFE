import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '@core/services/authentication.service';
import { StorageService } from '@core/services/storage.service';
import { environment } from '@environment';
import  { JwtPayload, jwtDecode } from 'jwt-decode'

export const authenticationGuard: CanActivateFn = () => {
  const _authenticationService = inject(AuthenticationService);
  const _storageService = inject(StorageService)
  const _router = inject(Router);

  const token = _storageService.getItem<string>(environment.tokenCookieName)
  if(!token) {
    _router.navigate(['auth/sign-in'])
    return false
  }

  const decoded = jwtDecode(token) as JwtPayload

  const currentTime = Math.floor(Date.now() / 1000)

  if(decoded.exp && decoded.exp < currentTime) {
    _router.navigate(['auth/sign-in'])
    return false
  }

  if (_authenticationService.isAuthenticated()) return true;
  
  _router.navigate(['auth/sign-in']);

  return false;
};
