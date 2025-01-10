import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  getItem<T>(item: string): T | null {
    const savedItem: string | null = localStorage.getItem(item);

    if (!savedItem) {
      return null;
    }

    try {
      return JSON.parse(savedItem);
    } catch (error) {
      return JSON.parse(savedItem) as unknown as T;
    }
  }

  setItem<T>(storage_name: string, item: T): void {
    const itemStringified = JSON.stringify(item);

    localStorage.setItem(storage_name, itemStringified);

    return;
  }

  removeItem(storage_name: string): void {
    localStorage.removeItem(storage_name);

    return;
  }

  clearStorage(): void {
    localStorage.clear();

    return;
  }
}
