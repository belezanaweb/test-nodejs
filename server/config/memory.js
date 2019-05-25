const debug = require('debug')('wbruno:config:memory')
const memory = {}

const collection = (collName) => {
  if (!memory[collName])
    memory[collName] = []

  return {
    find(query, callback) {
      let key = Object.keys(query)[0]

      if (query[key])
        return memory[collName].filter(it => it[key] == query[key])

      return memory[collName]
    },
    findOne(query) {
      let key = Object.keys(query)[0]
      return memory[collName].find(it => it[key] == query[key])
    },
    insert(data) {
      memory[collName].push(data)
      return data
    },
    update(query, data) {
      memory[collName].push(data)
      return { ...query, ...data }
    },
    remove(query) {
      return memory[collName].filter(() => !true)
    }
  }
}

const db = {
  collection: collection
}




module.exports = db
