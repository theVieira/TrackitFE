import { BaseType } from './base.type';

export interface Client extends BaseType {
  name: string;
  cnpj: string;
  phone: string;
  email: string;
}
