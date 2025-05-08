import { MatDialogModule } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-add-attachment-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './add-attachment-dialog.component.html',
  styleUrl: './add-attachment-dialog.component.scss',
})
export class AddAttachmentDialogComponent {}
