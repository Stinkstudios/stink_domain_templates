const sanityClient = require('@sanity/client')
const params = {
	projectId: process.env.SANITY_STUDIO_API_PROJECT_ID,
	dataset: process.env.SANITY_STUDIO_API_DATASET,
	useCdn: process.env.DEPLOY_ENV === 'production'
}
const client = sanityClient(params)

module.exports = client
