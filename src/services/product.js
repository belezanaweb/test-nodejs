const product = require('../lib/product')

/**
 * @module services/product
 * @method [services/product] get
 * @description Returns a product by SKU
 * @param  {KoaContext} ctx
 */
const get = async ctx => {
  const sku = ctx.params.sku

  ctx.body = await product.get(sku)
}

/**
 * @module services/product
 * @method [services/product] save
 * @description Saves a product
 * @param  {KoaContext} ctx
 */
const save = async ctx => {
  const data = ctx.request.body

  await product.save(data)
  ctx.status = 201
  ctx.body = { message: 'Product created' }
}

/**
 * @module services/product
 * @method [services/product] update
 * @description Updates a product
 * @param  {KoaContext} ctx
 */
const update = async ctx => {
  const sku = ctx.params.sku
  const data = ctx.request.body

  await product.update(sku, data)
  ctx.status = 204
}

/**
 * @module services/product
 * @method [services/product] update
 * @description Removes a product
 * @param  {KoaContext} ctx
 */
const remove = async ctx => {
  const sku = ctx.params.sku

  await product.remove(sku)
  ctx.status = 204
}

module.exports = { get, save, update, remove }
