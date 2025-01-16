import { api } from '@/lib/axios'
import { Ticket } from '@/types/Ticket'
import { GetServerSideProps } from 'next'

export default function Ticket(ticket: Ticket) {
	return <>{ticket.id}</>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { id } = context.params as { id: string }

	try {
		const { data } = await api.get(`/tickets/${id}`)
		const ticket: Ticket = JSON.parse(data)

		return {
			props: { ticket },
		}
	} catch (error) {
		console.log(error)
		return { props: null }
	}
}
