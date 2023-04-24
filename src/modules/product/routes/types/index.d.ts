import { ProductService } from '@modules/product/ProductService'

declare module 'fastify' {
  interface FastifyInstance {
    getProductService: () => ProductService
  }
}
