import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-confirm-delete',
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './confirm-delete.dialog.html',
})
export class ConfirmDelete {
  private readonly _dialogRef = inject(MatDialogRef<ConfirmDelete>);

  @Output() deleteConfirmed = new EventEmitter<boolean>();

  onCancelClick() {
    this._dialogRef.close();
  }

  onDeleteClick() {
    this.deleteConfirmed.emit(true);
    this._dialogRef.close();
  }
}
