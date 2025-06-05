import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { StorageService } from './storage.service';
import { TranslocoService } from '@jsverse/transloco';
import { eLanguage } from '@core/enums/language.enum';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly _storageService = inject(StorageService);
  private readonly _translocoService = inject(TranslocoService);
  private readonly _langStorageName = '_lang';
  private readonly _platformId = inject(PLATFORM_ID);
  private readonly _isBrowser = isPlatformBrowser(this._platformId);

  public getActiveLang(): eLanguage {
    return this._translocoService.getActiveLang() as eLanguage;
  }

  public setActiveLang(lang: eLanguage): void {
    if (!this._isBrowser) return;
    this._translocoService.setActiveLang(lang);
    this._storageService.setItem<eLanguage>(this._langStorageName, lang);
  }

  public loadUserConfigLang(): void {
    const lang = this._storageService.getItem<eLanguage>(this._langStorageName);

    if (lang) this._translocoService.setActiveLang(lang);
  }
}
