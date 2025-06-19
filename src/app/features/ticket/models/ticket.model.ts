import { iBaseEntity } from '@shared/models/base-entity.model';
import { iClient } from '@features/client/models/client.model';
import { eTicketStatus } from '../enums/ticket-status.enum';
import { iTech } from '@features/tech/models/tech.model';
import { eTicketCategory } from '../enums/ticket-category.enum';
import { eTicketPriority } from '../enums/ticket-priority.enum';
import { eTicketTag } from '../enums/ticket-tag.enum';
import { iAttachment } from '@shared/models/attachment.model';
import { iNote } from '@shared/models/note.model';
import { iTimeAction } from '@shared/models/time-action.model';
import { iTicketTimeline } from './ticket-timeline.model';

export interface iTicket extends iBaseEntity {
  client: iClient;
  description: string;
  status: eTicketStatus;
  createdBy: iTech;
  category: eTicketCategory;
  priority: eTicketPriority;
  tag: eTicketTag;
  attachments: iAttachment[];
  notes: iNote[];
  progress: iTimeAction[];
  timeline?: iTicketTimeline[];
}
