import getProvider from './providers/Image.providers'

const generateSrcSet = (options = {}) => {
	const provider = getProvider(options.provider)
	if (provider.generateSrcSet) {
		return provider.generateSrcSet(options)
	}
	return {}
}

export default generateSrcSet
