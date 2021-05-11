const sanityClient = require('@sanity/client')
const params = {
	projectId: process.env.SANITY_STUDIO_API_PROJECT_ID,
	dataset: process.env.SANITY_STUDIO_API_DATASET,
	token:
		'skTG9RwqmeFtUAeKKHTRvGBPbhb9baXU7VkzCg17N9goZyBPcNRkuYaLSnMgw0OpLfnEijDJZrj4A7VJxl8lpGHHePoKiiWpX66V9UHvjmK8u8Ucp3WQ24QhcrDx75PK9nCXjzqg8xgvIjsrzolzncN9g2PsKOa4w6jLuhPtMWap54DCvKaM',
	useCdn: process.env.DEPLOY_ENV === 'production'
}
const client = sanityClient(params)

module.exports = client
