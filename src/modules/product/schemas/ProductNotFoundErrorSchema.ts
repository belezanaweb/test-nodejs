import { z } from 'zod'

export const ProductNotFoundErrorSchema = z
  .object({
    error: z.string(),
    message: z.string().optional(),
    status: z.number(),
  })
  .describe('Product not found')
