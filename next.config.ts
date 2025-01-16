import type { NextConfig } from 'next'
import { config } from '@/config'

const { hostname, protocol, pathname, port } = config

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol,
				hostname,
				port,
				pathname,
			},
		],
	},
}

export default nextConfig
