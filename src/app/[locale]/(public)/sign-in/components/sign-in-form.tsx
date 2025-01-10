'use client'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/auth-context'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import { z } from 'zod'

const signInSchema = z.object({
	login: z.string().nonempty('O login é obrigatório'),
	password: z.string().nonempty('A senha é obrigatória'),
})

type SignInSchema = z.infer<typeof signInSchema>

export function SigninForm() {
	const t = useTranslations('signin')

	const { signIn } = useAuth()

	const form = useForm<SignInSchema>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			login: '',
			password: '',
		},
	})

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(signIn)}
				className="flex flex-col gap-4"
			>
				<FormField
					control={form.control}
					name="login"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel className="font-semibold">{t('login')}</FormLabel>
							<FormControl>
								<Input
									autoFocus
									autoComplete="off"
									placeholder="Insira seu login..."
									onChange={field.onChange}
									defaultValue={field.value}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel className="font-semibold">{t('password')}</FormLabel>
							<FormControl>
								<Input
									autoComplete="off"
									type="password"
									placeholder="Insira sua senha..."
									onChange={field.onChange}
									defaultValue={field.value}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="font-semibold">
					Entrar
				</Button>
			</form>
		</Form>
	)
}
