export default {
	name: 'extendedImage',
	title: 'Image',
	type: 'object',
	fields: [
		{
			name: 'alt',
			title: 'Alt',
			type: 'string'
		},
		{
			name: 'image',
			title: 'Image File',
			type: 'image',
			options: { hotspot: true }
		}
	],
	preview: {
		select: {
			title: 'alt',
			media: 'image'
		}
	}
}
