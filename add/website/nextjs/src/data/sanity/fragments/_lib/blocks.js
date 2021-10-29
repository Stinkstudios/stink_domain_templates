import fields from '~/data/sanity/_lib/fields'

const blocks = (name = 'blocks') => `${name}[]{
	${fields.blocks()}
}`
export default blocks
