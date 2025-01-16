import { BaseEntity } from './BaseEntity'
import { Tech } from './Tech'

export interface Feedback extends BaseEntity {
	author: Tech
	text: string
}
