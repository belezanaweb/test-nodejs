const { post, getBySku, put, del } = require('modules/product/controllers')
const error = require('integrations/express/error-hander')
const { expect } = require('chai')

const payload = {
    sku: 43264,
    name: 'L\'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g',
    inventory: {
        warehouses: [
            {
                locality: 'SP',
                quantity: 12,
                type: 'ECOMMERCE'
            },
            {
                locality: 'MOEMA',
                quantity: 3,
                type: 'PHYSICAL_STORE'
            }
        ]
    }
}
const skuNotExists = 123456


describe('product-controller', () => {
    it('POST correct object', async () => {
        let obj = null
        try {
            obj = await post({ payload, error })
        } catch (error) {

        }
        expect(obj).to.not.be.null
        expect(obj.inventory.quantity).to.equal(15)
        expect(obj.isMarketable).to.equal(true)
    })

    it('POST sku exists', async () => {
        let obj = null
        try {
            obj = await post({ payload, error })
        } catch (error) {

        }
        expect(obj).to.be.null
    })

    it('GET sku exists', async () => {
        const params = { sku: payload.sku }
        try {
            obj = await getBySku({ error, params })
        } catch (error) {

        }
        expect(obj).to.not.be.null
        expect(obj.inventory.quantity).to.equal(15)
        expect(obj.isMarketable).to.equal(true)
    })

    it('GET sku not exists', async () => {
        const params = { sku: skuNotExists }
        try {
            obj = await getBySku({ error, params })
        } catch (error) {

        }
        expect(obj).to.not.be.null
    })

    it('PUT zero quantity', async () => {
        const params = { sku: payload.sku }

        payload.inventory.warehouses[0].quantity = 0
        payload.inventory.warehouses[1].quantity = 0

        let obj = null
        try {
            obj = await put({ error, params, payload })
        } catch (error) {

        }
        expect(obj).to.not.be.null
        expect(obj.inventory.quantity).to.equal(0)
        expect(obj.isMarketable).to.equal(false)
    })

    it('PUT correct object', async () => {
        const params = { sku: payload.sku }

        payload.inventory.warehouses[0].quantity = 10
        payload.inventory.warehouses[1].quantity = 8

        let obj = null
        try {
            obj = await put({ error, params, payload })
        } catch (error) {

        }
        expect(obj).to.not.be.null
        expect(obj.inventory.quantity).to.equal(18)
        expect(obj.isMarketable).to.equal(true)
    })

    it('DEL exists sku', async () => {
        const params = { sku: payload.sku }
        let obj = null
        try {
            obj = await del({ error, params })
        } catch (error) {
            expect(obj).to.equal(true)
        }
        
        try {
            obj = await getBySku({ error, params })
        } catch (error) {

        }
        expect(obj).to.be.null
    })

    it('DEL incorrect sku', async () => {
        const params = { sku: payload.sku }
        try {
            await del({ error, params })
        } catch (error) {
            expect(error).to.not.be.null
        }

        let obj = null
        try {
            obj = await getBySku({ error, params })
        } catch (error) {

        }
        expect(obj).to.be.null
    })


});