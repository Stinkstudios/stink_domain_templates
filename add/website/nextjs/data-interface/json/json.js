const jsons = {
	config: require('./config'),
	siteCopy: require('./siteCopy'),
	page: require('./pages')
}

const json = async (request) => {
	// eslint-disable-next-line no-console
	if (!jsons[request.type]) console.log(`THERE IS NO DATA STUBBED FOR ${request.type}`)
	const _json = await jsons[request.type](request.args)
	return _json
}

module.exports = json
