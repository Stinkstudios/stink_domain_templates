import fields from '~/data/sanity/_lib/fields'

const blocks = () => `
	_type,
	children,
	markDefs[] {
	  _key,
	  _type
	}
`
export default blocks
