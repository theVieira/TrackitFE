import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/contexts/auth-context'
import { Settings } from 'lucide-react'

export function TechAvatar() {
	const { tech } = useAuth()

	return (
		<Avatar className="w-6 h-6">
			<AvatarImage src={tech?.avatar?.url} alt="Avatar" loading="lazy" />
			<AvatarFallback>
				<Settings size={18} />
			</AvatarFallback>
		</Avatar>
	)
}
