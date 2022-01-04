import fragments from 'data-interface/sanity/_lib/fragments'

const link = (linkEl) => `${linkEl}{
	_key,
	label,
	'_type': lower(link.fieldSelector),
	'reference': link.toggleableInternalLink.linkTo->{
		_id,
		_type,
		${fragments.slug()}
	},
	'hash': link.toggleableInternalLink.hash,
	'url': link.toggleableExternalLink
}`
export default link
