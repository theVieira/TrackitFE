import { BaseEntity } from './BaseEntity'

export interface Tech extends BaseEntity {
	name: string
	avatar?: TechAvatar
}

export interface TechAvatar extends BaseEntity {
	url: string
	id: string
}
