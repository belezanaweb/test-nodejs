/* eslint-disable no-unused-expressions */
import {
  describe,
  it,
  before,
  beforeEach,
  afterEach,
} from 'mocha'
import { expect } from 'chai'
import { join } from 'path'
import sinon from 'sinon'
import ProductsRepository from '../../src/repository/ProductsRepository'
import { writeFile } from 'fs/promises'

const productsDatabase = join(__dirname, './../../database', 'products.json')

const productMock = require('../mocks/valid-product.json')
const newProductMock = require('../mocks/new-product.json')

describe('ProductsRepository Suit Test', () => {
  let productService = {}
  let sandbox = {}

  before(() => {
    productService = new ProductsRepository({ file: productsDatabase })
  })

  beforeEach(async () => {
    sandbox = sinon.createSandbox()
    await writeFile(productsDatabase, JSON.stringify([productMock]))

  })

  afterEach(() => {
    sandbox.restore()
  })

  it('Should return all data of the products database', async () => {
    const expected = productMock
    const result = await productService.find()

    expect(result[0]).to.be.deep.equal(expected)
    expect(productService instanceof ProductsRepository).to.be.ok
  })

  it('Given a sku must return an existing product', async () => {
    const product = productMock
    const result = await productService.find(product.sku)

    const expected = product
    expect(result).to.be.deep.equal(expected)
  })

  it('Should check how many times we are calling the find function in the process', async () => {
    const product = productMock
    sandbox
      .stub(productService, productService.find.name)
      .resolves(product)

    await productService.find(product.sku)

    expect(productService.find.calledOnce).to.be.ok
    expect(productService.find.calledWithExactly(product.sku)).to.be.ok
  })

  it('Should return an error when trying to create a product with an existing sku.', async () => {
    const product = productMock
    sandbox.spy(productService, 'create')
    const result = await productService.create(product).catch((error) => error.message)
    const status = productService.create.getCalls()[0]

    expect(status.errorWithCallStack instanceof Error).to.be.true
    expect(result).to.be.equal('sku já está cadastro em nossa base de dados.')
  })

  it('Should return true when to create a new product.', async () => {
    const product = newProductMock
    const result = await productService.create(product)
    const expected = await productService.find(product.sku)

    expect(result).to.be.true
    expect(product).to.be.deep.equal(expected)
  })

  it('Should return true when the product is removed.', async () => {
    const product = productMock
    const result = await productService.destroy(product.sku)
    const response = await productService.find(product.sku).catch(error => error.message)

    expect(result).to.be.true
    expect(response).to.be.equal('sku não encontrado.')
  })

  it('Should return an error when trying to remove a nonexistent product.', async () => {
    const product = newProductMock
    sandbox.spy(productService, 'destroy')
    const result = await productService.destroy(product.sku).catch((error) => error.message)
    const status = productService.destroy.getCalls()[0]

    expect(status.errorWithCallStack instanceof Error).to.be.true
    expect(result).to.be.equal('Nenhum sku foi removido ou encontrado.')
  })

  it('Should return updated data', async () => {
    const product = newProductMock
    await productService.create(product)
    product.name = 'Kit Malbec'
    const result = await productService.update(product.sku, product)
    const expected = await productService.find(product.sku)

    expect(result).to.be.true
    expect(product).to.be.deep.equal(expected)
    await productService.destroy(product.sku)
  })
  it('Should return an error when trying to update a nonexistent product.', async () => {
    const product = newProductMock
    sandbox.spy(productService, 'update')
    const result = await productService.update(product.sku).catch((error) => error.message)
    const status = productService.update.getCalls()[0]

    expect(status.errorWithCallStack instanceof Error).to.be.true
    expect(result).to.be.equal('Nenhum sku foi atualizado ou encontrado.')
  })
})
