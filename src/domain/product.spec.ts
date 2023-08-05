import { beforeEach, expect, describe, it } from 'vitest'
import { Product } from './product'

describe('Product unit tests', () => {
  let input: any

  beforeEach(() => {
    input = {
      sku: 123456,
      name: 'Any Product',
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
  })

  it('should throw an error if sku is not provided', () => {
    input.sku = 0
    expect(() => new Product(input)).toThrow('Invalid product sku')
  })

  it('should throw an error if sku is not positive', () => {
    input.sku = -1
    expect(() => new Product(input)).toThrow('Invalid product sku')
  })

  it('should throw an error if name is not provided', () => {
    input.name = ''
    expect(() => new Product(input)).toThrow('Invalid product name')
  })

  it('should throw an error if inventory is not provided', () => {
    delete input.inventory
    expect(() => new Product(input)).toThrow('Invalid product inventory')
  })

  it('should throw an error if inventory is not an object', () => {
    input.inventory = []
    expect(() => new Product(input)).toThrow('Invalid product inventory')
  })

  it('should throw an error if inventory.warehouses is not provided', () => {
    delete input.inventory.warehouses
    expect(() => new Product(input)).toThrow('Invalid product inventory')
  })

  it('should throw an error if inventory.warehouses is not an array', () => {
    input.inventory.warehouses = {}
    expect(() => new Product(input)).toThrow('Invalid product inventory')
  })

  it('should throw an error if inventory.warehouses is empty', () => {
    input.inventory.warehouses = []
    expect(() => new Product(input)).toThrow('Invalid product inventory')
  })

  it('should throw if the warehouse locality is not provided', () => {
    delete input.inventory.warehouses[0].locality
    expect(() => new Product(input)).toThrow('Invalid warehouse locality')

    input.inventory.warehouses[0].locality = ''
    expect(() => new Product(input)).toThrow('Invalid warehouse locality')
  })

  it('should throw if the warehouse quantity is not provided', () => {
    delete input.inventory.warehouses[0].quantity
    expect(() => new Product(input)).toThrow('Invalid warehouse quantity')

    input.inventory.warehouses[0].quantity = -1
    expect(() => new Product(input)).toThrow('Invalid warehouse quantity')
  })

  it('should throw if the warehouse type is not provided', () => {
    delete input.inventory.warehouses[0].type
    expect(() => new Product(input)).toThrow('Invalid warehouse type')

    input.inventory.warehouses[0].type = ''
    expect(() => new Product(input)).toThrow('Invalid warehouse type')
  })

  it('should create a product with valid input', () => {
    const product = new Product(input)
    expect(product).toBeInstanceOf(Product)
    expect(product.sku).toBe(input.sku)
    expect(product.name).toBe(input.name)
    expect(product.inventory.warehouses).toBe(input.inventory.warehouses)
  })

  it('should calculate the product quantity', () => {
    const product = new Product(input)
    expect(product.inventory.quantity).toBe(15)
  })

  it('should calculate a product with no quantity', () => {
    input.inventory.warehouses[0].quantity = 0
    input.inventory.warehouses[1].quantity = 0
    const product = new Product(input)
    expect(product.inventory.quantity).toBe(0)
  })

  it('should calculate if product is marketable', () => {
    const product = new Product(input)
    expect(product.isMarketable).toBe(true)
  })

  it('should calculate if product is not marketable', () => {
    input.inventory.warehouses[0].quantity = 0
    input.inventory.warehouses[1].quantity = 0
    const product = new Product(input)
    expect(product.isMarketable).toBe(false)
  })
})
