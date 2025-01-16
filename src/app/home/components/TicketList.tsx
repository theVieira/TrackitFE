import { Card } from '@/components/ui/card'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Ticket } from '@/types/Ticket'
import { Translate } from '@/utils/translate'

export interface TicketListProps {
	className?: string
	tickets: Ticket[]
}

export function TicketList({ className, tickets }: TicketListProps) {
	return (
		<div className={className}>
			<Card className="p-4">
				<Table>
					<TableCaption>Tickets</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Cliente</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Descrição</TableHead>
							<TableHead>Prioridade</TableHead>
							<TableHead>Categoria</TableHead>
						</TableRow>
					</TableHeader>
					{tickets.map((ticket) => (
						<TableBody key={ticket.id}>
							<TableRow>
								<TableCell>{ticket.client.name}</TableCell>
								<TableCell>{Translate(ticket.status)}</TableCell>
								<TableCell className="flex gap-1 items-center">
									<Card className="w-fit px-2 text-zinc-500">
										{Translate(ticket.tags[0])}
										{ticket.tags.length > 1 && <> ...</>}
									</Card>
									{ticket.description}
								</TableCell>
								<TableCell>{Translate(ticket.priority)}</TableCell>
								<TableCell>{Translate(ticket.category)}</TableCell>
								<TableCell>...</TableCell>
							</TableRow>
						</TableBody>
					))}
				</Table>
			</Card>
		</div>
	)
}
