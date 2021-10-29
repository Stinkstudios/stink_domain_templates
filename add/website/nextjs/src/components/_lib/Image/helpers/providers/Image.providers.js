function importAll(requireFunction) {
	return ((ctx) => {
		return ctx
			.keys()
			.map(ctx)
			.map((value, i) => [ctx.keys()[i].replace('./Image.', '').replace('.js', ''), value.default])
	})(requireFunction)
}

const providers = {}
for (const func of importAll(require.context('./', false, /\.\/(?!Image\.providers).*\.js$/))) {
	providers[func[0]] = func[1]
}

const getProvider = (name) => {
	if (name) {
		if (!process.env.NEXT_PUBLIC_IMAGE_PROVIDERS.includes(name) || typeof providers[name] === 'undefined') {
			throw new Error(`Provider ${name} is not supported`)
		} else {
			return providers[name]
		}
	} else if (process.env.NEXT_PUBLIC_IMAGE_PROVIDERS && process.env.NEXT_PUBLIC_IMAGE_PROVIDERS.split(',')[0]) {
		return providers[process.env.NEXT_PUBLIC_IMAGE_PROVIDERS.split(',')[0]]
	}
	throw new Error(`No image provider specified`)
}

export default getProvider
