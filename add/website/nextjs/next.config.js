const NextComposeWithPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true'
})
const nextConfig = require('./next-config')
module.exports = NextComposeWithPlugins([[withBundleAnalyzer]], nextConfig)

