export default {
	title: 'Image',
	name: 'image',
	type: 'image',
	fields: [
		{
			title: 'Alternative text',
			name: 'alt',
			type: 'string',
			description: 'Important for SEO and accessiblity.'
		}
	],
	preview: {
		select: {
			asset: 'asset',
			alt: 'alt'
		},
		prepare({ asset, alt }) {
			return {
				title: alt || '(alt text missing)',
				media: asset
			}
		}
	}
}
