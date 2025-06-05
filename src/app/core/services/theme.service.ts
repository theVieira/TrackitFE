import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { StorageService } from './storage.service';
import { THEMES_CONST } from '@widgets/constants/themes.constant';
import { isPlatformBrowser } from '@angular/common';
import { iTheme } from '@widgets/interfaces/theme.interface';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly _cookieName = '_theme';
  private readonly _path = 'assets/themes';
  private readonly _storageService = inject(StorageService);
  private readonly _platformId = inject(PLATFORM_ID);
  private readonly _isBrowser = isPlatformBrowser(this._platformId);

  public initTheme(): void {
    if (!this._isBrowser) return;

    const name = this._storageService.getItem(this._cookieName);
    const theme = THEMES_CONST.find((t) => t.name === name) ?? THEMES_CONST[0];
    this._loadTheme(theme.filename);
  }

  public getCurrentTheme(): iTheme | undefined {
    if (!this._isBrowser) return;

    const name = this._storageService.getItem<string>(this._cookieName);

    return THEMES_CONST.find((t) => t.name === name);
  }

  public setTheme({ filename, name }: iTheme): void {
    this._storageService.setItem(this._cookieName, name);
    this._applyTheme(filename);
  }

  private _applyTheme(filename: string) {
    const path = `${this._path}/${filename}`;
    const existingLink = document.getElementById(
      'app-theme-link'
    ) as HTMLLinkElement;

    if (existingLink) {
      existingLink.href = path;
    } else {
      const linkEl = document.createElement('link');
      linkEl.id = 'app-theme-link';
      linkEl.rel = 'stylesheet';
      linkEl.href = path;
      document.head.appendChild(linkEl);
    }
  }

  private _loadTheme(filename: string): void {
    const path = `${this._path}/${filename}`;
    const existingLink = document.getElementById(
      'app-theme-link'
    ) as HTMLLinkElement;

    if (existingLink) {
      existingLink.href = path;
    } else {
      const linkEl = document.createElement('link');
      linkEl.id = 'app-theme-link';
      linkEl.rel = 'stylesheet';
      linkEl.href = path;
      document.head.appendChild(linkEl);
    }
  }
}
