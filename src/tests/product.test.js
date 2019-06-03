const { deepEqual } = require('assert');

const api = require('../../api');
let app = {};

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

const MOCK_READ_DATA = {
    sku: 43264,
    name: "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
    inventory: {
        quantity: 15,
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
    },
    isMarketable: true
};

const MOCK_UPDATE_DATA = {
    sku: 43264,
    name: "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
    inventory: {
        warehouses: [
            {
                locality: "MOEMA",
                quantity: 3,
                type: "PHYSICAL_STORE"
            }
        ]
    }
};


describe('Suíte de testes da API de produtos', function () {
    this.beforeAll(async () => {
        app = await api();

        let randomSku = Math.round(Math.random() * 90000);
        MOCK_READ_DATA.sku = randomSku;
        MOCK_CREATE_DATA.sku = randomSku;
        MOCK_UPDATE_DATA.sku = randomSku;
    })

    it('POST/CREATE - deve cadastrar um produto e retornar uma mensagem de sucesso', async () => {
        const { payload } = await app.inject({
            method: 'POST',
            url: '/product',
            payload: MOCK_CREATE_DATA
        });

        const { message } = JSON.parse(payload);

        const expected = 'Produto cadastrado com sucesso!';

        deepEqual(message, expected);
    });

    it('POST/CREATE - deve retornar um erro caso o sku do produto a ser criado já exista', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/product',
            payload: MOCK_CREATE_DATA
        })

        const { message } = JSON.parse(result.payload);

        expected = 'Não foi possível cadastrar. O produto com este sku já existe.';

        deepEqual(message, expected);
    });

    it('GET/READ - deve obter um produto e retornar seus dados com a key quantity dentro de inventory e isMarketable no objeto pai', async () => {
        const result = await app.inject({
            method: 'GET',
            url: `/product/${MOCK_READ_DATA.sku}`,
            payload: MOCK_READ_DATA
        });

        const payload = JSON.parse(result.payload);

        deepEqual(payload, MOCK_READ_DATA);
    });

    it('PATCH/UPDATE - deve atualizar um produto e retornar uma mensagem de sucesso', async () => {
        const result = await app.inject({
            method: 'PUT',
            url: `/product`,
            payload: MOCK_UPDATE_DATA
        });

        const { message } = JSON.parse(result.payload);

        const expected = 'Produto atualizado com sucesso!';

        deepEqual(message, expected);
    });

    it('DELETE - deve deletar um produto e retornar uma mensagem de sucesso', async () => {
        const { sku } = MOCK_UPDATE_DATA;
        
        const result = await app.inject({
            method: 'DELETE',
            url: `/product/${sku}`
        })

        const { message } = JSON.parse(result.payload);

        const expected = `Produto ${sku} deletado com sucesso!`;

        deepEqual(message, expected);
    })
});