import { metaData } from '~/data/sanity/fragments'

const config = () => `*[_type=="singletonSiteConfiguration"][0]{
	logo,
	${metaData()}
}`

export default config
