import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-confirm-delete',
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './confirm-delete.dialog.html',
})
export class ConfirmDeleteDialog {
  private readonly _dialogRef = inject(MatDialogRef<ConfirmDeleteDialog>);

  onCancelClick() {
    this._dialogRef.close();
  }

  onDeleteClick() {
    this._dialogRef.close(true);
  }
}
