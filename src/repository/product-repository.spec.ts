import { describe, expect, it } from 'vitest'
import { ProductRepositoryFake } from './product-repository.fake'
import { Product } from '../domain/product'

describe('Product Repository Fake tests', () => {
  it('should add and find a product', async () => {
    const sut = new ProductRepositoryFake()

    await sut.add(
      new Product({
        sku: 123,
        name: 'A test product',
        inventory: {
          warehouses: [
            {
              locality: 'test',
              quantity: 1,
              type: 'TEST'
            }
          ]
        }
      })
    )

    const product = await sut.findBySku(123)

    expect(product).toBeDefined()
    expect(product?.sku).toBe(123)
    expect(product?.name).toBe('A test product')
  })

  it('should delete a product', async () => {
    const sut = new ProductRepositoryFake()
    await sut.add(
      new Product({
        sku: 123,
        name: 'A test product',
        inventory: {
          warehouses: [
            {
              locality: 'test',
              quantity: 1,
              type: 'TEST'
            }
          ]
        }
      })
    )

    const product = await sut.delete(123)

    expect(product).toBeUndefined()
  })

  it('should update a product', async () => {
    const sut = new ProductRepositoryFake()
    await sut.add(
      new Product({
        sku: 123,
        name: 'A test product',
        inventory: {
          warehouses: [
            {
              locality: 'test',
              quantity: 1,
              type: 'TEST'
            }
          ]
        }
      })
    )
    await sut.update(
      new Product({
        sku: 123,
        name: 'A test updated',
        inventory: {
          warehouses: [
            {
              locality: 'NEW',
              quantity: 1,
              type: 'New'
            }
          ]
        }
      })
    )
    const product = await sut.findBySku(123)

    expect(product).toBeDefined()
    expect(product?.sku).toBe(123)
    expect(product?.name).toBe('A test updated')
  })
})
