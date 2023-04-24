import { z } from 'zod'

export const SKUSchema = z
  .object({
    sku: z.string().transform(Number),
  })
  .required()
