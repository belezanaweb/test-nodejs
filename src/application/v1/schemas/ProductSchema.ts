import Joi from 'joi';

const productSchema = Joi.object({
  sku: Joi.number().required(),
  name: Joi.string().required(),
  inventory: Joi.object({
    warehouses: Joi.array()
      .min(1)
      .items(
        Joi.object({
          locality: Joi.string().required(),
          quantity: Joi.number().min(0).required(),
          type: Joi.string().required(),
        }),
      ).required(),
  }).required(),
});

export default productSchema;
