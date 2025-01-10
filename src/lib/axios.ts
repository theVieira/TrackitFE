import { config } from '@/config'
import axios from 'axios'

export const api = axios.create({
	baseURL: config.api_url,
})

export function ConfigureAuthentication(token: string) {
	api.defaults.headers['Authorization'] = `Bearer ${token}`
}
