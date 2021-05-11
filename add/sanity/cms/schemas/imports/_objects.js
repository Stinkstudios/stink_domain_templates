import importAll from '~/_lib/helpers/importAll'

const objects = [
	...importAll(require.context('../objects', true, /\.js$/)),
	...importAll(require.context('~/_lib/schemas/objects', true, /\.js$/))
]

export default objects
