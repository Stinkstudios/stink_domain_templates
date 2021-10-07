const { readFileSync } = require('fs')

const breakpoints = require('./src/global/settings/breakpoints')
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

const generateSassBreakpoint = () => {
	let breakpointsString = '$breakpoints: ('
	for (const breakpoint of breakpoints) {
		breakpointsString += `"${breakpoint.name}": ${breakpoint.width}px,`
	}
	breakpointsString = breakpointsString.substr(0, breakpointsString.length - 1) + ')'
	return breakpointsString
}

const nextConfig = {
	env,
	target: process.env.DEPLOY_ENV === 'production' ? 'server' : 'serverless', // NOTE: for netlify
	trailingSlashes: true, // NOTE: For Google App Engine - WIP
	future: {
		webpack5: true
	},
	pageExtensions: ['jsx'],
	webpack: (config, { webpack }) => {
		config.module.rules.push({
			test: /\.(mp4|webm|mp3)$/,
			use: [
				{
					loader: 'file-loader',
					options: {
						name: '[name]_[hash].[ext]',
						publicPath: `/_next/static/files`,
						outputPath: 'static/files'
					}
				}
			]
		})
		config.module.rules.push({
			test: /\.(jpe?g|png|webp)$/i,
			oneOf: [
				{
					use: {
						loader: 'responsive-loader',
						options: {
							adapter: require('responsive-loader/sharp'),
							sizes: breakpoints.map((breakpoint) => breakpoint.width),
							publicPath: `/_next/static/files`,
							outputPath: 'static/files'
						}
					}
				}
			]
		})
		config.resolve.plugins.push(new DirectoryNamedWebpackPlugin(true))
		config.resolve.alias['~'] = path.resolve(__dirname, 'src/')
		config.resolve.alias.g = path.join(__dirname, 'src/global/styles/global.module.scss')
		return config
	},
	sassOptions: {
		prependData: `
		${generateSassBreakpoint()};
		@use 'sass:map';
		@use 'sass:list';
		@import '~rupture-sass/rupture';
		@import '~/global/styles/settings.scss';
		@import '~/global/styles/helpers.scss';
		`
	}
}

module.exports = NextComposeWithPlugins([[withBundleAnalyzer]], nextConfig)
