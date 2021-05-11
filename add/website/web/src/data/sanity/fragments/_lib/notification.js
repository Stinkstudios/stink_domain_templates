import {link} from '~/data/sanity/fragments'

const notification = (name = 'notification') => `${name}{
	heading,
	uniqueId,
	${link('link')},
}
`
export default notification
