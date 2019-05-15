const logger = require('../../server/utils/logger')

/**
 * @module services/health
 * @method [services/health] get
 * @description Builds response payload with flags indicating the health of the microservice
 * @param  {KoaContext} ctx
 */
const get = async ctx => {
  logger.debug('Getting server health information!')
  ctx.body = true
}

module.exports = {
  get
}
