import fastifyPlugin from 'fastify-plugin'
import { FastifyInstance } from 'fastify'

import { createProduct } from '@modules/product/routes/CreateProduct'
import { getProductBySKU } from '@modules/product/routes/GetProductBySKU'
import { removeProduct } from '@modules/product/routes/RemoveProduct'
import { updateProduct } from '@modules/product/routes/UpdateProduct'
import { ProductService } from '@modules/product/ProductService'

async function registerProductRoutes(fastify: FastifyInstance) {
  const productService = new ProductService()

  fastify.decorate('getProductService', (): ProductService => productService)

  await fastify.register(createProduct)
  await fastify.register(getProductBySKU)
  await fastify.register(updateProduct)
  await fastify.register(removeProduct)
}

export const productPlugin = fastifyPlugin(registerProductRoutes)
