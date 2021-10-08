const siteCopy = (args) => {
	const copy = {
		en: {
			EXAMPLE: 'example'
		}
	}

	// NOTE: change this
	const lang = args.lang || 'en'
	return copy[lang]
}

module.exports = siteCopy
