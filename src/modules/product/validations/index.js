const { execute, Joi } = require('integrations/express/validation')

const schema = {
  sku: Joi.number().required(),
  name: Joi.string().required(),
  isMarketable: Joi.boolean().allow(null),
  inventory: Joi.object().keys({
    quantity: Joi.number().allow(null),
    warehouses: Joi.array().items(
      Joi.object().keys({
        locality: Joi.string(),
        quantity: Joi.number(),
        type: Joi.string().valid(['ECOMMERCE', 'PHYSICAL_STORE'])
      })
    )
  })
}

module.exports = {
  schema,
  validate: execute(schema)
}
