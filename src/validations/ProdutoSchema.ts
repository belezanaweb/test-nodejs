import Joi from 'joi';

const PRODUTO_SCHEMA = Joi.object({
    sku: Joi.number().required(),
    name: Joi.string().required(),
    inventory: Joi.object({
        warehouses: Joi.object().keys({
            locality: Joi.string().required(),
            quantity: Joi.number().required(),
            type: Joi.string().required()
        })
    })
})

module.exports = {
    "/": PRODUTO_SCHEMA,
    "/:sku":PRODUTO_SCHEMA
}