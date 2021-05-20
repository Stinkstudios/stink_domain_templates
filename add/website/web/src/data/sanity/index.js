import * as queries from './queries'
import client from './_lib/client'

const sanityRequest = async (request) => {
	if (!queries[request.type]) return console.log(`NO QUERIES ARE AVAILABLE FOR TYPE: ${request.type}`)
	if (typeof queries[request.type] !== 'function') return console.log(`${request.type} QUERY IS NOT A FUNCTION`)
	const query = queries[request.type](request.args)
	if (query) return client.fetch(query, request.params)
	return null
}

module.exports = sanityRequest
