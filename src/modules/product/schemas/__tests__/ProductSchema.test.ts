import { ProductSchema } from '@modules/product/schemas/ProductSchema'

import { mockProduct } from '@modules/product/schemas/__fakes__/ProductMocks'

describe('InputProductSchema', () => {
  test('should parse input product', () => {
    expect(ProductSchema.parse(mockProduct)).toEqual(mockProduct)
  })
})
