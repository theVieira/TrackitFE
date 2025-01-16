import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form'
import { Input } from './ui/input'
import { Tech } from '@/types/Tech'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	EditProfileSchema,
	editProfileSchema,
} from '@/schemas/editProfileSchema'

export interface ProfileSettingFormProps {
	me?: Tech
}

export default function ProfileSettingForm({ me }: ProfileSettingFormProps) {
	const form = useForm<EditProfileSchema>({
		resolver: zodResolver(editProfileSchema),
	})

	function handleProfileSettingForm(data: EditProfileSchema) {
		console.log(data)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleProfileSettingForm)}>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold" htmlFor="name">
								Nome
							</FormLabel>
							<FormControl>
								<Input
									id="name"
									onChange={field.onChange}
									placeholder={me?.name ?? 'Insira seu nome'}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold" htmlFor="password">
								Senha
							</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="Insira sua senha"
									onChange={field.onChange}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold" htmlFor="avatar">
								Avatar
							</FormLabel>
							<FormControl>
								<Input type="file" onChange={field.onChange} />
							</FormControl>
						</FormItem>
					)}
				/>
			</form>
		</Form>
	)
}
