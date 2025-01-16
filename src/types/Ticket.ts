import { Attachment } from './Attachment'
import { BaseEntity } from './BaseEntity'
import { Client } from './Client'
import { Feedback } from './Feedback'
import { Note } from './Note'
import { Tech } from './Tech'

export interface Ticket extends BaseEntity {
	client: Client
	description: string
	category: TicketCategory
	priority: TicketPriority
	status: TicketStatus
	open: Tech[]
	progress?: Tech[]
	finish?: Tech[]
	notes?: Note[]
	feedbacks?: Feedback[]
	attachments?: Attachment[]
	tags: TicketTag[]
}

export enum TicketTag {
	NetworkFailure = 'NetworkFailure',
	HardwareFailure = 'HardwareFailure',
	SoftwareFailure = 'SoftwareFailure',
	PeriodicMaintenance = 'PeriodicMaintenance',
	Documentation = 'Documentation',
	RemoteAccess = 'RemoteAccess',
	Critical = 'Critical',
}

export enum TicketStatus {
	Open = 'Open',
	Progress = 'Progress',
	Finish = 'Finish',
}

export enum TicketPriority {
	Low = 'Low',
	Medium = 'Medium',
	Normal = 'Normal',
	High = 'High',
	Urgent = 'Urgent',
}

export enum TicketCategory {
	Delivery = 'Delivery',
	Daily = 'Daily',
	Budget = 'Budget',
	Maintenance = 'Maintenance',
}
