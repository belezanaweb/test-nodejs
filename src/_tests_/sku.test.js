const request = require('supertest')
const server = require('../../dist/server')
const skus = require('../skus.json')

beforeAll(done => {
    server.close()
    done()
})

describe('*Tests*', () => {
    afterEach((done)=>{
        const fs = require('fs');
        const path = './dist/skus.json'
        fs.writeFileSync(path, JSON.stringify(skus))
        done()
    })

    test('Deveria retornar todos os sku no arquivo JSON', async (done) => {
        const response = await request(server).get('/')
        expect(response.status).toEqual(200)
        done()
    })

    test('Deveria retornar um sku específico', async (done) => {
        const response = await request(server).get('/43264')
        expect(response.status).toEqual(200)
        done()
    })

    test('Deveria gerar erro pois o id buscado não existe no arquivo JSON', async (done) => {
        const response = await request(server).get('/6')
        expect(response.status).toEqual(500)
        done()
    })

    test('Deveria criar um sku', async (done) => {
        const response = await request(server).post('/create')
        .send({
            "sku": 432645,
            "name": "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium Máscara de Reconstrução 500g",
            "inventory": {
                "quantity": 15,
                "warehouses": [
                    {
                        "locality": "SP",
                        "quantity": 12,
                        "type": "ECOMMERCE"
                    },
                    {
                        "locality": "MOEMA",
                        "quantity": 3,
                        "type": "PHYSICAL_STORE"
                    }
                ]
            },
            "isMarketable": true
            })
        expect(response.status).toEqual(201)
        done()
    })

    test('Não deveria criar pois p sku id não é do tipo number', async (done) => {
        const response = await request(server).post('/create')
        .send({
            "sku": "xpto",
            "name": "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium Máscara de Reconstrução 500g",
            "inventory": {
                "quantity": 15,
                "warehouses": [
                    {
                        "locality": "SP",
                        "quantity": 12,
                        "type": "ECOMMERCE"
                    },
                    {
                        "locality": "MOEMA",
                        "quantity": 3,
                        "type": "PHYSICAL_STORE"
                    }
                ]
            },
            "isMarketable": true
            })
        expect(response.status).toEqual(500)
        done()
    })

    test('Deveria retornar erro pois o sku id é duplicado (já existe)', async (done) => {
        const response = await request(server).post('/create')
        .send({
            "sku": 43264,
            "name": "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium Máscara de Reconstrução 500g",
            "inventory": {
                "quantity": 15,
                "warehouses": [
                    {
                        "locality": "SP",
                        "quantity": 12,
                        "type": "ECOMMERCE"
                    },
                    {
                        "locality": "MOEMA",
                        "quantity": 3,
                        "type": "PHYSICAL_STORE"
                    }
                ]
            },
            "isMarketable": true
            })
        expect(response.status).toEqual(500)
        done()
    })

    test('Cria um sku com quantidade igual a zero', async (done) => {
        const response = await request(server).post('/create')
        .send({
            "sku": 432644,
            "name": "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium Máscara de Reconstrução 500g",
            "inventory": {
                "quantity": 15,
                "warehouses": [
                    {
                        "locality": "SP",
                        "quantity": 0,
                        "type": "ECOMMERCE"
                    },
                    {
                        "locality": "MOEMA",
                        "quantity": 0,
                        "type": "PHYSICAL_STORE"
                    }
                ]
            },
            "isMarketable": true
            })
        expect(response.status).toEqual(201)
        done()
    })

    test('Deveria editar o sku de id 43264', async (done) => {
        const response = await request(server).put('/edit')
        .send({
            "sku": 43264,
            "name": "teste",
            "inventory": {
                "quantity": 15,
                "warehouses": [
                    {
                        "locality": "SP",
                        "quantity": 12,
                        "type": "ECOMMERCE"
                    },
                    {
                        "locality": "MOEMA",
                        "quantity": 3,
                        "type": "PHYSICAL_STORE"
                    }
                ]
            },
            "isMarketable": true
            })
        expect(response.status).toEqual(200)
        done()
    })

    test('Deveria retornar erro pois o skuId não está no JSON', async (done) => {
        const response = await request(server).put('/edit')
        .send({
            "sku": 6,
            "name": "teste",
            "inventory": {
                "quantity": 15,
                "warehouses": [
                    {
                        "locality": "SP",
                        "quantity": 12,
                        "type": "ECOMMERCE"
                    },
                    {
                        "locality": "MOEMA",
                        "quantity": 3,
                        "type": "PHYSICAL_STORE"
                    }
                ]
            },
            "isMarketable": true
            })
        expect(response.status).toEqual(500)
        done()
    })

    test('Deveria deletar apartir do skuId fornecido', async (done) => {
        const response = await request(server).delete('/delete/43264')
        expect(response.status).toEqual(200)
        done()
    })

    test('Deveria retornar erro pois não existe um id correspondete', async (done) => {
        const response = await request(server).delete('/delete/4326499')
        expect(response.status).toEqual(500)
        done()
    })

    test('Deveria retornar erro pois sku id não é number', async (done) => {
        const response = await request(server).delete('/delete/text')
        expect(response.status).toEqual(500)
        done()
    })
})