import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import Background from '@/public/svg/login_background.svg'
import Logo from '@/public/svg/logo.svg'
import Image from 'next/image'
import { SigninForm } from './components/sign-in-form'
import { useTranslations } from 'next-intl'

export default function Signin() {
	const t = useTranslations('signin')

	return (
		<div className="w-full h-screen flex">
			<div className="w-full h-screen flex items-center justify-center">
				<Card className="p-4">
					<CardHeader>
						<CardTitle className="flex flex-col items-start gap-2">
							<Image
								src={Logo}
								alt="Logo"
								priority
								width={80}
								height={80}
								className="ml-[-1rem]"
								unoptimized
							/>
							<h1 className="text-3xl font-extrabold">{t('title')}</h1>
						</CardTitle>
						<CardDescription>{t('subtitle')}</CardDescription>
					</CardHeader>
					<CardContent>
						<SigninForm />
					</CardContent>
				</Card>
			</div>
			<Image
				src={Background}
				alt="Background"
				priority
				className="hidden md:block object-cover max-w-[60%]"
				unoptimized
			/>
		</div>
	)
}
