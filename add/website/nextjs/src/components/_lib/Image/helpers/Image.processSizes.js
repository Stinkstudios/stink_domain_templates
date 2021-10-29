const processSizes = (defaultSizes, aspectRatio) => {
	const sizes = {}
	for (const size in defaultSizes) {
		sizes[size] = {
			width: defaultSizes[size].width
		}
		if (typeof aspectRatio === 'object' && aspectRatio[size]) {
			// eslint-disable-next-line no-eval
			sizes[size].height = parseInt(defaultSizes[size].width / eval(aspectRatio[size]))
		} else {
			// eslint-disable-next-line no-eval
			sizes[size].height = parseInt(defaultSizes[size].width / eval(aspectRatio))
		}
	}
	return sizes
}

export default processSizes
