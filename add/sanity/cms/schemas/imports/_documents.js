import importAll from '~/_lib/helpers/importAll'
const documents = [
	...importAll(require.context('../documents', true, /\.js$/)),
	...importAll(require.context('~/_lib/schemas/documents', true, /\.js$/))
]

export default documents
