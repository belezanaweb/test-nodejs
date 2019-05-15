const productValidator = async (ctx, next) => {
  ctx.checkBody('sku').notEmpty()
  ctx.checkBody('name').notEmpty()

  if (ctx.errors) {
    throw new Error('INVALID_PARAMETERS')
  }

  await next()
}

module.exports = productValidator
