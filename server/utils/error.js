const messages = require('./error-messages')
const logger = require('./logger')

const debugErrors = ['PRODUCT_NOT_FOUND', 'PRODUCT_EXISTS']

const error = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (debugErrors.includes(err.message)) {
      logger.debug(err, { scope: 'debug' })
    } else {
      logger.error(err, { scope: 'error' })
    }

    const response = messages[err.message] || messages['DEFAULT']

    ctx = Object.assign(ctx, response)
  }
}

module.exports = error
