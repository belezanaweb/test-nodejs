import * as dotenv from 'dotenv'
dotenv.config()

import { buildInstance } from '@root/app'

const environment = process.env.NODE_ENV || 'development'
const port = Number(process.env.PORT) || 3000

const loggerOptions: Record<string, {}> = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        ignore: 'pid,hostname',
      },
    },
  },
  production: true,
}

const app = buildInstance({
  logger: loggerOptions[environment] ?? true,
})

async function start(): Promise<void> {
  try {
    await app.ready()
    await app.listen({ port })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
