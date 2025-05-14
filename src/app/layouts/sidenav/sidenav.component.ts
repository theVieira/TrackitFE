import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { isPlatformBrowser } from '@angular/common';
import { ThemeSwitcherComponent } from '@/components/theme-switcher/theme-switcher.component';
import { AvatarComponent } from '@/components/avatar/avatar.component';
import { sidenavItems } from './sidenav.items';

export interface MenuItem {
  icon: string;
  label: string;
  path?: string;
  children?: MenuItem[];
  expanded?: boolean;
}

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
    ThemeSwitcherComponent,
    AvatarComponent,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  private KEYBOARD_SHORTCUT = 'b';

  protected opened = false;
  protected items: MenuItem[] = sidenavItems;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      addEventListener('keydown', (ev) => {
        if (ev.key == this.KEYBOARD_SHORTCUT && ev.ctrlKey) {
          this.opened = !this.opened;
        }
      });
    }
  }

  toggleSubmenu(item: MenuItem): void {
    item.expanded = !item.expanded;
  }

  handleItemClick(item: MenuItem) {
    if (item.path) {
      this.router.navigate([item.path]);
    } else {
      this.toggleSubmenu(item);
    }
  }
}
