const breakpoints = require('./src/global/settings/breakpoints')
const path = require('path')

// eslint-disable-next-line prefer-const
let env = {}

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

/** i18N */
const webpackCopyPagesToLanguages = require('./src/i18n/webpackCopyPagesToLanguages')

const nextConfig = {
	env,
	target: process.env.DEPLOY_ENV === 'production' ? 'server' : 'serverless',
	trailingSlashes: true, // For Google App Engine - WIP
	future: {
		webpack5: true
	},
	pageExtensions: ['jsx'],
	webpack: (config, { webpack }) => {
		webpackCopyPagesToLanguages(config)
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
		config.resolve.alias['^'] = path.join(__dirname, '../')
		config.plugins.push(
			new webpack.ProvidePlugin({
				globalCSS: path.resolve(path.join(__dirname, 'src/global/styles/global.module.sass'))
			})
		)
		return config
	},
	sassOptions: {
		prependData: `
		${generateSassBreakpoint()}
		@use 'sass:map'
		@use 'sass:list'
		@import '~rupture-sass/rupture'
		@import '~/global/styles/settings.sass'
		@import '~/global/styles/helpers.sass'
		`
	}
}

module.exports = NextComposeWithPlugins([[withBundleAnalyzer]], nextConfig)
