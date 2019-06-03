const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');

const database = require('../database/database');

const productRoutes = [{
        method: 'POST',
        path: '/product',
        handler: async (request, h) => {
            try {
                const {
                    payload
                } = request;

                if (await database.read(payload.sku)) {
                    return Boom.badData('Não foi possível cadastrar. O produto com este sku já existe.');
                } else {
                    await database.create(payload);

                    return {
                        message: 'Produto cadastrado com sucesso!'
                    };
                }
            } catch (err) {
                return Boom.internal('Erro interno! Produto não pôde ser criado.');
            }
        },
        options: {
            validate: {
                payload: {
                    sku: Joi.number().integer().required(),
                    name: Joi.string().required(),
                    inventory: Joi.object().required()
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/product/{sku}',
        handler: async (request) => {
            try {
                const {
                    sku
                } = request.params;

                const result = await database.read(sku);

                const productInventoryQuantity = result.inventory.warehouses.reduce((prev, current) => (prev + current.quantity), 0);

                return {
                    ...result,
                    inventory: {
                        quantity: productInventoryQuantity,
                        ...result.inventory
                    },
                    isMarketable: productInventoryQuantity > 0 ? true : false
                }
            } catch (err) {
                return Boom.internal('Erro interno! Produto não pôde ser obtido.');
            }
        },
        options: {
            validate: {
                params: {
                    sku: Joi.number().integer().required()
                }
            }
        }
    },
    {
        method: 'PUT',
        path: '/product',
        handler: async (request) => {
            try {
                const {
                    payload
                } = request;

                await database.update(payload);

                return {
                    message: 'Produto atualizado com sucesso!'
                }
            } catch (err) {
                return Boom.internal('Erro interno! Produto não pôde ser atualizado.');
            }
        }
    },
    {
        method: 'DELETE',
        path: '/product/{sku}',
        handler: async (request) => {
            try {
                const {
                    sku
                } = request.params;

                const result = await database.delete(sku);

                if (result)
                    return {
                        message: `Produto ${sku} deletado com sucesso!`
                    }
                else
                    return Boom.badRequest('Não foi possível deletar o produto.')
            } catch (error) {
                return Boom.internal('Erro interno! Produto não pôde ser deletado.');
            }
        },
        options: {
            validate: {
                params: {
                    sku: Joi.number().integer().required()
                }
            }
        }
    }
];

module.exports = productRoutes;