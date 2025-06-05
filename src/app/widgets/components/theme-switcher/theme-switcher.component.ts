import { Component, effect, inject, signal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { ThemeService } from '@core/services/theme.service';
import { TranslocoModule } from '@jsverse/transloco';
import { THEMES_CONST } from '@widgets/constants/themes.constant';
import { iTheme } from '@widgets/interfaces/theme.interface';

@Component({
  selector: 'app-theme-switcher',
  imports: [MatSelectModule, TranslocoModule],
  templateUrl: './theme-switcher.component.html',
})
export class ThemeSwitcherComponent {
  private readonly _themeService = inject(ThemeService);

  private readonly themes = THEMES_CONST;

  protected darkThemes = this.themes.filter((t) => t.type === 'dark');
  protected lightThemes = this.themes.filter((t) => t.type === 'light');

  private readonly _effect = effect(() => {
    const { filename, name, type } = this.selectedTheme();

    this._themeService.setTheme({ filename, name, type });
  });

  protected selectedTheme = signal<iTheme>(
    this._themeService.getCurrentTheme() ?? THEMES_CONST[0]
  );

  protected onThemeChange(theme: iTheme): void {
    this.selectedTheme.set(theme);
  }
}
