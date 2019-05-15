const { Bristol } = require('bristol')
const palin = require('palin')

const logger = new Bristol()

if (process.env.NODE_ENV === 'local') {
  logger.addTarget('console').withFormatter(palin)
} else if (process.env.NODE_ENV !== 'test') {
  logger.addTarget('file', { file: 'server.log' }).withFormatter('commonInfoModel')
}

module.exports = logger
