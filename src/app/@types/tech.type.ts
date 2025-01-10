import { Avatar } from './avatar.type';
import { BaseType } from './base.type';

export interface Tech extends BaseType {
  name: string;
  phone: string;
  email: string;
  role: TechRole;
  avatar?: Avatar;
}

enum TechRole {
  Admin = 'Admin',
  Tech = 'Tech',
  Manager = 'Manager',
}
