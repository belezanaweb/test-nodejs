const Koa = require('koa')
const Router = require('koa-router')
const convert = require('koa-convert')
const body = require('koa-bodyparser')
const validate = require('koa-validate')
const logger = require('./utils/logger')
const routes = require('../src/routes')
const error = require('./utils/error')

const logStart = () => {
  logger.info('Server started', { scope: 'init:server' })
  logger.debug('Server logger.debug = enabled', { scope: 'init:server' })
  logger.warn('Server logger.warn = enabled', { scope: 'init:server' })
  logger.error('Server logger.error = enabled', { scope: 'init:server' })
}

const createServer = () => {
  const app = new Koa()
  const router = new Router()
  validate(app)

  app.use(convert(body()))
  app.use(error)
  app.use(routes).use(router.allowedMethods())

  logStart()
  return app
}

module.exports = createServer
