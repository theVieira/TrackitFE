'use client'

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/AppSidebar'
import { ThemeProvider } from 'next-themes'
import { ToggleTheme } from '@/components/ToggleTheme'
import { Toaster } from 'sonner'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<div className="absolute top-2 right-2">
				<ThemeProvider attribute="class" defaultTheme="system">
					<ToggleTheme />
				</ThemeProvider>
			</div>
			<AppSidebar />
			<main className="w-full">
				<SidebarTrigger />
				{children}
			</main>
			<Toaster theme="dark" />
		</SidebarProvider>
	)
}
