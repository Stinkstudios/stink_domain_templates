let env = {}

const path = require('path')
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin')
const { webpackResponsiveLoaderRule, webpackFileloaderRule } = require('./webpackRules')
const sassOptions = require('./styleConfig')
env.GA_ID = 'XXX' // NOTE: this is default in the web boilerplate so it needs a default value
const nextConfig = {
	target: process.env.DEPLOY_ENV === 'production' ? 'server' : 'serverless', // NOTE: for netlify
	env,
	trailingSlashes: true, // NOTE: For Google App Engine
	future: {
		webpack5: true
	},
	pageExtensions: ['jsx'],
	webpack: (config, { webpack }) => {
		config.module.rules.push(webpackFileloaderRule)
		config.module.rules.push(webpackResponsiveLoaderRule)
		config.resolve.plugins.push(new DirectoryNamedWebpackPlugin(true))
		config.resolve.alias['~'] = path.resolve(__dirname, 'src/')
		config.resolve.alias.g = path.join(__dirname, 'src/global/styles/global.module.scss')
		return config
	},
	sassOptions
}
module.exports = nextConfig
