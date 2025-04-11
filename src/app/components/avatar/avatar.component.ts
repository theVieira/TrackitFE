import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Avatar } from '@/@types/avatar.type';
import { isPlatformBrowser } from '@angular/common';
import { Tech } from '@/@types/tech.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-avatar',
  imports: [],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent implements OnInit {
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  protected tech?: Tech;
  protected avatar?: Avatar;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const tech: Tech = JSON.parse(localStorage.getItem('tech') ?? '{}');

      this.tech = tech;
      this.avatar = tech.avatar;
    }
  }

  generateAvatarPlaceholder(): string {
    if (this.tech?.name) {
      const formatted = this.tech.name
        .split(' ')
        .map((el) => el[0].toUpperCase())
        .join('')
        .substring(0, 2);

      return formatted;
    }

    return 'UN';
  }

  redirectToProfile() {
    this.router.navigate(['profile']);
  }
}
