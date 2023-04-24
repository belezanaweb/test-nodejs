import fastifyPlugin from 'fastify-plugin'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { FastifyInstance } from 'fastify'
import { fastifySwagger } from '@fastify/swagger'
import { jsonSchemaTransform } from 'fastify-type-provider-zod'

async function registerDocsRoutes(fastify: FastifyInstance) {
  const port = Number(process.env.PORT) || 3000

  await fastify.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Super Test Node.js',
        version: '1.0.0',
      },
      servers: [
        {
          url: `http://localhost:${port}`,
          description: 'Test Environment',
        },
      ],
      tags: [
        {
          name: 'Products',
        },
      ],
    },
    transform: jsonSchemaTransform,
  })

  await fastify.register(fastifySwaggerUI, {
    routePrefix: '/docs',
  })
}

export const docsPlugin = fastifyPlugin(registerDocsRoutes)
