import { iBaseEntity } from '@shared/models/base-entity.model';
import { iTech } from '@features/tech/models/tech.model';

export interface iAttachment extends iBaseEntity {
  url: string;
  filename: string;
  uploadedBy: iTech;
  size: number;
}
