export default {
	name: 'footer',
	title: 'Footer',
	type: 'object',
	fields: [
		{
			name: 'heading',
			title: 'Heading',
			type: 'string'
		},
		{
			name: 'subheading',
			title: 'Subheading',
			type: 'string'
		},
		{
			name: 'ctaLink',
			title: 'CTA Link',
			type: 'link'
		},
		{
			name: 'disclaimer',
			title: 'Disclaimer',
			type: 'string'
		}
	],
	preview: {
		select: {
			title: 'title'
		}
	}
}
