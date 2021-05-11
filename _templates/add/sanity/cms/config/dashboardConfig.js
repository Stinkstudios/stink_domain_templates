export default {
	widgets: [
		{ name: 'project-users', layout: { height: 'auto' } },
		{ 
			name: 'structure-menu',
			layout: { width: 'small'}
		},
		{
			name: 'document-list',
			options: { title: 'Recently edited', order: '_updatedAt desc', limit: 10, types: ['page'] },
			layout: { width: 'medium' }
		}
	]
}
