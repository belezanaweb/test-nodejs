import Joi from "joi";

const createProductSchema = Joi.object().keys({
  sku: Joi.number().required().positive(),
  name: Joi.string().required(),
  inventory: Joi.object()
    .keys({
      warehouses: Joi.array().items({
        locality: Joi.string().required().uppercase(),
        quantity: Joi.number().required().positive(),
        type: Joi.string().required(),
      }),
    })
    .required(),
});

const updateProductSchema = Joi.object().keys({
  name: Joi.string(),
  inventory: Joi.object().keys({
    warehouses: Joi.array().items({
      locality: Joi.string().uppercase().required(),
      quantity: Joi.number().positive().required(),
      type: Joi.string().required().required(),
    }),
  }),
});
export { updateProductSchema, createProductSchema };
