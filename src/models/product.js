const storage = require('node-persist')

const initialize = async () => {
  await storage.init({
    encoding: 'utf8'
  })
}

const get = async sku => {
  await initialize()
  return await storage.getItem(sku.toString())
}

const set = async data => {
  await initialize()
  await storage.setItem(data.sku.toString(), data)
}

const remove = async sku => {
  await initialize()
  await storage.removeItem(sku)
}

module.exports = { get, set, remove }
