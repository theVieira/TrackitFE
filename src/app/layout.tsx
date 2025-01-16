import type { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
	title: 'Trackit',
	description:
		'Trackit is a call management software created as a solution for IT companies',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt-BR" suppressHydrationWarning>
			<body>{children}</body>
		</html>
	)
}
