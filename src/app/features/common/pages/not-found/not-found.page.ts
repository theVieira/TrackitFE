import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [MatButtonModule],
  templateUrl: './not-found.page.html',
})
export class NotFoundPage {
  private readonly _router = inject(Router);

  navigateToHome() {
    this._router.navigate(['']);
  }
}
