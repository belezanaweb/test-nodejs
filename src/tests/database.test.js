const { deepEqual, ok } = require('assert');
const database = require('../database/database');

const MOCK_CREATE_DATA = {
    sku: 43264,
    name: "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
    inventory: {
        warehouses: [{
                locality: "SP",
                quantity: 12,
                type: "ECOMMERCE"
            },
            {
                locality: "MOEMA",
                quantity: 3,
                type: "PHYSICAL_STORE"
            }
        ]
    }
};

const MOCK_UPDATE_DATA = {
    sku: 43264,
    name: "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
    inventory: {
        warehouses: [{
                locality: "SP",
                quantity: 12,
                type: "ECOMMERCE"
            }
        ]
    }
};

describe('Suíte de testes do banco de dados', () => {

    it('Create - deve inserir um registro no banco de dados e retornar um booleando indicando o sucesso', async () => {
        const result = await database.create(MOCK_CREATE_DATA);

        deepEqual(result, true);
    });

    it('Read - deve ler um registro no banco de dados e retornar tal registro', async () => {
        const result = await database.read(MOCK_CREATE_DATA.sku);

        deepEqual(result, MOCK_CREATE_DATA)
    });

    it('Update - deve atualizar um registro no banco de dados e retornar o registro atualizado', async () => {
        const result = await database.update(MOCK_UPDATE_DATA);

        deepEqual(result, MOCK_UPDATE_DATA);
    })

    it('Delete - deve excluir um registro no banco de dados e returnar um booleano indicando o sucesso', async () => {
        const result = await database.delete(MOCK_UPDATE_DATA.sku);

        deepEqual(result, true);
    })
});