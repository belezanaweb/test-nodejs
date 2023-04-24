import { DisplayProductSchema } from '@modules/product/schemas/DisplayProductSchema'

describe('DisplayProductSchema', () => {
  test('should parse display product', () => {
    const inputProduct = {
      sku: 12131,
      name: 'Kit La Roche-Posay Power Hidratação Duo',
      inventory: {
        warehouses: [],
      },
    }

    expect(DisplayProductSchema.parse(inputProduct)).toEqual({
      sku: 12131,
      name: 'Kit La Roche-Posay Power Hidratação Duo',
      inventory: {
        quantity: 0,
        warehouses: [],
      },
      isMarketable: false,
    })
  })
})
