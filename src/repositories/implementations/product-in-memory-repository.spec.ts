import { ProductInMemoryRepository } from './product-in-memory-repository'

describe('ProductInMemory Repository', () => {
  test('should return all products on all success', async () => {
    const sut = new ProductInMemoryRepository()
    const products = await sut.all()

    expect(products).toHaveLength(0)
  })

  test('should add product on create success', async () => {
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

    const products = await sut.all()
    expect(products).toHaveLength(1)
  })
})
