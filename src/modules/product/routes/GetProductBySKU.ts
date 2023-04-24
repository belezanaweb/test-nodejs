import { FastifyPluginAsync } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { GenericErrorSchema } from '@modules/shared/schemas/GenericErrorSchema'

import { DisplayProductSchema } from '@modules/product/schemas/DisplayProductSchema'
import { ProductNotFoundError } from '@modules/product/exceptions/ProductNotFoundError'
import { ProductNotFoundErrorSchema } from '@root/modules/product/schemas/ProductNotFoundErrorSchema'
import { SKUSchema } from '@modules/product/schemas/SKUSchema'

import { ProductService } from '@modules/product/ProductService'

export const getProductBySKU: FastifyPluginAsync = async (fastify) => {
  const productService: ProductService = fastify.getProductService()

  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/products/:sku',
    schema: {
      tags: ['Products'],
      params: SKUSchema,
      response: {
        200: DisplayProductSchema,
        404: ProductNotFoundErrorSchema,
        '5xx': GenericErrorSchema,
      },
    },
    handler: async (req, res) => {
      try {
        const product = await productService.getProduct(req.params.sku)

        return res.send(product)
      } catch (e) {
        if (e instanceof ProductNotFoundError) {
          throw fastify.httpErrors.notFound(e.message)
        }

        throw fastify.httpErrors.internalServerError('Failed to get Product')
      }
    },
  })
}
