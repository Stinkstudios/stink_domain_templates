const sanityClient = require('@sanity/client')
const params = {
	projectId: process.env.SANITY_PROJECT_ID,
	dataset: process.env.SANITY_DATASET,
	useCdn: process.env.DEPLOY_ENV === 'production',
	apiVersion: '2021-03-25'
}
const client = sanityClient(params)

module.exports = client
