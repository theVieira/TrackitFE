import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { isPlatformBrowser } from '@angular/common';
import { sidenavItems } from './sidenav.items';
import { MenuItem } from './sidenav.interface';
import { AvatarComponent } from '../../../shared/components/avatar/avatar.component';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-sidenav',
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    AvatarComponent,
    TranslocoModule,
  ],
  templateUrl: './sidenav.component.html',
})
export class SidenavComponent {
  private readonly _platformId = inject(PLATFORM_ID);
  private readonly KEYBOARD_SHORTCUT = 'b';

  protected opened = signal(false);
  protected items: MenuItem[] = sidenavItems;

  constructor() {
    if (isPlatformBrowser(this._platformId)) {
      addEventListener('keydown', (ev) => {
        if (ev.key == this.KEYBOARD_SHORTCUT && ev.ctrlKey) {
          this.opened.set(!this.opened());
        }
      });
    }
  }
}
