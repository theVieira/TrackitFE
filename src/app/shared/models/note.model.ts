import { iTech } from '@features/tech/models/tech.model';
import { iBaseEntity } from '@shared/models/base-entity.model';

export interface iNote extends iBaseEntity {
  author: iTech;
  content: string;
}
