const memory = {}

const collection = (collName) => {
  if (!memory[collName])
    memory[collName] = []

  return {
    find(query, callback) {
      return memory[collName].filter(() => true)
    },
    findOne(query) {
      return memory[collName].find(() => true)
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
