/* eslint-disable no-unused-expressions */
import { describe, it, beforeEach } from 'mocha'
import { expect } from 'chai'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import request from "supertest";
import app from "../../src/app";
import ProductEntity from '../../src/entities/ProductEntity';

const productsDatabase = join(__dirname, './../../database', 'products.json')
const productMock = require('../mocks/valid-product.json')
const newProductMock = require('../mocks/new-product.json')

describe('ProductE2E suit teste', () => {
  beforeEach(async () => {
    await writeFile(productsDatabase, JSON.stringify([productMock]))
  })

  describe('/product', () => {
    it('GET', async () => {
      const { body: result } = await request(app)
        .get('/product')
        .expect(200)

      const expected = new ProductEntity(productMock)

      expect(result[0]).to.be.deep.equal(expected.toJson())

    })
    it('POST', async () => {
      const { body: result } = await request(app)
        .post('/product')
        .send(newProductMock)
        .expect(200)


      expect(result).to.be.true

    })

    it('POST error', async () => {
      const response = await request(app)
        .post('/product')
        .send(productMock)
        .expect(422)

      expect(response.body.message).to.be.deep.equal('sku já está cadastro em nossa base de dados.')
      expect(response.status).to.be.equal(422)

    })
  })

  describe('/product/:sku', () => {
    it('GET ONE', async () => {
      const { body: result } = await request(app)
        .get('/product/43264')
        .expect(200)

      const expected = new ProductEntity(productMock)

      expect(result).to.be.deep.equal(expected.toJson())
    })

    it('GET ONE error', async () => {
      const response = await request(app)
        .get('/product/5555')
        .expect(400)


      expect(response.body.message).to.be.deep.equal('sku não encontrado.')
      expect(response.status).to.be.equal(400)
    })

    it('UPDATE', async () => {
      const product = newProductMock
      product.sku = 43264
      const { body: result } = await request(app)
        .put('/product/43264')
        .send(product)
        .expect(200)

      expect(result).to.be.true
    })

    it('UPDATE error', async () => {
      const product = newProductMock
      product.sku = 5555
      const response = await request(app)
        .put('/product/5555')
        .send(product)
        .expect(422)


      expect(response.body.message).to.be.deep.equal('Nenhum sku foi atualizado ou encontrado.')
      expect(response.status).to.be.equal(422)
    })

    it('DELETE', async () => {
      const { body: result } = await request(app)
        .delete('/product/43264')
        .expect(200)

      expect(result).to.be.true
    })

    it('DELETE error', async () => {
      const response = await request(app)
        .delete('/product/5555')
        .expect(422)


      expect(response.body.message).to.be.deep.equal('Nenhum sku foi removido ou encontrado.')
      expect(response.status).to.be.equal(422)
    })

  })



})
