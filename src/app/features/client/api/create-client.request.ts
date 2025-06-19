import { eClientTag } from '../enums/client-tag.enum';

export interface iCreateClientRequest {
  name: string;
  cnpj: string;
  email: string;
  phone: string;
  tag: eClientTag;
}
