import getProvider from './providers/Image.providers'

const getId = (options) => {
	const provider = getProvider(options.provider)
	return provider.getId(options)
}

export default getId
