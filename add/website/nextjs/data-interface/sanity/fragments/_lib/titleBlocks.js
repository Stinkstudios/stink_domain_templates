import fields from 'data-interface/sanity/_lib/fields'

const titleBlocks = (name = 'blocks') => `${name}[]{
	${fields.blocks()},
	"style": "title"
}`
export default titleBlocks
