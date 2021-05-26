export default {
	name: 'orgConfig',
	type: 'document',
	title: 'Organization config',
	fields: [
		{
			title: 'Logo',
			description:
				'This has to be an SVG file, with no empty space around the shapes, and using only fill (no strokes)',
			name: 'logo',
			type: 'svg'
		},
		{
			title: 'Business Name',
			name: 'name',
			type: 'string'
		}
	]
}
