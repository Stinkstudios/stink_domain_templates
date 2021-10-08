const path = require('path')

const projectConfig = require('project-wide-config')
// eslint-disable-next-line prefer-const
let env = projectConfig.baseEnv

/** CREATE ENV FROM CONFIG FILE */

const NextComposeWithPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true'
})

/* ADD IMAGE PROVIDERS AUTOMATICALLY - DO NOT MODIFY */
// eslint-disable-next-line prefer-const
let imageProviders = ''
/* ADD IMAGE PROVIDERS AUTOMATICALLY - HYGEN ANCHOR */
if (imageProviders !== '') {
	env.IMAGE_PROVIDERS = imageProviders
}

const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin')

const { webpackResponsiveLoaderRule, webpackFileloaderRule } = require('./next-config/webpackRules')
const { sassOptions } = require('./next-config/styleConfig')
const nextConfig = {
	env,
	trailingSlashes: true, // NOTE: For Google App Engine - WIP
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

module.exports = NextComposeWithPlugins([[withBundleAnalyzer]], nextConfig)
