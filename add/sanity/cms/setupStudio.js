const toml = require('toml')
const { readFileSync, writeFileSync } = require('fs')
const path = require('path')

const projectConfig = require('../project.json')
writeFileSync(
	path.join(__dirname, 'built.project.js'),
	`const config = ${JSON.stringify(projectConfig)} \nexport default config`
)

const netlifyConfig = toml.parse(readFileSync('./netlify.toml'))
const config = projectConfig.environment || {}
Object.assign(config, netlifyConfig.build.environment)

if (process.env.DEPLOY_ENV !== 'production') Object.assign(config, netlifyConfig.context.local.environment)

const execSync = require('child_process').execSync
const env = Object.create(process.env)

for (const prop in config) env[prop] = config[prop]

execSync(env.DEPLOY_ENV !== 'production' ? 'sanity start' : 'sanity build', { env: env, stdio: 'inherit' })
