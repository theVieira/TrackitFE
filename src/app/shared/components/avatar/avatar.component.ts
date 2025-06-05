import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  imports: [],
  templateUrl: './avatar.component.html',
})
export class AvatarComponent {
  @Input() url?: string;
  @Input() alt?: string;
  @Input() initials?: string;
}
