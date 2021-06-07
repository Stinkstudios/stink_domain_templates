const toml = require('toml')
const { readFileSync, writeFileSync } = require('fs')
const path = require('path')

const projectConfig = require('project-wide-config')
const config = projectConfig.environment || {}

const netlifyConfig = toml.parse(readFileSync('./netlify.toml'))
Object.assign(config, netlifyConfig.build.environment)
console.log(process.env.DEPLOY_ENV)
if (process.env.DEPLOY_ENV !== 'production') Object.assign(config, netlifyConfig.context.local.environment)

const execSync = require('child_process').execSync
const env = Object.create(process.env)

for (const prop in config) env[prop] = config[prop]
// console.log(process.env.DEPLOY_ENV)

execSync(env.DEPLOY_ENV !== 'production' ? 'sanity start' : 'sanity build', { env: env, stdio: 'inherit' })
