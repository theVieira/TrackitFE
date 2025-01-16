import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
} from '@/components/ui/dropdown-menu'
import { TicketStatus } from '@/types/Ticket'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { CircleFadingPlus } from 'lucide-react'
import { useState } from 'react'

export type FilterStatusState = [
	TicketStatus | null,
	TicketStatus | null,
	TicketStatus | null
]

export type FilterStatusProps = {
	className?: string
	onChangeStatus: (event: FilterStatusState) => void
}

export default function FilterStatus({
	onChangeStatus,
	className,
}: FilterStatusProps) {
	const [status, setStatus] = useState<FilterStatusState>([
		TicketStatus.Open,
		TicketStatus.Progress,
		null,
	])

	const [checked] = useState<boolean[]>([true, true, false])

	function handleOnChangeStatus(target: TicketStatus, index: number) {
		if (status[index] == target) {
			status[index] = null
		} else {
			status[index] = target
		}

		setStatus(status)
		onChangeStatus(status)
	}

	return (
		<>
			<div className={className}>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="ml-auto">
							<CircleFadingPlus /> <span>Status</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuCheckboxItem
							className="capitalize"
							onClick={() => {
								checked[0] = !checked[0]
								handleOnChangeStatus(TicketStatus.Open, 0)
							}}
							checked={checked[0]}
						>
							Aberto
						</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem
							className="capitalize"
							onClick={() => {
								checked[1] = !checked[1]
								handleOnChangeStatus(TicketStatus.Progress, 1)
							}}
							checked={checked[1]}
						>
							Em progresso
						</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem
							className="capitalize"
							onClick={() => {
								checked[2] = !checked[2]
								handleOnChangeStatus(TicketStatus.Finish, 2)
							}}
							checked={checked[2]}
						>
							Finalizado
						</DropdownMenuCheckboxItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</>
	)
}
