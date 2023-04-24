import { FastifyPluginAsync } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { GenericErrorSchema } from '@modules/shared/schemas/GenericErrorSchema'

import { DisplayProductSchema } from '@modules/product/schemas/DisplayProductSchema'
import { ProductNotFoundError } from '@modules/product/exceptions/ProductNotFoundError'
import { ProductNotFoundErrorSchema } from '@root/modules/product/schemas/ProductNotFoundErrorSchema'
import { ProductSchema } from '@modules/product/schemas/ProductSchema'
import { SKUSchema } from '@modules/product/schemas/SKUSchema'

import { ProductService } from '@modules/product/ProductService'

export const updateProduct: FastifyPluginAsync = async (fastify) => {
  const productService: ProductService = fastify.getProductService()

  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: 'PUT',
    url: '/products/:sku',
    schema: {
      params: SKUSchema,
      body: ProductSchema,
      tags: ['Products'],
      response: {
        201: DisplayProductSchema,
        404: ProductNotFoundErrorSchema,
        '5xx': GenericErrorSchema,
      },
    },
    handler: async (req, res) => {
      try {
        const updatedProduct = await productService.updateProduct(
          req.params.sku,
          req.body
        )

        return res.send(updatedProduct)
      } catch (e) {
        if (e instanceof ProductNotFoundError) {
          throw fastify.httpErrors.notFound(e.message)
        }

        throw fastify.httpErrors.internalServerError('Failed to update Product')
      }
    },
  })
}
