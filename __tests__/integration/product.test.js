
import { cloneDeep } from 'lodash'
import  request from 'supertest'
import app from '../../src/App'
import database from '../../database/database'
import ProductController from '../../src/controllers/ProductController'

const mockDatabaseData = require('../mocks/product/database-data.json').arr
const mockAllSavedProducts = require('../mocks/product/all-saved-products.json').arr
const mockSavedProduct = require('../mocks/product/saved-product.json')
const mockNonSavedProduct = require('../mocks/product/non-saved-product.json')

describe('Product resource (/product)', () => {
  beforeEach(async () => {
    database.splice(0, database.length)
    mockDatabaseData.forEach(el => database.push(el))
  })

  it('should return an array with all products', async () => {
    const response = await request(app).get('/product')
    expect(response.status).toBe(200)
    expect(response.body).toEqual(mockAllSavedProducts)
  })

  it('should return a product with SKU = 2000', async () => {
    const response = await request(app).get('/product/2000')
    expect(response.status).toBe(200)
    expect(response.body).toEqual(mockSavedProduct)
  })

  it('should return a non-existent product error on search', async () => {
    const response = await request(app).get('/product/4000')
    expect(response.status).toBe(404)
    expect(response.body.message).toBe('sku 4000 not found in database')
  })

  it('should persist a product', async () => {
    const product = cloneDeep(mockNonSavedProduct)
    const responsePost = await request(app)
      .post('/product')
      .send(product)
    expect(responsePost.status).toBe(200)

    const responseGet = await request(app)
      .get(`/product/${product.sku}`)
    expect(responseGet.status).toBe(200)
    expect(responseGet.body).toEqual(product)
  })

  it('should not persist a product with an existing sku', async () => {
    const product = cloneDeep(mockSavedProduct)
    const response = await request(app)
      .post('/product')
      .send(product)
    expect(response.status).toBe(409)
    expect(response.body.message).toBe('Item already existing in the database')
  })

  it('should update a product', async () => {
    const product = cloneDeep(mockNonSavedProduct)    
    const responsePut = await request(app)
      .put('/product/2000')
      .send(product)
    expect(responsePut.status).toBe(204)

    product.sku = 2000
    const responseGet = await request(app)
      .get('/product/2000')
    expect(responseGet.status).toBe(200)
    expect(responseGet.body).toEqual(product)
  })

  it('should return a non-existent product error on update', async () => {
    const product = cloneDeep(mockNonSavedProduct)    
    const response = await request(app)
      .put('/product/4000')
      .send(product)
    expect(response.status).toBe(404)
    expect(response.body.message).toBe('sku 4000 not found in database')
  })

  it('should delete a product', async () => {
    const responseDelete = await request(app)
      .delete('/product/2000')
    expect(responseDelete.status).toBe(204)

    const responseGet = await request(app)
      .get('/product/2000')
    expect(responseGet.status).toBe(404)
    expect(responseGet.body.message).toBe('sku 2000 not found in database')
  })

  it('should return a non-existent product error on delete', async () => { 
    const response = await request(app)
      .delete('/product/4000')
    expect(response.status).toBe(404)
    expect(response.body.message).toBe('sku 4000 not found in database')
  })

})