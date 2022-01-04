const breakpoints = require('../local-config/breakpoints')
const webpackFileloaderRule = {
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
}
const webpackResponsiveLoaderRule = {
	test: /\.(jpe?g|png|webp)$/i,
	oneOf: [
		{
			use: {
				loader: 'responsive-loader',
				options: {
					adapter: require('responsive-loader/sharp'),
					sizes: breakpoints.map(breakpoint => breakpoint.width),
					publicPath: `/_next/static/files`,
					outputPath: 'static/files'
				}
			}
		}
	]
}

const webpackSpriteLoaderRule = {
	test: /\.(svg)$/i,
	resourceQuery: /sprite/,
	loader: 'svg-sprite-loader'
}

const webpackSVGRRule = {
	test: /\.(svg)$/i,
	resourceQuery: /^$/,
	use: [
		{
			loader: '@svgr/webpack',
			options: {
				ref: true
			}
		}
	]
}

module.exports = {
	webpackFileloaderRule,
	webpackResponsiveLoaderRule,
	webpackSpriteLoaderRule,
	webpackSVGRRule
}
