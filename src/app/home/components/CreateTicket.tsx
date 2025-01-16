'use client'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { CreateTicketForm } from './CreateTicketForm'

export default function CreateTicket() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Novo ticket</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Criar novo ticket</DialogTitle>
					<DialogDescription>
						Preencha o formulário abaixo e clique em salvar para criar um novo
						ticket
					</DialogDescription>
				</DialogHeader>
				<CreateTicketForm />
			</DialogContent>
		</Dialog>
	)
}
