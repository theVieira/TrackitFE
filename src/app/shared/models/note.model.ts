import { iBaseEntity } from '@shared/models/base-entity.model';

export interface iNote extends iBaseEntity {
  content: string;
}
