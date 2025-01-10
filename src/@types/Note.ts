import { BaseEntity } from './BaseEntity'
import { Tech } from './Tech'

export interface Note extends BaseEntity {
	author: Tech
	text: string
}
