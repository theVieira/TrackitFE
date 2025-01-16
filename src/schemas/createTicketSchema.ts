import { TicketCategory, TicketPriority, TicketTag } from '@/types/Ticket'
import { z } from 'zod'

const ticketTagEnum = z.enum(Object.values(TicketTag) as [string, ...string[]])

const createTicketSchema = z.object({
	description: z
		.string()
		.nonempty('a descrição não pode estar vazia')
		.max(600, 'máximo de caracteres atingido'),
	client: z.object({
		name: z.string(),
		id: z.string().uuid(),
	}),
	priority: z.enum(Object.values(TicketPriority) as [string, ...string[]]),
	category: z.enum(Object.values(TicketCategory) as [string, ...string[]]),
	tags: z.array(ticketTagEnum),
})

export type CreateTicketSchema = z.infer<typeof createTicketSchema>

export { createTicketSchema }
