export default {
	annotations: [
		{
			name: 'link',
			type: 'object',
			title: 'External link',
			fields: [
				{
					name: 'href',
					type: 'url',
					title: 'URL'
				},
				{
					title: 'Open in new tab',
					name: 'blank',
					type: 'boolean'
				}
			]
		}
	]
}
