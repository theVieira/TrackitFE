import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  imports: [MatButtonModule],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.scss',
})
export class UnauthorizedComponent {
  private _router = inject(Router);

  navigateToHome() {
    this._router.navigate(['']);
  }
}
