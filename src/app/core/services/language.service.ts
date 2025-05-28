import { inject, Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { TranslocoService } from '@jsverse/transloco';
import { eLanguage } from '@core/enums/language.enum';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly _storageService = inject(StorageService);
  private readonly _translocoService = inject(TranslocoService);
  private readonly _langStorageName = '_lang';

  public getActiveLang(): eLanguage {
    return this._translocoService.getActiveLang() as eLanguage;
  }

  public setActiveLang(lang: eLanguage): void {
    this._translocoService.setActiveLang(lang);
    this._storageService.setItem<eLanguage>(this._langStorageName, lang);
  }

  public loadUserConfigLang(): void {
    const lang = this._storageService.getItem<eLanguage>(this._langStorageName);

    if (lang) this._translocoService.setActiveLang(lang);
  }
}
