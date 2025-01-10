import { Ticket } from '@/@types/Ticket'
import { GetCookie } from '@/actions/cookies'
import { api } from '@/lib/axios'
import { redirect } from 'next/navigation'
import { DataTable } from './components/data-table'

interface GetTicketsResponse {
	data: Ticket[]
	total: number
}

export default async function Home() {
	const token = await GetCookie({ cookieName: 'token' })

	if (!token) redirect('/sign-in')

	const {
		data: { data, total },
	} = await api.get<GetTicketsResponse>('/tickets')

	return (
		<div className="p-8">
			<DataTable tickets={data} total={total} />
		</div>
	)
}
