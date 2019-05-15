const createServer = require('helpers/create-server')
const sinon = require('sinon')
const productModel = require('../src/models/product')
const productMock = require('./mocks/product')

describe('POST /product', function () {
  let request, sandbox

  beforeEach(async function () {
    request = await createServer()
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should return 201 - product created', async function () {
    sandbox.stub(productModel, 'get').returns(false)

    await request.post('/product')
      .send(productMock)
      .expect(201)
  })

  it('should return 409 - product already exists', async function(){
    sandbox.stub(productModel, 'get').returns(productMock)

    await request.post('/product')
      .send(productMock)
      .expect(409)
  })

  it('should return 400 - invalid parameters', async function(){
    sandbox.stub(productModel, 'get').returns(productMock)

    await request.post('/product')
      .expect(400)
  })
})
