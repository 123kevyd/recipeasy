module.exports = {
  reactStrictMode: true,
	async redirects() {
		return [
			{
				source: '/user',
				destination: '/',
				permanent: true,
			},
		]
	},
	webpack5: true,
	webpack: (config) => {
		config.resolve.fallback = { fs: false, process: false, path: false, querystring: false, util: false, buffer: false, crypto: false, assert: false }
		return config
	}, 
}
