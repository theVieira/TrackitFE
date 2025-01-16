import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { TicketCategory } from '@/types/Ticket'
import { CircleFadingPlus } from 'lucide-react'
import { useState } from 'react'

export type FilterCategoryState = [
	TicketCategory | null,
	TicketCategory | null,
	TicketCategory | null,
	TicketCategory | null
]

export interface FilterCategoryProps {
	onChangeCategory: (event: FilterCategoryState) => void
	className?: string
}

export default function FilterCategory({
	onChangeCategory,
	className,
}: FilterCategoryProps) {
	const [checked] = useState<boolean[]>([true, true, true, true])
	const [category, setCategory] = useState<FilterCategoryState>([
		TicketCategory.Daily,
		TicketCategory.Budget,
		TicketCategory.Delivery,
		TicketCategory.Maintenance,
	])

	function handleOnChangeCategory(target: TicketCategory, index: number) {
		if (category[index] == target) {
			category[index] = null
		} else {
			category[index] = target
		}

		setCategory(category)
		onChangeCategory(category)
	}

	return (
		<>
			<div className={className}>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="ml-auto">
							<CircleFadingPlus /> <span>Categoria</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuCheckboxItem
							className="capitalize"
							onClick={() => {
								checked[0] = !checked[0]
								handleOnChangeCategory(TicketCategory.Daily, 0)
							}}
							checked={checked[0]}
						>
							Diário
						</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem
							className="capitalize"
							onClick={() => {
								checked[1] = !checked[1]
								handleOnChangeCategory(TicketCategory.Delivery, 1)
							}}
							checked={checked[1]}
						>
							Entrega
						</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem
							className="capitalize"
							onClick={() => {
								checked[2] = !checked[2]
								handleOnChangeCategory(TicketCategory.Budget, 2)
							}}
							checked={checked[2]}
						>
							Orçamento
						</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem
							className="capitalize"
							onClick={() => {
								checked[3] = !checked[3]
								handleOnChangeCategory(TicketCategory.Maintenance, 3)
							}}
							checked={checked[3]}
						>
							Manutenção
						</DropdownMenuCheckboxItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</>
	)
}
