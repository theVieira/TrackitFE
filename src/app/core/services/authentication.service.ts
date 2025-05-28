import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environment';
import { isPlatformBrowser } from '@angular/common';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly _router = inject(Router);
  private readonly _storageService = inject(StorageService);
  private readonly _platformId = inject(PLATFORM_ID);
  private readonly _isBrowser = isPlatformBrowser(this._platformId);

  public isAuthenticated = signal<boolean>(false);

  constructor() {
    if (!this._isBrowser) return;

    interface iToken {
      token: string;
    }

    const token = this._storageService.getItem<iToken>(
      environment.tokenCookieName
    );

    this.isAuthenticated.set(!!token);
  }

  public signOut() {
    localStorage.clear();

    this.isAuthenticated.set(false);

    this._router.navigate(['/auth/sign-in']);
  }
}
