import fragments from 'data-interface/sanity/_lib/fragments'

const config = () => `*[_type=="singletonSiteConfiguration"][0]{
	tabTemplate,
	${fragments.metaData()},
	header {
		${fragments.link('navigation[]')}
	},
	footer {
		${fragments.link('navigation[]')},
		${fragments.blocks('text')}
	}
}`

export default config
