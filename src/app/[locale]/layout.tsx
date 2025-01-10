import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'
import './globals.css'
import { AuthProvider } from '@/contexts/auth-context'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Trackit',
	description:
		'Trackit is a call management software created as a solution for IT companies',
}

export function generateStaticParams() {
	return [{ locale: 'en' }, { locale: 'pt' }]
}

interface Props {
	children: ReactNode
	params: {
		locale: string
	}
}

export default async function LocaleLayout({
	children,
	params: { locale },
}: Props) {
	let messages
	try {
		messages = (await import(`../../../i18n/messages/${locale}.json`)).default
	} catch (error) {
		console.log(error)

		notFound()
	}

	return (
		<AuthProvider>
			<html lang={locale} suppressHydrationWarning>
				<body>
					<NextIntlClientProvider locale={locale} messages={messages}>
						{children}
					</NextIntlClientProvider>
				</body>
			</html>
		</AuthProvider>
	)
}
