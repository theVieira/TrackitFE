import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Trash } from 'lucide-react'
import { UseFieldArrayRemove, UseFormReturn } from 'react-hook-form'

export interface CreateTicketFormAddTagProps {
	form: UseFormReturn<
		{
			description: string
			client: {
				name: string
				id: string
			}
			priority: string
			category: string
			tags: string[]
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		any,
		undefined
	>

	fields: Record<'id', string>[]
	remove: UseFieldArrayRemove
}

export function CreateTicketFormAddTag({
	form,
	fields,
	remove,
}: CreateTicketFormAddTagProps) {
	return (
		<div>
			{fields.map((field, index) => (
				<div key={field.id}>
					<FormField
						control={form.control}
						name={`tags.${index}`}
						render={({ field }) => (
							<div className="w-full grid grid-cols-4 gap-2">
								<FormItem className="col-span-3 pr-2">
									<Select onValueChange={field.onChange}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Selecione a TAG" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectGroup>
												<SelectItem value="NetworkFailure">
													Falha na rede
												</SelectItem>
												<SelectItem value="HardwareFailure">
													Falha no hardware
												</SelectItem>
												<SelectItem value="SoftwareFailure">
													Falha no software
												</SelectItem>
												<SelectItem value="PeriodicMaintenance">
													Manutenção periódica
												</SelectItem>
												<SelectItem value="Documentation">
													Documentação
												</SelectItem>
												<SelectItem value="RemoteAccess">
													Acesso remoto
												</SelectItem>
												<SelectItem value="Critical">Crítico</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								</FormItem>
								<div className="w-full flex justify-end">
									<Button
										variant="ghost"
										className="w-fit self-end"
										onClick={() => remove(index)}
									>
										<Trash size={32} />
									</Button>
								</div>
							</div>
						)}
					/>
				</div>
			))}
		</div>
	)
}
