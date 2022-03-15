import './config/module-alias' // Permite usar o alias @
import 'reflect-metadata'
import { TypeORMConnection } from '@/infra/adapters/typeorm/helpers/typeorm-connection'
import app from './config/app'
import env from './config/env'

TypeORMConnection.getInstance().connect(env.databaseEnv)
  .then(async () => {
    app.listen(env.port, () => {
      const buildDate = getBuildDateTime()
      process.env.BUILD_DATETIME = buildDate.toISOString()

      console.log('== API-Teste-GrupoBoticario ==')
      console.log(`Enviroment: ${env.databaseEnv.toUpperCase()}`)
      console.log(`Server rodando em http://${env.serverHost}:${env.port}`)
    })
  })
  .catch(console.error)

function getBuildDateTime (): Date {
  const data = new Date()
  data.setTime(data.getTime() - data.getTimezoneOffset() * 60000)
  return data
}
