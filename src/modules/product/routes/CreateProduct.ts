import { FastifyPluginAsync } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { GenericErrorSchema } from '@modules/shared/schemas/GenericErrorSchema'

import { DisplayProductSchema } from '@modules/product/schemas/DisplayProductSchema'
import { DuplicatedProductError } from '@modules/product/exceptions/DuplicatedProductError'
import { DuplicatedProductErrorSchema } from '@modules/product/schemas/DuplicatedProductErrorSchema'
import { ProductSchema } from '@modules/product/schemas/ProductSchema'

import { ProductService } from '@modules/product/ProductService'

export const createProduct: FastifyPluginAsync = async (fastify) => {
  const productService: ProductService = fastify.getProductService()

  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/products',
    schema: {
      body: ProductSchema,
      tags: ['Products'],
      response: {
        201: DisplayProductSchema,
        409: DuplicatedProductErrorSchema,
        '5xx': GenericErrorSchema,
      },
    },
    handler: async (req, res) => {
      try {
        const createdProduct = await productService.createProduct(req.body)

        return res.code(201).send(createdProduct)
      } catch (e) {
        if (e instanceof DuplicatedProductError) {
          throw fastify.httpErrors.conflict(e.message)
        }

        throw fastify.httpErrors.internalServerError('Failed to create Product')
      }
    },
  })
}
