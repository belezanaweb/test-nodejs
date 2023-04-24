import { z } from 'zod'

export const DuplicatedProductErrorSchema = z
  .object({
    error: z.string(),
    message: z.string().optional(),
    status: z.number(),
  })
  .describe('Product with same SKU already exists')
