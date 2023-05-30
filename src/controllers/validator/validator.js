
const Joi = require('joi');

const schemaCreateProduct = Joi.object({
  sku:  Joi.number().required(),
  name: Joi.string().required(),
  inventory: Joi.object({
    warehouses:  Joi.array()
    .items({
      locality: Joi.string(),
      quantity: Joi.number(),
      type: Joi.string(),
    })
  })
});

module.exports = schemaCreateProduct;
