import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NoPrintDirective } from '@widgets/directives/no-print.directive';

@Component({
  selector: 'app-print-button',
  imports: [MatButtonModule, MatIconModule, NoPrintDirective],
  templateUrl: './print-button.shared.html',
})
export class PrintButtonShared {
  protected window = window;
}
