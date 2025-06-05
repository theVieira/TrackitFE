import { LanguageService } from '@core/services/language.service';

export function languageProvider(
  _languageService: LanguageService
): () => void {
  return () => _languageService.loadUserConfigLang();
}
