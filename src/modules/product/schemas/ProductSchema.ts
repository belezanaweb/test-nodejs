import { z } from 'zod'

export enum WarehouseTypes {
  Ecommerce = 'ECOMMERCE',
  PhysicalStore = 'PHYSICAL_STORE',
}

export const ProductSchema = z.object({
  sku: z.number(),
  name: z.string(),
  inventory: z.object({
    warehouses: z
      .array(
        z
          .object({
            locality: z.string(),
            quantity: z.number(),
            type: z.nativeEnum(WarehouseTypes),
          })
          .required()
      )
      .default([]),
  }),
})

export type Product = z.infer<typeof ProductSchema>
