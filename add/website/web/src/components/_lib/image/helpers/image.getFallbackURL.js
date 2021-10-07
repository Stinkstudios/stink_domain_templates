import getProvider from './providers/Image.providers'

const getFallbackURL = (options) => {
	const provider = getProvider(options.provider)
	return provider.getFallbackURL(options)
}

export default getFallbackURL
