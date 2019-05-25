const debug = require('debug')('wbruno:config:memory')
const memory = {}


const isEquals = (key,value) => it => String(it[key]) === String(value);
const isDifferent = (key,value) => it => String(it[key]) !== String(value);

const collection = (collName) => {
  if (!memory[collName])
    memory[collName] = []

  const ops = {
    find(query, callback) {
      let key = Object.keys(query)[0]

      if (query[key])
        return memory[collName].filter(isEquals(key, query[key]))

      return memory[collName]
    },
    findOne(query) {
      let key = Object.keys(query)[0]
      return memory[collName].find(isEquals(key, query[key]))
    },
    insert(data) {
      if(ops.findOne({ sku: data.sku }))
        throw new Error('conflict')

      memory[collName].push(data)
      return data
    },
    update(query, data) {
      if(!ops.findOne(query))
        throw new Error('not found')

      ops.remove(query)
      return ops.insert({ ...data, ...query })
    },
    upsert(data) {
      ops.remove({ sku: data.sku })
      return ops.insert({ ...data })
    },
    patch(query, data) {
      let found = ops.findOne(query)
      return ops.update(query, { ...found, ...data, ...query })
    },
    remove(query) {
      let key = Object.keys(query)[0]
      memory[collName] = memory[collName].filter(isDifferent(key, query[key]))
      return null
    }
  }
  return ops
}

const db = {
  collection: collection
}




module.exports = db
