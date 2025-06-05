import { ThemeService } from '@core/services/theme.service';

export function themeProvider(_themeService: ThemeService): () => void {
  return () => _themeService.initTheme();
}
