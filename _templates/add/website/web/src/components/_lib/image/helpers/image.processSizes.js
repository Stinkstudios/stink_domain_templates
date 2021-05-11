const processSizes = (defaultSizes, aspectRatio) => {
	const sizes = {}
	for (const size in defaultSizes) {
		sizes[size] = {
			width: defaultSizes[size].width,
			// eslint-disable-next-line no-eval
			height: parseInt(defaultSizes[size].width / eval(aspectRatio))
		}
	}
	return sizes
}

export default processSizes
