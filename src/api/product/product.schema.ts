import * as Joi from 'joi'
import { createValidator } from 'express-joi-validation'

const validator = createValidator();

const skuSchema = Joi.number().required();

const skuSchemaObj = Joi.object({ sku: skuSchema });

const createOrUpdateSchema = Joi.object({
  sku: skuSchema,
  name: Joi.string().required(),
  inventory: Joi.object({
    warehouses: Joi.array().items({
      locality: Joi.string().required(),
      quantity: Joi.number().min(0).required(),
      type: Joi.string().required(),
    })
  }).required()
});

export const postValidator = [
  validator.body(createOrUpdateSchema),
];

export const skuValidator = [
  validator.params(skuSchemaObj),
];

export const putValidator = [
  ...skuValidator,
  validator.body(createOrUpdateSchema),
];
