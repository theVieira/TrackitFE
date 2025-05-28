import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly _platformId = inject(PLATFORM_ID);
  private readonly _isBrowser = isPlatformBrowser(this._platformId);

  setItem<T>(key: string, item: T): void {
    if (!this._isBrowser) return;

    const stringifiedItem = JSON.stringify(item);

    localStorage.setItem(key, stringifiedItem);
  }

  getItem<T>(key: string): T | undefined {
    if (!this._isBrowser) return;

    const storageItem = localStorage.getItem(key);

    if (!storageItem) return;

    const parsedItem = JSON.parse(storageItem);
    return parsedItem;
  }

  removeItem(key: string): void {
    if (!this._isBrowser) return;

    localStorage.removeItem(key);
  }

  clearStorage(): void {
    if (!this._isBrowser) return;

    localStorage.clear();
  }
}
