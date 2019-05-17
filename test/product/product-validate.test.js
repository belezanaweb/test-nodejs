const { runValidate } = require('integrations/express/validation')
const { schema } = require('modules/product/validations')
const { expect } = require('chai')

const obj = {
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
    },
    isMarketable: true
}

describe('product-validate', () => {
    it('correct object', () => {
        const ret = runValidate(obj, schema)
        expect(ret.error).to.be.null
    })

    it('object without sku', () => {
        delete obj.sku
        const ret = runValidate(obj, schema)
        expect(ret.error).to.not.be.null
        obj.sku = 43264
    })

    it('object without name', () => {
        delete obj.name
        const ret = runValidate(obj, schema)
        expect(ret.error).to.not.be.null
        obj.name = 'teste'
    })

    it('object incorrect column', () => {
        obj.abc = 'abc'
        const ret = runValidate(obj, schema)
        expect(ret.error).to.not.be.null
    })
});