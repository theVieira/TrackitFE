import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { isPlatformBrowser } from '@angular/common';
import { ThemeSwitcherComponent } from '@/components/theme-switcher/theme-switcher.component';
import { AvatarComponent } from '@/components/avatar/avatar.component';

export type MenuItem = {
  icon: string;
  label: string;
  path?: string;
  children?: MenuItem[];
  expanded?: boolean;
};

const KEYBOARD_SHORTCUT = 'b';

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
  protected opened = false;

  protected items: MenuItem[] = [
    { icon: 'home', label: 'Home', path: '/' },
    {
      icon: 'playlist_add_check_icon',
      label: 'Tickets',
      children: [
        { icon: 'sort', label: 'Lista', path: '/tickets' },
        {
          icon: 'add_circle',
          label: 'Novo ticket',
          path: '/create-new-ticket',
        },
      ],
    },
    {
      icon: 'person',
      label: 'Clientes',
      children: [
        {
          label: 'Lista',
          icon: 'sort',
          path: '/clients',
        },
        {
          label: 'Novo cliente',
          icon: 'add_circle',
          path: '/create-new-client',
        },
      ],
    },
  ];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      addEventListener('keydown', (ev) => {
        if (ev.key == KEYBOARD_SHORTCUT && ev.ctrlKey) {
          this.opened = !this.opened;
        }
      });
    }
  }

  toggleSubmenu(item: MenuItem): void {
    item.expanded = !item.expanded;
  }
}
