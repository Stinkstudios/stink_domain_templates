import FieldSelectorInput from '~/_lib/customInputs/fieldSelectorInput'
export default {
	name: 'link',
	title: 'Link Item',
	type: 'object',
	inputComponent: FieldSelectorInput,
	fields: [
		{
			name: 'label',
			title: 'Label',
			type: 'string'
		},
		{
			name: 'fieldSelector',
			title: 'Link Type',
			type: 'string',
			description: 'External links will always open in a new tab.',
			options: { list: ['Internal', 'External', 'Drawer'] }
		},
		{
			name: 'toggleableInternalLink',
			title: 'Link',
			toggleable: true,
			type: 'object',
			fields: [
				{
					name: 'linkTo',
					title: 'Link To:',
					type: 'reference',
					to: [{ type: 'page' }]
				},
				{
					name: 'hash',
					title: 'hash',
					type: 'string',
					description: 'To scroll to a specific part designated with an ID. Example: "#list"'
				}
			]
		},
		{
			name: 'toggleableExternalLink',
			title: 'Link URL',
			toggleable: true,
			type: 'string',
			description:
				'Make sure that you use the full URL, for example: https://www.google.com as opposed to google.com'
		}
	],
	preview: {
		select: {
			title: 'label'
		}
	}
}
