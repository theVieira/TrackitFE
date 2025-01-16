'use client'

import { api } from '@/lib/axios'
import {
	CreateTicketSchema,
	createTicketSchema,
} from '@/schemas/createTicketSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { SelectClient } from '@/components/ticket/select-client'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@radix-ui/react-dialog'
import { CreateTicketFormAddTag } from './CreateTicketFormAddTag'

export function CreateTicketForm() {
	const form = useForm<CreateTicketSchema>({
		resolver: zodResolver(createTicketSchema),
	})

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		name: 'tags',
	})

	function handleCreateTicket({
		category,
		client,
		description,
		priority,
		tags,
	}: CreateTicketSchema) {
		const token = localStorage.getItem('token')

		api
			.post(
				'/tickets',
				JSON.stringify({
					category,
					clientId: client.id,
					description,
					priority,
					tags,
				}),
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			.then((res) =>
				res.status === 204
					? toast('Ticket criado com sucesso')
					: toast('Ocorreu um erro ao criar o ticket', {
							description: 'Verifique se o ticket foi criado e tente novamente',
					  })
			)
			.catch((e) => console.error(e))
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleCreateTicket)}>
				<FormField
					control={form.control}
					name="client"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold">Cliente</FormLabel>
							<FormControl>
								<SelectClient onChangeClient={field.onChange} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="category"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold">Categoria</FormLabel>
							<Select onValueChange={field.onChange}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Selecione a categoria" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectGroup>
										<SelectItem value="Daily">Diário</SelectItem>
										<SelectItem value="Delivery">Entrega</SelectItem>
										<SelectItem value="Budget">Orçamento</SelectItem>
										<SelectItem value="Maintenance">Manutenção</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="priority"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold">Prioridade</FormLabel>
							<Select onValueChange={field.onChange}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Selecione a prioridade" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectGroup>
										<SelectItem value="Low">Baixa</SelectItem>
										<SelectItem value="Medium">Média</SelectItem>
										<SelectItem value="Normal">Normal</SelectItem>
										<SelectItem value="High">Alta</SelectItem>
										<SelectItem value="Urgent">Urgente</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold">Descrição</FormLabel>
							<FormControl>
								<Textarea
									className="h-32"
									placeholder="insira a descrição do ticket (máx 600 caracteres)"
									onChange={field.onChange}
									defaultValue={field.value}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<div className="flex flex-col gap-2 my-2">
					<div className="w-full flex flex-col gap-2">
						<div className="flex w-full items-center justify-between">
							<p className="font-semibold text-sm">TAGs</p>
							<Button variant="outline" onClick={() => append('')}>
								Adicionar TAG
							</Button>
						</div>
						<CreateTicketFormAddTag
							form={form}
							fields={fields}
							remove={remove}
						/>
					</div>
				</div>
				<div className="flex items-center w-full justify-end mt-4">
					<DialogClose className="flex gap-3" asChild>
						<div>
							<Button variant="outline">Cancelar</Button>
							<Button type="submit">Salvar ticket</Button>
						</div>
					</DialogClose>
				</div>
			</form>
		</Form>
	)
}
