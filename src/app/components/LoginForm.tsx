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
import { api } from '@/lib/axios'
import { FormLoginSchema, formLoginSchema } from '@/schemas/formLoginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export function LoginForm() {
	const router = useRouter()
	const form = useForm<FormLoginSchema>({
		resolver: zodResolver(formLoginSchema),
		defaultValues: {
			login: '',
			password: '',
		},
	})

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) router.push('/home')
	})

	function handleLogin(data: FormLoginSchema) {
		api.post('/login', JSON.stringify({ ...data })).then((res) => {
			const parse = JSON.parse(res.data)

			if (parse.token) {
				localStorage.setItem('username', data.login)
				localStorage.setItem('token', parse.token)
				router.push('/home')
			}
		})
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleLogin)}
				className="flex flex-col gap-4"
			>
				<FormField
					control={form.control}
					name="login"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel className="font-semibold">Login</FormLabel>
							<FormControl>
								<Input
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
							<FormLabel className="font-semibold">Senha</FormLabel>
							<FormControl>
								<Input
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
