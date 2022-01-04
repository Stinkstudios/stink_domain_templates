import fragments from 'data-interface/sanity/_lib/fragments'

const cta = () => `{
	_type,
	_key,
	text,
	${fragments.link('link')},
}
`
export default cta
