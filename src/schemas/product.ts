import Joi from "joi";
import { Validator } from "../middlewares/validator";

class Schema extends Validator {
  static productBody = {
    name: Joi.string().required(),
    inventory: Joi.object({
      warehouses: Joi.array().items(
        Joi.object({
          locality: Joi.string().required(),
          quantity: Joi.number().required(),
          type: Joi.string().required().valid("ECOMMERCE", "PHYSICAL_STORE"),
        })
      ),
    }),
  };

  static get bySku() {
    const schema = {
      params: Joi.object({
        sku: Joi.number().min(1).required(),
      }),
    };

    return this.validate(schema);
  }

  static get create() {
    const schema = {
      body: Joi.object({
        sku: Joi.number().required(),
        ...this.productBody
      }),
    };

    return this.validate(schema);
  }

  static get update() {
    const schema = {
      body: Joi.object({
        ...this.productBody
      }),
    };

    return this.validate(schema);
  }
}

export { Schema };
