import { z } from 'zod'
import dotenv from 'dotenv'

dotenv.config()

const env = {
	api_url: process.env.NEXT_PUBLIC_API_URL,
	protocol: process.env.NEXT_PUBLIC_FILE_SERVER_PROTOCOL,
	hostname: process.env.NEXT_PUBLIC_FILE_SERVER_HOSTNAME,
	port: process.env.NEXT_PUBLIC_FILE_SERVER_PORT,
	pathname: process.env.NEXT_PUBLIC_FILE_SERVER_PATHNAME,
}

const configSchema = z.object({
	api_url: z.string(),
	protocol: z.string().refine((p) => p === 'http' || p === 'https'),
	hostname: z.string(),
	port: z.string(),
	pathname: z.string(),
})

export const config = configSchema.parse(env)
