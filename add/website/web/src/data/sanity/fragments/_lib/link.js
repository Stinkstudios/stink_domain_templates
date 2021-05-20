import { slug } from '~/data/sanity/fragments'

const link = (linkEl) => `${linkEl}{
	_key,
	label,
	'type': fieldSelector,
	'page': toggleableInternalLink.linkTo->{
		...,
		${slug()}
	},
	'hash': toggleableInternalLink.hash,
	'url': toggleableExternalLink
}`
export default link
