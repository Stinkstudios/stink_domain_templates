import projectConfig from '~/built.project.js'
export default {
	name: 'localizedString',
	title: 'Footer',
	type: 'object',
	fieldsets: [
		{
			title: 'Translations',
			name: 'translations',
			options: {
				collapsible: true,
				collapsed: true
			}
		}
	],
	fields: [
		{
			name: 'key',
			title: 'Key',
			type: 'string'
		},
		{
			name: projectConfig.i18n.default_language,
			title: `Default: (${projectConfig.i18n.default_language})`,
			type: 'string'
		},
		...projectConfig.i18n.languages
			.filter((l) => l !== projectConfig.i18n.default_language)
			.map((l) => {
				return {
					name: l,
					title: l,
					type: 'string',
					fieldset: 'translations'
				}
			})
	],
	preview: {
		select: {
			title: 'key'
		}
	}
}
