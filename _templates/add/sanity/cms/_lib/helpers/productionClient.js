import client from 'part:@sanity/base/client'

const productionClient = client.clone()
productionClient.config({ dataset: 'production' })
module.exports = productionClient
