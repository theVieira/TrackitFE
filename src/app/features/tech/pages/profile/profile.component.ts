import { Component } from '@angular/core';
import { SelectLanguageComponent } from '@widgets/components/language-switcher/language-switcher.component';
import { ThemeSwitcherComponent } from '@widgets/components/theme-switcher/theme-switcher.component';
import { MatCardModule } from '@angular/material/card';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-profile',
  imports: [
    SelectLanguageComponent,
    ThemeSwitcherComponent,
    MatCardModule,
    TranslocoModule,
  ],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {}
