import queries from './_lib/queries'
import client from './_lib/client'

const sanityRequest = async (request) => {
	// eslint-disable-next-line no-console
	if (!queries[request.type]) return console.log(`NO QUERIES ARE AVAILABLE FOR TYPE: ${request.type}`)
	// eslint-disable-next-line no-console
	if (typeof queries[request.type] !== 'function') return console.log(`${request.type} QUERY IS NOT A FUNCTION`)
	const query = queries[request.type](request.args)
	if (query) return client.fetch(query, request.params)
	return null
}

module.exports = sanityRequest
