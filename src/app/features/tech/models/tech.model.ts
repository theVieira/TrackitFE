import { iBaseEntity } from '@shared/models/base-entity.model';
import { eTechRole } from '../enums/tech-role.enum';
import { iAvatar } from '@shared/models/avatar.model';

export interface iTech extends iBaseEntity {
  name: string;
  phone: string;
  email: string;
  avatar?: iAvatar;
  role: eTechRole;
}
