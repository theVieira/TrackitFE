import { Ticket } from '@/@types/Ticket'
import { Card } from '@/components/ui/card'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { useTranslations } from 'next-intl'

interface IDataTable {
	tickets: Ticket[]
	total: number
}

export function DataTable({ tickets, total }: IDataTable) {
	const t = useTranslations('home')

	return (
		<Card className="p-2">
			<Table>
				<TableCaption>Tickets CAPTION</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Cliente</TableHead>
						<TableHead>Prioridade</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Descrição</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{tickets.map((el) => (
						<TableRow key={el.id}>
							<TableCell>{el.client.name}</TableCell>
							<TableCell>{t(el.priority)}</TableCell>
							<TableCell>{t(el.status)}</TableCell>
						</TableRow>
					))}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell colSpan={3}>Total</TableCell>
						<TableCell className="text-right">{total}</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</Card>
	)
}
