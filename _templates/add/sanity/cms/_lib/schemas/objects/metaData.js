export default {
	name: 'metaData',
	title: 'Meta Data',
	type: 'object',
	fields: [
		{
			name: 'title',
			title: 'Meta Title',
			type: 'string'
		},
		{
			name: 'description',
			title: 'Description',
			type: 'text',
			rows: 2
		},
		{
			title: 'Share asset - Twitter',
			description: 'The asset displayed when sharing the website URL in a tweet (can be overridden per page)',
			type: 'extendedImage',
			name: 'twitterAsset',
			options: {
				accept: 'image/jpeg'
			}
		},
		{
			title: 'Share asset - Open Graph',
			description:
				'The asset displayed when sharing the website URL in a Facebook post or other platforms such as Slack (can be overridden per page)',
			type: 'extendedImage',
			name: 'opgraphAsset',
			options: {
				accept: 'image/jpeg'
			}
		}
	],
	preview: {
		select: {
			title: 'title'
		}
	}
}
