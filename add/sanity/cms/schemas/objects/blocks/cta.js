export default {
	name: 'cta',
	title: 'CTA',
	type: 'object',
	fields: [
		{
			name: 'text',
			title: 'CTA Text',
			type: 'string'
		},
		{
			name: 'link',
			title: 'Link',
			type: 'link'
		}
	],
	preview: {
		prepare() {
			return {
				title: 'CTA Block'
			}
		}
	}
}
