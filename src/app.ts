import Fastify, { FastifyInstance } from 'fastify'
import fastifySensible from '@fastify/sensible'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

import { productPlugin } from '@modules/product/routes'
import { docsPlugin } from '@modules/docs/routes'

export function buildInstance(options = {}): FastifyInstance {
  const app = Fastify(options)

  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)

  app.register(fastifySensible)

  return app.after(() => {
    app.register(docsPlugin)

    app.register(productPlugin)
  })
}
