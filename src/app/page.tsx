import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

import background from '@/public/background.svg'

import Image from 'next/image'
import { LoginForm } from './components/LoginForm'

export default function Login() {
	return (
		<>
			<div className="w-full h-screen flex">
				<div className="w-full h-screen flex items-center justify-center">
					<Card className="p-4">
						<CardHeader>
							<CardTitle className="flex flex-col items-start gap-2">
								<Image
									src="/logo.svg"
									alt="logo"
									width={80}
									height={80}
									className="ml-[-1rem]"
								/>
								<h1 className="text-3xl font-extrabold">Bem vindo de volta!</h1>
							</CardTitle>
							<CardDescription>Entre com suas credenciais...</CardDescription>
						</CardHeader>
						<CardContent>
							<LoginForm />
						</CardContent>
					</Card>
				</div>
				<Image
					src={background}
					alt="background image"
					className="hidden md:block object-cover max-w-[60%]"
				/>
			</div>
		</>
	)
}
