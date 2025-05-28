import { iTech } from '@features/tech/models/tech.model';
import { eTimeActionType } from '@shared/enums/time-action-type.enum';

export interface iTimeAction {
  author: iTech;
  type: eTimeActionType;
}
