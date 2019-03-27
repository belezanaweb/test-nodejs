import Joi from 'joi';

export default class ProdutoSchema {

    public static POST = {
        body: {
            sku: Joi.number().required(),
            name: Joi.string().required(),
            inventory: Joi.object().keys({
                warehouses : Joi.array().items(
                    Joi.object().keys({
                    locality: Joi.string().required(),
                    quantity: Joi.number().required(),
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
                    quantity: Joi.number().required(),
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

// "sku": 43264,
//     "name": "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
//     "inventory": {
//         "quantity": 15,
//         "warehouses": [
//             {
//                 "locality": "SP",
//                 "quantity": 12,
//                 "type": "ECOMMERCE"
//             },
//             {
//                 "locality": "MOEMA",
//                 "quantity": 3,
//                 "type": "PHYSICAL_STORE"
//             }
//         ]
//     },
//     "isMarketable": true