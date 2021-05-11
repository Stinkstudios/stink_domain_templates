import * as f from '~/data/sanity/fragments'

const page = (args) => `
*[_type=="page" && slug.current == $slug] {
	...,
	_type,
	_id,
	${f.slug()},
	${f.metaData()},
	'content': ${f.content()},
	${f.localizedString(args)}
}[0]
`
export default page
