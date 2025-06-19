import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  imports: [],
  templateUrl: './avatar.shared.html',
})
export class AvatarShared {
  @Input() url!: string;
  @Input() alt!: string;
}
