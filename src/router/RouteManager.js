import { readdirSync } from 'fs'
import path from 'path'

export default async app => {
  const files = await readdirSync(path.join(__dirname, './'))
  for (const file of files) {
    if (file !== 'RouteManager.js') {
      import(path.join(__dirname, file))
        .then(modulo => modulo.default(app))
    }
  }
}
