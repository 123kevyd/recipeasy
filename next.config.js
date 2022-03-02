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
}
