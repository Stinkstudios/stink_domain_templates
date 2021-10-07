export default {
	name: 'copyDeck',
	type: 'document',
	title: 'Copy Deck',
	fields: [
		{
			title: 'Copy Items',
			name: 'copyItems',
			type: 'array',
			of: [{ type: 'localizedString' }]
		}
	]
}
