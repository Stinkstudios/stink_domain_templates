// import SvgPreview from '../../components/svgPreview'
import SvgInput from '~/_lib/customInputs/svgInput'

export default {
	title: 'SVG',
	name: 'svg',
	type: 'object',
	fields: [
		{
			name: 'svgString',
			type: 'string',
			validation: (Rule) => Rule.required()
		}
	],
	inputComponent: SvgInput
}
