const faker = require('faker')
const { ProductsRepository } = require('../../../../src/infra/db/memory')
const { InvalidParamError } = require('../../../../src/utils/errors')

describe('Unit Products Repository ', () => {
  describe('Add product', () => {
    test('Should return an product with sku', () => {
      const props = [
        'sku',
        'name',
        'inventory'
      ]
      const result = ProductsRepository.add({
        sku: faker.datatype.number(),
        name: faker.internet.domainName(),
        inventory: {
          warehouses: [
            {
              locality: 'SP',
              quantity: 1,
              type: 'ECOMMERCE'

            }
          ]
        }
      })
      props.forEach((prop) => expect(result).toHaveProperty(prop))
    })
  })

  describe('Delete By Sku', () => {
    test('Should return true if delete with success', () => {
      const product = ProductsRepository.add({
        sku: faker.datatype.number(),
        name: faker.internet.domainName(),
        inventory: {
          warehouses: [
            {
              locality: 'SP',
              quantity: 1,
              type: 'ECOMMERCE'

            }
          ]
        }
      })
      const result = ProductsRepository.deleteBySku(product.sku)
      expect(result).toBe(true)
    })

    test('Should throws if invalid sku is provided', () => {
      const throwError = () => {
        ProductsRepository.deleteBySku('any_value')
      }
      expect(throwError).toThrow(new InvalidParamError('sku'))
    })

    test('Should return false if SKU not exists', () => {
      const result = ProductsRepository.deleteBySku(faker.datatype.number())
      expect(result).toBe(false)
    })
  })

  describe('Update Product By Sku', () => {
    test('Should return tools', () => {
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

      ProductsRepository.add(product)
      ProductsRepository.updateBySku(product.sku, {
        sku: 43264,
        name: 'Changed',
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
            },
            {
              locality: 'BROKLYN',
              quantity: 3,
              type: 'PHYSICAL_STORE'
            }
          ]
        }
      })

      const result = ProductsRepository.getBySku(product.sku)
      expect(result.inventory.warehouses.length).toBe(3)
      expect(result.name).toBe('Changed')
    })
  })

  describe('Get Product By Sku', () => {
    test('Should return product when sku is provided', async () => {
      const product = {
        sku: faker.datatype.number(),
        name: faker.internet.domainName(),
        inventory: {
          warehouses: [
            {
              locality: 'SP',
              quantity: 1,
              type: 'ECOMMERCE'

            }
          ]
        }
      }

      ProductsRepository.add(product)

      const result = ProductsRepository.getBySku(product.sku)
      expect(result).toStrictEqual(product)
    })

    test('Should return an empty when no has data in database', () => {
      const result = ProductsRepository.getBySku('1')
      expect(result).toBe(undefined)
    })
  })
})
