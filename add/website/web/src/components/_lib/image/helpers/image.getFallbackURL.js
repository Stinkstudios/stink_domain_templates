import getProvider from './providers/image.providers'

const getFallbackURL = (options) => {
	const provider = getProvider(options.provider)
	return provider.getFallbackURL(options)
}

export default getFallbackURL
