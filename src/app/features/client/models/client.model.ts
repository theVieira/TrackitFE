import { iBaseEntity } from '@shared/models/base-entity.model';
import { eClientTag } from '../enums/client-tag.enum';
import { iAvatar } from '@shared/models/avatar.model';

export interface iClient extends iBaseEntity {
  name: string;
  cnpj: string;
  phone: string;
  email: string;
  avatar: iAvatar;
  tag: eClientTag;
}
