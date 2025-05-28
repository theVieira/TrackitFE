import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private _toastrService = inject(ToastrService);

  public success(message?: string, title?: string): void {
    this._toastrService.success(message, title);
  }

  public error(message?: string, title?: string): void {
    this._toastrService.error(message, title);
  }
}
