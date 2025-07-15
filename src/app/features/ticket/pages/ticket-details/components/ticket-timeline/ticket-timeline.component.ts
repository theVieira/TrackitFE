import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { iTicketTimeline } from '@features/ticket/models/ticket-timeline.model';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-ticket-timeline',
  imports: [MatExpansionModule, MatIconModule, TranslocoModule, DatePipe],
  templateUrl: './ticket-timeline.component.html',
})
export class TicketTimelineComponent {
  @Input({ required: true }) timeline!: iTicketTimeline[];
}
