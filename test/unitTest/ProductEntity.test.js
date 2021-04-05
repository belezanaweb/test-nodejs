/* eslint-disable no-unused-expressions */
import { describe, it } from 'mocha'
import { expect } from 'chai'
import { cloneDeep } from "lodash"

import WarehousesEntity from '../../src/entities/WarehousesEntity'
import InventoryEntity from '../../src/entities/InventoryEntity'
import ProductEntity from '../../src/entities/ProductEntity'

const productMock = require('../mocks/valid-product.json')

describe('ProductEntity Suit Test', () => {

  it('Should return a Warehouse object', () => {
    const warehouse = productMock.inventory.warehouses[0]
    const expected = new WarehousesEntity(warehouse)

    expect(warehouse).to.be.deep.equal(warehouse)
    expect(expected).to.have.property('locality')
    expect(expected).to.have.property('quantity')
    expect(expected).to.have.property('type')
  })

  it('Should return an empty Warehouse object', () => {
    const expected = new WarehousesEntity({})

    expect(expected).to.have.property('locality')
    expect(expected).to.have.property('quantity')
    expect(expected).to.have.property('type')
    expect(expected.locality).to.be.equal('')
    expect(expected.quantity).to.be.equal(0)
    expect(expected.type).to.be.equal('')
  })

  it('Should return an inventory object', () => {
    const inventory = productMock.inventory
    const expected = new InventoryEntity(inventory)

    expect(inventory).to.be.deep.equal(expected)
    expect(expected).to.be.an('object')
    expect(expected).to.have.property('warehouses')
    expect(expected.warehouses).to.be.an('array')
    expect(expected.warehouses.length).to.be.gte(0)
    expect(expected.warehouses[0]).to.have.property('quantity')
  })

  it('Should return a product object', () => {
    const product = productMock
    const expected = new ProductEntity(product)

    expect(product).to.be.deep.equal(expected)
    expect(expected).to.have.property('sku')
    expect(expected).to.have.property('name')
    expect(expected).to.have.property('inventory')
    expect(expected).to.have.property('isMarketable')
    expect(expected).to.be.an('object')
    expect(expected.inventory).to.be.an('object')
  })

  it('Should return a product object when using the toJson function', () => {
    const product = productMock
    const result = new ProductEntity(product)
    const expected = result.toJson()

    expect(expected).to.be.an('object')
    expect(expected.inventory).to.be.an('object')
    expect(expected.inventory.quantity).to.be.equal(15)
    expect(expected.isMarketable).to.be.true

  })

  it('Should return a product object when using the toJson function without quantity', () => {
    const product = cloneDeep(productMock)
    product.inventory.warehouses[0].quantity = 0
    product.inventory.warehouses[1].quantity = 0
    const result = new ProductEntity(product)
    const expected = result.toJson()

    expect(expected).to.be.an('object')
    expect(expected.inventory).to.be.an('object')
    expect(expected.inventory.quantity).to.be.equal(0)
    expect(expected.isMarketable).to.be.false

  })
})
