import { Joi } from 'celebrate';
import message from '../../../../../shared/utils/typeMessage';

const product = {
  name: Joi.string()
    .required()
    .error(err => message(err, 'name')),
  inventory: Joi.object()
    .required()
    .keys({
      warehouses: Joi.array()
        .required()
        .items(
          Joi.object().keys({
            locality: Joi.string()
              .required()
              .error(err => message(err, 'locality')),
            quantity: Joi.number()
              .required()
              .integer()
              .min(0)
              .error(err => message(err, 'quantity')),
            type: Joi.string()
              .required()
              .error(err => message(err, 'type')),
          }),
        ),
    }),
};

const skuProduct = {
  params: Joi.object().keys({
    sku: Joi.number()
      .required()
      .integer()
      .min(1)
      .error(err => message(err, 'sku')),
  }),
};

const createProduct = {
  body: Joi.object().keys({
    sku: Joi.number()
      .required()
      .integer()
      .min(1)
      .error(err => message(err, 'sku')),
    ...product,
  }),
};

const updateProduct = {
  params: Joi.object().keys({
    sku: Joi.number()
      .required()
      .integer()
      .min(1)
      .error(err => message(err, 'sku')),
  }),
  body: Joi.object().keys({
    sku: Joi.number()
      .integer()
      .min(1)
      .error(err => message(err, 'sku')),
    ...product,
  }),
};

export { skuProduct, createProduct, updateProduct };
