import fragments from 'data-interface/sanity/_lib/fragments'

const metaData = (name = 'metaData') => `${name}{
	...,
	twitterAsset{
		...,
		${fragments.asset('image')}
	},
	opgraphAsset{
		...,
		${fragments.asset('image')}
	}
}`
export default metaData
