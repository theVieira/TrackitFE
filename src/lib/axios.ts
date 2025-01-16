import { config } from '@/config'
import { Axios } from 'axios'

const api = new Axios({
	baseURL: config.api_url,
	headers: {
		'Content-Type': 'application/json',
		Accept: '*/*',
	},
})

export { api }
