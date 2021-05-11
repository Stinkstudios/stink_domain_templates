export default {
	name: 'navList',
	title: 'nav List',
	type: 'object',
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string'
		},
		{
			name: 'list',
			title: 'List',
			type: 'array',
			of: [
				{
					type: 'link'
				}
			]
		}
	],
	preview: {
		select: {
			title: 'title'
		}
	}
}
