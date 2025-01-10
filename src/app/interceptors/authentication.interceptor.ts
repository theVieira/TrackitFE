import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { environment } from '@/../environments/environment';
import { isPlatformBrowser } from '@angular/common';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  if (!isPlatformBrowser(platformId)) return next(req);

  const token = localStorage.getItem(environment.token_name);

  if (!token) {
    return next(req);
  }

  const headers = new HttpHeaders().append('Authorization', 'Bearer ' + token);

  const cloneReq = req.clone({ headers });

  return next(cloneReq);
};
