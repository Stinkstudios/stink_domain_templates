// import bcp47 from 'bcp47'

export default {
	name: 'singletonSiteConfiguration',
	type: 'document',
	title: 'Site configuration',
	fieldsets: [
		{
			title: 'SEO & metadata',
			name: 'metadata',
			options: {
				collapsible: true
			}
		}
	],
	fields: [
		{
			title: 'Logo',
			description:
				'This has to be an SVG file, with no empty space around the shapes, and using only fill (no strokes)',
			name: 'logo',
			type: 'svg'
		},
		{
			title: 'Default metadata',
			name: 'metaData',
			type: 'metaData',
			fieldset: 'metadata'
		}
	]
}
