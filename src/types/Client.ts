import { BaseEntity } from './BaseEntity'

export interface Client extends BaseEntity {
	name: string
	cnpj: string
	phone: string
	email?: string
	tag: ClientTag
}

export enum ClientTag {
	VIP,
	TestDrive,
}
