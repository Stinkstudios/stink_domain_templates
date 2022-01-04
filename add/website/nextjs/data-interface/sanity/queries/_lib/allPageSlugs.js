import fragments from 'data-interface/sanity/_lib/fragments'

const allPageSlugs = `
*[_type == 'page'] {
	${fragments.slug()}
}
`
export default allPageSlugs
