const createServer = require('helpers/create-server')
const sinon = require('sinon')
const productModel = require('../src/models/product')
const productMock = require('./mocks/product')

describe('PUT /product/:sku', function () {
  let request, sandbox

  beforeEach(async function () {
    request = await createServer()
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should return 204 - product updated', async function () {
    sandbox.stub(productModel, 'get').returns(productMock)

    await request.put('/product/43264')
      .send(productMock)
      .expect(204)
  })

  it('should return 404 - product not found', async function(){
    sandbox.stub(productModel, 'get').returns(null)

    await request.put('/product/43264')
      .send(productMock)
      .expect(404)
  })

  it('should return 400 - invalid parameters', async function(){
    sandbox.stub(productModel, 'get').returns(productMock)

    await request.put('/product/43264')
      .expect(400)
  })
})
