const debug = require('debug')('wbruno:test:config:memory')
const domain = require('../../../server/domain/Product')

describe('Product domain', () => {
  let productWithInventory = {
    inventory: {
      warehouses: [{quantity: 3}, {quantity: 12}]
    }
  }
  let productWithoutInventory = {
    inventory: {
      warehouses: []
    }
  }

  it('#getInventory', () =>{
    let inventory = domain.getInventory(productWithInventory.inventory)
    debug('inventory', inventory)
    assert.equal(15, inventory.quantity)
  })

  it('#getInventory empty object', () =>{
    let inventory = domain.getInventory()
    debug('inventory', inventory)
    assert.deepEqual({ quantity: 0 }, inventory)
  })

  it('#getIsMarketable', () =>{
    let isMarketable = domain.getIsMarketable(productWithInventory.inventory)
    debug('isMarketable', isMarketable)
    assert.ok(isMarketable)
  })

  it('#getIsMarketable without inventory', () =>{
    let isMarketable = domain.getIsMarketable(productWithoutInventory)
    debug('isMarketable', isMarketable)
    assert.ok(!isMarketable)
  })

  it('#getProduct', () =>{
    let product = domain.getProduct(productWithInventory)
    let expected = {
      inventory: {
        quantity: 15,
        warehouses: [{quantity: 3 }, {quantity: 12 } ]
      },
      isMarketable: true
    }

    assert.deepEqual(expected, product)
  })

  it('#getProduct without inventory', () =>{
    let product = domain.getProduct(productWithoutInventory)
    let expected = {
      inventory: {
        quantity: 0,
        warehouses: []
      },
      isMarketable: false
    }
    assert.deepEqual(expected, product)
  })

  it('#getProduct empty object', () =>{
    let product = domain.getProduct()
    let expected = {
      inventory: {
        quantity: 0
      },
      isMarketable: false
    }
    assert.deepEqual(expected, product)
  })
})
