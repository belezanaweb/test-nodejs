import { FastifyPluginAsync } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { EmptyResponseSchema } from '@modules/shared/schemas/EmptyResponseSchema'
import { GenericErrorSchema } from '@modules/shared/schemas/GenericErrorSchema'

import { ProductNotFoundError } from '@modules/product/exceptions/ProductNotFoundError'
import { ProductNotFoundErrorSchema } from '@root/modules/product/schemas/ProductNotFoundErrorSchema'
import { SKUSchema } from '@modules/product/schemas/SKUSchema'

import { ProductService } from '@modules/product/ProductService'

export const removeProduct: FastifyPluginAsync = async (fastify) => {
  const productService: ProductService = fastify.getProductService()

  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: 'DELETE',
    url: '/products/:sku',
    schema: {
      params: SKUSchema,
      tags: ['Products'],
      response: {
        204: EmptyResponseSchema,
        404: ProductNotFoundErrorSchema,
        '5xx': GenericErrorSchema,
      },
    },
    handler: async (req, res) => {
      try {
        await productService.removeProduct(req.params.sku)

        return res.code(204).send()
      } catch (e) {
        if (e instanceof ProductNotFoundError) {
          throw fastify.httpErrors.notFound(e.message)
        }

        throw fastify.httpErrors.internalServerError('Failed to remove Product')
      }
    },
  })
}
