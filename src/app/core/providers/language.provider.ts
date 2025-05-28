import { LanguageService } from '@core/services/language.service';

export function languageProvider(_languageService: LanguageService): void {
  _languageService.loadUserConfigLang();
}
