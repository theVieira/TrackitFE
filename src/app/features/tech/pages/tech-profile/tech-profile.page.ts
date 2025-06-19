import { Component } from '@angular/core';
import { SelectLanguageWidget } from '@widgets/components/language-switcher/language-switcher.widget';
import { ThemeSwitcherWidget } from '@widgets/components/theme-switcher/theme-switcher.widget';
import { MatCardModule } from '@angular/material/card';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-profile',
  imports: [
    SelectLanguageWidget,
    ThemeSwitcherWidget,
    MatCardModule,
    TranslocoModule,
  ],
  templateUrl: './tech-profile.page.html',
})
export class TechProfilePage {}
