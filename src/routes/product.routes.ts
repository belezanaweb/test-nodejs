import { FastifyInstance } from 'fastify'
import {
  CreateProductInputDTO,
  DeleteProductDTO,
  GetProductBySkuDTO,
  UpdateProductDTO
} from '../dtos'
import { ProductRepositoryFake } from '../repository/product-repository.fake'
import {
  CreateProduct,
  DeleteProduct,
  GetProductBySku,
  UpdateProduct
} from '../usecases'
import { MissingParamError, InvalidParamError, NotFoundError } from '../error'

const productRepository = new ProductRepositoryFake()

export async function productsRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    try {
      const { sku, name, inventory } = request.body as CreateProductInputDTO
      if (!sku) {
        throw new MissingParamError('sku')
      }
      if (!name) {
        throw new MissingParamError('name')
      }
      if (!inventory) {
        throw new MissingParamError('inventory')
      }

      const createProductUsecase = new CreateProduct(productRepository)
      await createProductUsecase.execute({ sku, name, inventory })

      reply.status(201).send()
    } catch (error) {
      if (error instanceof MissingParamError) {
        return reply.status(400).send({ message: error.message })
      }
      if (error instanceof InvalidParamError) {
        return reply.status(400).send({ message: error.message })
      }
      console.error(error)
      reply.status(500).send({ message: 'Internal server error' })
    }
  })

  app.get('/:sku', async (request, reply) => {
    try {
      const { sku } = request.params as GetProductBySkuDTO
      if (!sku) {
        throw new MissingParamError('sku')
      }
      if (isNaN(Number(sku))) {
        throw new InvalidParamError('sku')
      }

      const getProductBySku = new GetProductBySku(productRepository)
      const product = await getProductBySku.execute(Number(sku))

      reply.status(200).send(product)
    } catch (error) {
      if (error instanceof MissingParamError) {
        return reply.status(400).send({ message: error.message })
      }
      if (error instanceof InvalidParamError) {
        return reply.status(400).send({ message: error.message })
      }
      if (error instanceof NotFoundError) {
        return reply.status(404).send()
      }
      console.error(error)
      reply.status(500).send({ message: 'Internal server error' })
    }
  })

  app.put('/:sku', async (request, reply) => {
    try {
      const { sku } = request.params as UpdateProductDTO
      const { name, inventory } = request.body as UpdateProductDTO
      if (!sku) {
        throw new MissingParamError('sku')
      }
      if (isNaN(Number(sku))) {
        throw new InvalidParamError('sku')
      }
      if (!name) {
        throw new MissingParamError('name')
      }
      if (!inventory) {
        throw new MissingParamError('inventory')
      }

      const updateProduct = new UpdateProduct(productRepository)
      const product = await updateProduct.execute({
        sku: Number(sku),
        name,
        inventory
      })

      reply.status(200).send(product)
    } catch (error) {
      if (error instanceof MissingParamError) {
        return reply.status(400).send({ message: error.message })
      }
      if (error instanceof InvalidParamError) {
        return reply.status(400).send({ message: error.message })
      }
      if (error instanceof NotFoundError) {
        return reply.status(404).send()
      }
      console.error(error)
      reply.status(500).send({ message: 'Internal server error' })
    }
  })

  app.delete('/:sku', async (request, reply) => {
    try {
      const { sku } = request.params as DeleteProductDTO
      if (!sku) {
        throw new MissingParamError('sku')
      }
      if (isNaN(Number(sku))) {
        throw new InvalidParamError('sku')
      }

      const deleteProduct = new DeleteProduct(productRepository)
      await deleteProduct.execute({
        sku: Number(sku)
      })

      reply.status(204).send()
    } catch (error) {
      if (error instanceof MissingParamError) {
        return reply.status(400).send({ message: error.message })
      }
      if (error instanceof InvalidParamError) {
        return reply.status(400).send({ message: error.message })
      }
      if (error instanceof NotFoundError) {
        return reply.status(404).send()
      }
      console.error(error)
      reply.status(500).send({ message: 'Internal server error' })
    }
  })
}
