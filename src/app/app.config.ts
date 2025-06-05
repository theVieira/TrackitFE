import { LanguageService } from '@core/services/language.service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { authenticationInterceptor } from './core/interceptors/authentication.interceptor';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
  APP_INITIALIZER,
} from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@jsverse/transloco';
import { languageProvider } from '@core/providers/language.provider';
import { ThemeService } from '@core/services/theme.service';
import { themeProvider } from '@core/providers/theme.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(withEventReplay()),
    provideToastr(),
    provideAnimations(),
    provideCharts(withDefaultRegisterables()),
    provideHttpClient(),
    provideHttpClient(
      withFetch(),
      withInterceptors([authenticationInterceptor])
    ),
    provideTransloco({
      config: {
        availableLangs: ['en', 'pt-BR'],
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: themeProvider,
      deps: [ThemeService],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: languageProvider,
      deps: [LanguageService],
      multi: true,
    },
  ],
};
