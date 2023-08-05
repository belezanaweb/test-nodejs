import { describe, expect, it } from 'vitest'
import supertest from 'supertest'
import app from './app'

describe('Integration tests', () => {
  it('should return status 404 if not found a product', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/products/123'
    })

    expect(response.statusCode).toBe(404)
  })

  it('should create a product', async () => {
    await app.ready()

    const response = await supertest(app.server)
      .post('/products')
      .send({
        sku: 43264,
        name: "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
        inventory: {
          quantity: 15,
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
      })
    expect(response.statusCode).toBe(201)
  })

  it('should return 400 if SKU on creation was not provided', async () => {
    await app.ready()

    const response = await supertest(app.server)
      .post('/products')
      .send({
        name: "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
        inventory: {
          quantity: 15,
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
      })
    expect(response.statusCode).toBe(400)
    expect(response.body.message).toBe('Missing param: sku')
  })

  it('should return 400 if name on creation was not provided', async () => {
    await app.ready()

    const response = await supertest(app.server)
      .post('/products')
      .send({
        sku: 43264,
        inventory: {
          quantity: 15,
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
      })
    expect(response.statusCode).toBe(400)
    expect(response.body.message).toBe('Missing param: name')
  })

  it('should return 400 if inventory on creation was not provided', async () => {
    await app.ready()

    const response = await supertest(app.server).post('/products').send({
      sku: 43264,
      name: "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g"
    })
    expect(response.statusCode).toBe(400)
    expect(response.body.message).toBe('Missing param: inventory')
  })

  it('should find a product', async () => {
    await app.ready()
    const product = {
      sku: 43264,
      name: "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
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

    await supertest(app.server).post('/products').send(product)

    const response = await supertest(app.server).get('/products/43264')
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      ...product,
      isMarketable: true,
      inventory: {
        ...product.inventory,
        quantity: 15
      }
    })
  })

  it('should return 400 if SKU was invalid on find a product', async () => {
    await app.ready()

    let response = await supertest(app.server).get('/products/a')

    expect(response.statusCode).toBe(400)

    response = await supertest(app.server).get(`/products/${null}`)
    expect(response.statusCode).toBe(400)
  })

  it('should update a product', async () => {
    await app.ready()

    await supertest(app.server)
      .post('/products')
      .send({
        sku: 43264,
        name: "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
        inventory: {
          quantity: 15,
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
      })

    const response = await supertest(app.server)
      .put('/products/43264')
      .send({
        sku: 43264,
        name: 'Updated name',
        inventory: {
          quantity: 15,
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
      })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      sku: 43264,
      name: 'Updated name',
      inventory: {
        quantity: 15,
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
    })
  })

  it('should return 400 if SKU was invalid on Update a product', async () => {
    await app.ready()

    const response = await supertest(app.server)
      .put('/products/a')
      .send({
        sku: 43264,
        name: 'Updated name',
        inventory: {
          quantity: 15,
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
      })

    expect(response.statusCode).toBe(400)
  })

  it('should return 400 if name on Update was not provided', async () => {
    await app.ready()

    const response = await supertest(app.server)
      .put('/products/43264')
      .send({
        sku: 43264,
        inventory: {
          quantity: 15,
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
      })
    expect(response.statusCode).toBe(400)
    expect(response.body.message).toBe('Missing param: name')
  })

  it('should return 400 if inventory on Update was not provided', async () => {
    await app.ready()

    const response = await supertest(app.server).put('/products/43264').send({
      sku: 43264,
      name: 'Updated name'
    })
    expect(response.statusCode).toBe(400)
    expect(response.body.message).toBe('Missing param: inventory')
  })

  it('should return 400 if inventory on creation was not provided', async () => {
    await app.ready()

    const response = await supertest(app.server).post('/products').send({
      sku: 43264,
      name: "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g"
    })
    expect(response.statusCode).toBe(400)
    expect(response.body.message).toBe('Missing param: inventory')
  })

  it('should return 404 if product was not found on Update a product', async () => {
    await app.ready()

    const response = await supertest(app.server)
      .put('/products/123')
      .send({
        sku: 123,
        name: 'Updated name',
        inventory: {
          quantity: 15,
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
      })

    expect(response.statusCode).toBe(404)
  })

  it('should delete a product', async () => {
    await app.ready()

    await supertest(app.server)
      .post('/products')
      .send({
        sku: 43264,
        name: "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
        inventory: {
          quantity: 15,
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
      })

    const response = await supertest(app.server).delete('/products/43264')

    expect(response.statusCode).toBe(204)
  })

  it('should return 400 if SKU was invalid on delete a product', async () => {
    await app.ready()

    const response = await supertest(app.server).delete('/products/a')

    expect(response.statusCode).toBe(400)
  })

  it('should return 404 if product was not found on delete a product', async () => {
    await app.ready()

    const response = await supertest(app.server).delete('/products/123')

    expect(response.statusCode).toBe(404)
  })
})
