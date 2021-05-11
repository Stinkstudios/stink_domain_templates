import { RiPagesLine } from 'react-icons/ri'

const blocks = (ctx => {
	const keys = ctx.keys()
	const values = keys.map(ctx)
	return values.map(value => {
		return { type: value.default.name }
	})
})(require.context('~/schemas/objects/blocks', true, /\.js$/))

export default {
	name: 'page',
	type: 'document',
	title: 'Page',
	icon: RiPagesLine,
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
			name: 'title',
			title: 'Title',
			type: 'string'
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title'
			}
		},
		{
			name: 'testField',
			title: 'Test Field',
			type: 'string'
		},
		{
			name: 'metaData',
			title: 'Meta Data',
			type: 'metaData',
			fieldset: 'metadata'
		},
		{
			name: 'localizedString',
			title: 'Localized String',
			type: 'localizedString'
		},
		{
			name: 'content',
			title: 'Content',
			type: 'array',
			of: blocks
		}
	],
	preview: {
		select: {
			title: 'title'
		}
	}
}
