'use client'

import { Button } from './ui/button'
import Image from 'next/image'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from './ui/sheet'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
import { Settings } from 'lucide-react'
import { Tech } from '@/types/Tech'
import { useRouter } from 'next/navigation'
import ProfileSettingForm from './ProfileSettingForm'

export interface ProfileSettingProps {
	me?: Tech
}

export default function ProfileSetting({ me }: ProfileSettingProps) {
	const router = useRouter()

	function logout() {
		localStorage.removeItem('token')
		router.push('/')
	}

	return (
		<Sheet>
			<SheetTrigger asChild>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild className="flex items-center gap-2">
							<span className="flex gap-2 text-sm rounded-full">
								{me?.avatar ? (
									<Image
										src={me.avatar.url}
										alt="Avatar"
										width={32}
										height={32}
										className="rounded-full"
									/>
								) : (
									<Settings size={20} />
								)}
								<span className="font-semibold">{me?.name}</span>
							</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader className="mb-4">
					<SheetTitle>Configurações da sua conta</SheetTitle>
				</SheetHeader>
				<ProfileSettingForm me={me} />
				<SheetFooter className="mt-8">
					<SheetClose asChild className="flex">
						<span className="space-x-4">
							<Button variant="outline">Fechar</Button>
							<Button className="w-32">Salvar alterações</Button>
						</span>
					</SheetClose>
					<Button
						variant="destructive"
						onClick={() => logout()}
						className="absolute bottom-4 right-4 w-32"
					>
						Sair
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}
