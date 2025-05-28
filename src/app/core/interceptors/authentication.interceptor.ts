import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { environment } from '@environment';
import { isPlatformBrowser } from '@angular/common';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const _platformId = inject(PLATFORM_ID);
  if (!isPlatformBrowser(_platformId)) return next(req);

  const token = localStorage.getItem(environment.tokenCookieName);

  if (!token) {
    return next(req);
  }

  const headers = new HttpHeaders().append('Authorization', 'Bearer ' + token);

  const cloneReq = req.clone({ headers });

  return next(cloneReq);
};
