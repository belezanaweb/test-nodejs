import { ProductInMemoryRepository } from './product-in-memory-repository'

describe('ProductInMemory Repository', () => {
  test('should return all products on all success', async () => {
    const sut = new ProductInMemoryRepository()
    const products = await sut.all()

    expect(products).toHaveLength(0)
  })

  test('should add product on create success', async () => {
    const sut = new ProductInMemoryRepository()
    const newProduct = await sut.create({
      sku: 1,
      name: 'any_name',
      inventory: {
        warehouses: [
          {
            locality: 'ANY_LOCALITY',
            quantity: 1,
            type: 'ANY_TYPE'
          }
        ]
      }
    })

    const products = await sut.all()
    expect(products).toHaveLength(1)
    expect(newProduct).toEqual({
      sku: 1,
      name: 'any_name',
      inventory: {
        warehouses: [
          {
            locality: 'ANY_LOCALITY',
            quantity: 1,
            type: 'ANY_TYPE'
          }
        ]
      }
    })
  })

  test('should update product on update success', async () => {
    const sut = new ProductInMemoryRepository()
    await sut.create({
      sku: 1,
      name: 'any_name',
      inventory: {
        warehouses: [
          {
            locality: 'ANY_LOCALITY',
            quantity: 1,
            type: 'ANY_TYPE'
          }
        ]
      }
    })

    const updatedProduct = await sut.update({
      sku: 1,
      name: 'new_name',
      inventory: {
        warehouses: [
          {
            locality: 'NEW_LOCALITY',
            quantity: 1,
            type: 'NEW_TYPE'
          }
        ]
      }
    })

    expect(updatedProduct).toEqual({
      sku: 1,
      name: 'new_name',
      inventory: {
        warehouses: [
          {
            locality: 'NEW_LOCALITY',
            quantity: 1,
            type: 'NEW_TYPE'
          }
        ]
      }
    })
  })

  test('should return product on findBySku success', async () => {
    const sut = new ProductInMemoryRepository()
    await sut.create({
      sku: 1,
      name: 'any_name',
      inventory: {
        warehouses: [
          {
            locality: 'ANY_LOCALITY',
            quantity: 1,
            type: 'ANY_TYPE'
          }
        ]
      }
    })

    const product = await sut.findBySku(1)
    expect(product).toBeTruthy()
    expect(product).toMatchObject({
      sku: 1,
      name: 'any_name',
      inventory: {
        warehouses: [
          {
            locality: 'ANY_LOCALITY',
            quantity: 1,
            type: 'ANY_TYPE'
          }
        ]
      }
    })
  })
})
