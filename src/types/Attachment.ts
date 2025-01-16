import { BaseEntity } from './BaseEntity'

export interface Attachment extends BaseEntity {
	filename: string
	url: string
	size: number
	description: string
}
