'use client'

import { api } from '@/lib/axios'
import { cn } from '@/lib/utils'
import { Client } from '@/types/Client'
import { Check, ChevronsUpDown, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '../ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

export type FilterClientProps = {
	className?: string
	onChangeClient: (client: Client | null) => void
}

export function SelectClient({ className, onChangeClient }: FilterClientProps) {
	const [open, setOpen] = useState(false)
	const [clients, setClients] = useState<Client[]>([])
	const [search, setSearch] = useState('')
	const [selectedClient, setSelectedClient] = useState<Client | null>(null)

	useEffect(() => {
		async function getClients(): Promise<Client[]> {
			const { data } = await api.get('/clients')
			return JSON.parse(data)
		}

		getClients()
			.then((data) => setClients(data))
			.catch((e) => console.error(e))
	}, [])

	function handleSelectClient(clientId: string) {
		const client = clients.find((client) => client.id === clientId)
		if (client) {
			setSelectedClient(client)
			onChangeClient(client)
			setOpen(false)
		}
	}

	const filteredClients = clients.filter((client) =>
		client.name.toLowerCase().includes(search.toLowerCase())
	)

	return (
		<div className={className}>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="justify-between w-full"
					>
						{selectedClient ? selectedClient.name : 'Buscar cliente...'}
						<ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="p-0">
					<Command>
						<CommandInput
							placeholder="Procurar cliente..."
							value={search}
							onValueChange={setSearch}
						/>
						<CommandList>
							{filteredClients.length === 0 ? (
								<CommandEmpty className="flex items-center gap-2 px-4">
									<Search size={12} className="text-zinc-400 mt-[2px]" />
									<span className="text-zinc-400">Sem registros...</span>
								</CommandEmpty>
							) : (
								<CommandGroup>
									{filteredClients.map((client) => (
										<CommandItem
											key={client.id}
											value={client.id}
											onSelect={() => handleSelectClient(client.id)}
										>
											<Check
												className={cn(
													'mr-2 h-4 w-4',
													selectedClient?.id === client.id
														? 'opacity-100'
														: 'opacity-0'
												)}
											/>
											{client.name}
										</CommandItem>
									))}
									<CommandItem>
										<Button
											variant="ghost"
											onClick={() => {
												setSelectedClient(null)
												onChangeClient(null)
											}}
										>
											Limpar seleção
										</Button>
									</CommandItem>
								</CommandGroup>
							)}
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	)
}
