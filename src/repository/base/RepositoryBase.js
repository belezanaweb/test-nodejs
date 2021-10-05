import { DbNotDefinedInRepositoryError, NotFoundInDatabaseError, AlreadyExistingInDatabaseError } from '../../exceptions/RepositoryExceptions'
import { cloneDeep } from "lodash"

export default class BaseRepository {
  constructor({ database, propId }) {
    this.database = database
    this.propId = propId
  }

  async find(itemId) {
    if (!this.database) throw new DbNotDefinedInRepositoryError('Database not defined in repository')

    if (!itemId) return cloneDeep(this.database)

    const result = this.database.find(item => item[this.propId] === itemId)
    if (result) return cloneDeep(result)
    
    throw new NotFoundInDatabaseError(`${this.propId} ${itemId} not found in database`);
  }

  async create(data) {
    if (!this.database) throw new DbNotDefinedInRepositoryError('Database not defined in repository')

    const hasItem = this.database.some(item => item[this.propId] === data[this.propId])
    if (!hasItem) {
      const newData = JSON.parse(JSON.stringify(data))
      this.database.push(newData)
      return true
    }

    throw new AlreadyExistingInDatabaseError(`Item already existing in the database`)
  }

  async update(itemId, data) {
    if (!this.database) throw new DbNotDefinedInRepositoryError('Database not defined in repository')

    const dataIndex = this.database.findIndex(item => item[this.propId] === itemId)
    if (dataIndex >= 0) {
      const newData = JSON.parse(JSON.stringify(data))
      newData[this.propId] = itemId
      this.database[dataIndex] = newData
      return true
    }

    throw new NotFoundInDatabaseError(`${this.propId} ${itemId} not found in database`)
  }

  async destroy(itemId) {
    if (!this.database) throw new DbNotDefinedInRepositoryError('Database not defined in repository')
    
    const dataIndex = this.database.findIndex(item => item[this.propId] === itemId)
    if (dataIndex >= 0) {
      this.database.splice(dataIndex, 1)
      return true
    }

    throw new NotFoundInDatabaseError(`${this.propId} ${itemId} not found in database`)
  }
}
