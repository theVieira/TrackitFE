import { iTech } from '@features/tech/models/tech.model';
import { iBaseEntity } from '@shared/models/base-entity.model';
import { eTicketTimelineEventType } from '../enums/ticket-timeline-type.enum';

export interface iTicketTimeline extends iBaseEntity {
  author: iTech;
  content?: string;
  eventType: eTicketTimelineEventType;
}
