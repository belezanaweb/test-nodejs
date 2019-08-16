import joi, { Schema } from 'joi';

import Product from '../../interfaces/Product';

const warehousesSchema: Schema = joi.object().keys({
  locality: joi.string().required(),
  quantity: joi.number().required(),
  type: joi.string().required(),
});

const inventorySchema: Schema = joi.object().keys({
  warehouses: joi.array().items(warehousesSchema),
});

const productSchema: Schema = joi.object().keys({
  sku: joi.number().required(),
  name: joi.string().required(),
  inventory: inventorySchema.required(),
});

export const validate = (payload: Product): string => {
  const { error } = joi.validate(payload, productSchema);

  if (error) {
    const [{ message }] = error.details;

    return message;
  }
};
