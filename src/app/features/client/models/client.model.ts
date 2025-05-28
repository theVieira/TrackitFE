import { iBaseEntity } from '@shared/models/base-entity.model';
import { eClientTag } from '../enums/client-tag.enum';

export interface iClient extends iBaseEntity {
  name: string;
  cnpj: string;
  phone: string;
  email: string;
  tag: eClientTag;
}
