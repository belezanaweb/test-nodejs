import Joi from 'joi';

export default class ProductSchema {

    public static POST = {
        body: {
            sku: Joi.number().required(),
            name: Joi.string().required(),
            inventory: Joi.object().keys({
                warehouses : Joi.array().items(
                    Joi.object().keys({
                    locality: Joi.string().required(),
                    quantity: Joi.number().required().min(0),
                    type: Joi.string().required()
                })
                ).required()
            }).required()
        }
    };

    public static DELETE = {
        params: {
            sku: Joi.number().required()
        }
    };

    public static PUT = {
        params: {
            sku: Joi.number().required()
        },
        body: {
            name: Joi.string().required(),
            inventory: Joi.object().keys({
                warehouses : Joi.array().items(
                    Joi.object().keys({
                    locality: Joi.string().required(),
                    quantity: Joi.number().required().min(0),
                    type: Joi.string().required()
                })
                ).required()
            }).required()
        }

    }

    public static GET = {
        params: {
            sku: Joi.number().required()
        }
    }

}
