'use client'

import { Home, UserRound } from 'lucide-react'

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar'

import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import { Tech } from '@/types/Tech'

import ProfileSetting from './ProfileSetting'

const items = [
	{
		title: 'Tickets',
		url: '#',
		icon: Home,
	},
	{
		title: 'Clientes',
		url: '#',
		icon: UserRound,
	},
	{
		title: 'Técnicos',
		url: '#',
		icon: UserRound,
	},
]

export function AppSidebar() {
	const [me, setMe] = useState<Tech>()

	useEffect(() => {
		const token = localStorage.getItem('token')

		async function getMe() {
			const { data } = await api.get('/techs/me', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			setMe(JSON.parse(data))
		}

		getMe()
	}, [])

	return (
		<Sidebar collapsible="icon">
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<ProfileSetting me={me} />
			</SidebarFooter>
		</Sidebar>
	)
}
