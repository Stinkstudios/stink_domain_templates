const json = require('./json/json')
const sanity = require('./sanity')

class DataInterface {
	defaults() {
		return {
			type: 'json',
			possibleTypes: ['json', 'sanity', 'googleSheets']
		}
	}

	constructor(options) {
		Object.assign(this, this.defaults())
		if (this.possibleTypes.indexOf(options.type) < 0) {
			throw new Error(`the type: ${options.type} is not an accepted type for the DataInterface class.`)
		}
		Object.assign(this, options)
	}

	async fetch(request) {
		let dataType = this.type.toUpperCase()
		if (request.dataType && this.possibleTypes.indexOf(request.dataType.toLowerCase()) > -1) {
			dataType = request.dataType.toUpperCase()
			delete request.dataType
		}

		return this[`fetch${dataType}`](request)
	}

	async fetchJSON(request) {
		return json(request)
	}

	async fetchSANITY(request) {
		return await sanity(request)
	}

	async fetchGOOGLESHEETS(request) {
		// NOTE: need to implement
	}
}

module.exports = new DataInterface({
	type: process.env.DEFAULT_DATA_SOURCE || 'json'
})
