import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { StorageService } from '@core/services/storage.service';

interface iTheme {
  name: string;
  filename: string;
}

@Component({
  selector: 'app-theme-switcher',
  imports: [MatFormFieldModule, MatSelectModule],
  templateUrl: './theme-switcher.component.html',
})
export class ThemeSwitcherComponent {
  private readonly _storageService = inject(StorageService);
  private readonly _themeCookieName = '_theme';

  protected themes: iTheme[] = [
    { name: 'Deep Purple & Amber', filename: 'deeppurple-amber.css' },
    { name: 'Indigo & Pink', filename: 'indigo-pink.css' },
    { name: 'Pink & Blue Grey', filename: 'pink-bluegrey.css' },
    { name: 'Purple & Green', filename: 'purple-green.css' },
    { name: 'Azure & Blue', filename: 'azure-blue.css' },
    { name: 'Cyan & Orange', filename: 'cyan-orange.css' },
  ];

  protected currentTheme = '';

  constructor() {
    const existsThemeStorage = this._storageService.getItem<iTheme>(
      this._themeCookieName
    );

    if (existsThemeStorage) {
      this.setTheme(existsThemeStorage);
      return;
    }

    this.setTheme(this.themes[0]);
  }

  protected setTheme({ filename, name }: iTheme): void {
    const themeId = 'app-theme-link';
    const existingLink = document.getElementById(themeId) as HTMLLinkElement;

    const href = `assets/themes/${filename}`;

    if (existingLink) {
      existingLink.href = href;
    } else {
      const link = document.createElement('link');
      link.id = themeId;
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    }

    this.currentTheme = name;
    this._storageService.setItem(this._themeCookieName, filename);
  }
}
