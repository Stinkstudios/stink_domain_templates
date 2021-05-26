const { DEPLOY_ENV } = process.env

const inProduction = DEPLOY_ENV === 'production'

const presets = ['next/babel']

const plugins = []
if (inProduction !== true) {
	plugins.push('react-component-data-attribute')
}

module.exports = {
	presets,
	plugins
}
