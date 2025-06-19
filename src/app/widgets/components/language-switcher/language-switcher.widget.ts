import { Component, inject, signal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { eLanguage } from '@core/enums/language.enum';
import { LanguageService } from '@core/services/language.service';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-language-switcher',
  imports: [MatSelectModule, TranslocoModule],
  templateUrl: './language-switcher.widget.html',
})
export class SelectLanguageWidget {
  private readonly _languageService = inject(LanguageService);

  protected language = eLanguage;
  protected currentLanguage = signal<eLanguage>(
    this._languageService.getActiveLang()
  );

  changeLanguage(language: eLanguage) {
    this._languageService.setActiveLang(language);
  }
}
