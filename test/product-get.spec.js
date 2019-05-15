const createServer = require('helpers/create-server')
const sinon = require('sinon')
const productModel = require('../src/models/product')
const productMock = require('./mocks/product')
const { assert } = require('chai')

describe('GET /product/:sku', function () {
  let request, sandbox

  beforeEach(async function () {
    request = await createServer()
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should return 200 - product found', async function () {
    sandbox.stub(productModel, 'get').returns(productMock)

    await request.get('/product/43264')
      .send(productMock)
      .expect(200)
  })

  it('should return 404 - product not found', async function(){
    sandbox.stub(productModel, 'get').returns(null)

    await request.get('/product/43264')
      .expect(404)
  })

  it('should return a product with quantity of 15', async function () {
    sandbox.stub(productModel, 'get').returns(productMock)

    await request.get('/product/43264')
      .send(productMock)
      .expect(200)
      .then((res) => {
        assert.equal(res.body.inventory.quantity, 15)
      })
  })

  it('should return a marketable product', async function () {
    sandbox.stub(productModel, 'get').returns(productMock)

    await request.get('/product/43264')
      .send(productMock)
      .expect(200)
      .then((res) => {
        assert.equal(res.body.isMarketable, true)
      })
  })

  it('should return a non marketable product', async function () {
    sandbox.stub(productModel, 'get').returns(require('./mocks/product-out-of-stock'))

    await request.get('/product/43264')
      .send(productMock)
      .expect(200)
      .then((res) => {
        assert.equal(res.body.isMarketable, false)
      })
  })

  it('should return a product with a least one e-commerce warehouse', async function () {
    sandbox.stub(productModel, 'get').returns(productMock)

    await request.get('/product/43264')
      .send(productMock)
      .expect(200)
      .then((res) => {
        const warehouses = res.body.inventory.warehouses.map((data) => data.type)
        assert.include(warehouses, 'ECOMMERCE')
      })
  })

  it('should return a product with a least one physical store warehouse', async function () {
    sandbox.stub(productModel, 'get').returns(productMock)

    await request.get('/product/43264')
      .send(productMock)
      .expect(200)
      .then((res) => {
        const warehouses = res.body.inventory.warehouses.map((data) => data.type)
        assert.include(warehouses, 'PHYSICAL_STORE')
      })
  })

  it('should return a product without an e-commerce warehouse', async function () {
    sandbox.stub(productModel, 'get').returns(require('./mocks/product-physical-store-only'))

    await request.get('/product/43264')
      .send(productMock)
      .expect(200)
      .then((res) => {
        const warehouses = res.body.inventory.warehouses.map((data) => data.type)
        assert.notInclude(warehouses, 'ECOMMERCE')
      })
  })

  it('should return a product without a physical store warehouse', async function () {
    sandbox.stub(productModel, 'get').returns(require('./mocks/product-ecommerce-only'))

    await request.get('/product/43264')
      .send(productMock)
      .expect(200)
      .then((res) => {
        const warehouses = res.body.inventory.warehouses.map((data) => data.type)
        assert.notInclude(warehouses, 'PHYSICAL_STORE')
      })
  })
})
