import * as f from '~/data/sanity/fragments'

const metaData = (name = 'metaData') => `${name}{
	...,
	${f.asset('twitterAsset')},
	${f.asset('opgraphAsset')}
}`
export default metaData
