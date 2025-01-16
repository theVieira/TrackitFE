import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { TicketPriority } from '@/types/Ticket'
import { CircleFadingPlus } from 'lucide-react'
import { useState } from 'react'

export type FilterPriorityState = [
	TicketPriority | null,
	TicketPriority | null,
	TicketPriority | null,
	TicketPriority | null,
	TicketPriority | null
]

export type FilterPriorityProps = {
	className?: string
	onChangePriority: (event: FilterPriorityState) => void
}

export default function FilterPriority({
	onChangePriority,
	className,
}: FilterPriorityProps) {
	const [checked] = useState<boolean[]>([true, true, true, true, true])

	const [priority, setPriority] = useState<FilterPriorityState>([
		TicketPriority.Low,
		TicketPriority.Medium,
		TicketPriority.Normal,
		TicketPriority.High,
		TicketPriority.Urgent,
	])

	function handleOnChangePriority(target: TicketPriority, index: number) {
		if (priority[index] == target) {
			priority[index] = null
		} else {
			priority[index] = target
		}

		setPriority(priority)
		onChangePriority(priority)
	}

	return (
		<>
			<div className={className}>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="ml-auto">
							<CircleFadingPlus /> <span>Prioridade</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuCheckboxItem
							className="capitalize"
							checked={checked[0]}
							onClick={() => {
								checked[0] = !checked[0]
								handleOnChangePriority(TicketPriority.Low, 0)
							}}
						>
							Baixa
						</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem
							className="capitalize"
							checked={checked[1]}
							onClick={() => {
								checked[1] = !checked[1]
								handleOnChangePriority(TicketPriority.Medium, 1)
							}}
						>
							Média
						</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem
							className="capitalize"
							checked={checked[2]}
							onClick={() => {
								checked[2] = !checked[2]
								handleOnChangePriority(TicketPriority.Normal, 2)
							}}
						>
							Normal
						</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem
							className="capitalize"
							checked={checked[3]}
							onClick={() => {
								checked[3] = !checked[3]
								handleOnChangePriority(TicketPriority.High, 3)
							}}
						>
							Alta
						</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem
							className="capitalize"
							checked={checked[4]}
							onClick={() => {
								checked[4] = !checked[4]
								handleOnChangePriority(TicketPriority.Urgent, 4)
							}}
						>
							Urgente
						</DropdownMenuCheckboxItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</>
	)
}
