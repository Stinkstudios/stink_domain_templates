import fragments from 'data-interface/sanity/_lib/fragments'

const pageSlug = (args) => `
*[_type=="page" && slug.current == $slug && !(_id in path("drafts.**"))] {
	_type,
	_id,
	title,
	${fragments.slug()},
	${fragments.metaData()},
	'content': ${fragments.content()},
}[0]
`
export default pageSlug
