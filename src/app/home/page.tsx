'use client'

import FilterCategory, {
	FilterCategoryState,
} from '@/components/ticket/FilterCategory'
import { SelectClient } from '@/components/ticket/select-client'
import FilterPriority, {
	FilterPriorityState,
} from '@/components/ticket/FilterPriority'
import FilterStatus, {
	FilterStatusState,
} from '@/components/ticket/FilterStatus'
import { api } from '@/lib/axios'
import { Client } from '@/types/Client'
import {
	Ticket,
	TicketCategory,
	TicketPriority,
	TicketStatus,
} from '@/types/Ticket'
import { Suspense, useEffect, useMemo, useState } from 'react'
import CreateTicket from './components/CreateTicket'
import { TicketList } from './components/TicketList'

export default function Home() {
	const [tickets, setTickets] = useState<Ticket[]>([])

	const [client, setClient] = useState<Client | null>(null)

	const [priority, setPriority] = useState<FilterPriorityState>([
		TicketPriority.Low,
		TicketPriority.Medium,
		TicketPriority.Normal,
		TicketPriority.High,
		TicketPriority.Urgent,
	])

	const [status, setStatus] = useState<FilterStatusState>([
		TicketStatus.Open,
		TicketStatus.Progress,
		null,
	])

	const [category, setCategory] = useState<FilterCategoryState>([
		TicketCategory.Daily,
		TicketCategory.Delivery,
		TicketCategory.Budget,
		TicketCategory.Maintenance,
	])

	useEffect(() => {
		async function getTickets(): Promise<Ticket[]> {
			const { data } = await api.get('/tickets')
			return JSON.parse(data)
		}

		getTickets()
			.then((data) => setTickets(data))
			.catch((e) => console.error(e))
	}, [])

	const filteredTickets: Ticket[] = useMemo(() => {
		return tickets.filter((ticket) => {
			const matchClientName = client ? ticket.client.name === client.name : true

			return (
				matchClientName &&
				status.includes(ticket.status) &&
				category.includes(ticket.category) &&
				priority.includes(ticket.priority)
			)
		})
	}, [tickets, status, category, priority, client])

	return (
		<>
			<div className="flex flex-col gap-2 p-8">
				<div className="flex items-center justify-between">
					<div className="flex gap-2">
						<SelectClient
							onChangeClient={(e) => {
								setClient(e)
							}}
						/>
						<FilterPriority onChangePriority={(e) => setPriority(e)} />
						<FilterCategory onChangeCategory={(e) => setCategory(e)} />
						<FilterStatus onChangeStatus={(e) => setStatus(e)} />
					</div>
					<CreateTicket />
				</div>
				<Suspense fallback="Carregando...">
					{filteredTickets.length > 0 && (
						<TicketList tickets={filteredTickets} />
					)}
				</Suspense>
			</div>
		</>
	)
}
