import {link} from '~/data/sanity/fragments'

const cta = () => `{
	_type,
	_key,
	text,
	${link('link')},
}
`
export default cta
