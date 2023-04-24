import { z } from 'zod'

import { ProductSchema } from '@modules/product/schemas/ProductSchema'

export const DisplayProductSchema = ProductSchema.extend({
  inventory: ProductSchema.shape.inventory.extend({
    quantity: z.number().default(0),
  }),
  isMarketable: z.boolean().default(false),
})

export type DisplayProduct = z.infer<typeof DisplayProductSchema>
