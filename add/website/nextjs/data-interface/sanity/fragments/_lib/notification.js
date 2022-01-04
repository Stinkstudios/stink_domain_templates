import fragments from 'data-interface/sanity/_lib/fragments'

const notification = (name = 'notification') => `${name}{
	heading,
	uniqueId,
	${fragments.link('link')},
}
`
export default notification
