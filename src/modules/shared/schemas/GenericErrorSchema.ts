import { z } from 'zod'

export const GenericErrorSchema = z
  .object({ error: z.string(), status: z.number() })
  .describe('Internal error')
