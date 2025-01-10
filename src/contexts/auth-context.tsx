'use client'

import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react'
import { useRouter } from 'next/navigation'
import { GetCookie, SaveCookie } from '@/actions/cookies'
import { api, ConfigureAuthentication } from '@/lib/axios'
import { Tech } from '@/@types/Tech'

interface IAuthContext {
	signIn: ({ login, password }: ISignIn) => Promise<void>
	tech?: Tech
}

interface ISignIn {
	login: string
	password: string
}

const AuthContext = createContext<IAuthContext | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
	const Router = useRouter()

	const [tech, setTech] = useState<Tech | undefined>(undefined)

	interface SignInResponse {
		token: string
		tech: Tech
	}
	async function signIn({ login, password }: ISignIn): Promise<void> {
		const {
			status,
			data: { tech, token },
		} = await api.post<SignInResponse>('/auth', {
			login,
			password,
		})

		if (status === 200) {
			await SaveCookie({ cookieName: 'token', cookieValue: token })

			const locale = window.location.pathname.split('/')[1] ?? 'en'
			Router.push(`/${locale}`)

			setTech(tech)

			ConfigureAuthentication(token)
		}
	}

	useEffect(() => {
		async function GetTech() {
			const token = await GetCookie({ cookieName: 'token' })

			if (token) {
				ConfigureAuthentication(token)

				const { data } = await api.get('/techs/me')

				setTech(data)
			}
		}

		GetTech()
	}, [])

	return (
		<AuthContext.Provider value={{ signIn, tech }}>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuth() {
	const context = useContext(AuthContext)

	if (!context) {
		throw new Error('useAuth must be used within AuthProvider')
	}

	return context
}
