import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  imports: [MatButtonModule],
  templateUrl: './unauthorized.page.html',
})
export class UnauthorizedPage {
  private _router = inject(Router);

  navigateToHome() {
    this._router.navigate(['']);
  }
}
