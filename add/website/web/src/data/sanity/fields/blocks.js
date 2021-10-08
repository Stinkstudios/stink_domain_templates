import fields from '~/data/sanity/_lib/fields'

const blocks = () => `
	_type,
	children,
	markDefs[] {
	  _key,
	  _type,
	  ${fields.blockLink('customLink')}
	}
`
export default blocks
