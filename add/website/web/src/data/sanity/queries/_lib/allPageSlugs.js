import { slug } from '~/data/sanity/fragments'

const allPageSlugs = `
*[_type == 'page'] {
	${slug()}
}
`
export default allPageSlugs
