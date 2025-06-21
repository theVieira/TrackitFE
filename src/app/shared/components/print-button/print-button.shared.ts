import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-print-button',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './print-button.shared.html',
})
export class PrintButtonShared {
  protected window = window;
}
