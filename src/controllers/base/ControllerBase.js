export default class ControllerBase {
  constructor() {
    this.entityClass = null
    this.repository = null
  }

  async list() {
    const items = await this.repository.find()
   
    const result = items.map((item, index) => {
      const e = new this.entityClass(item)
      return e.toJson()
    })
    return result
  }

  async find(id) {
    const data = await this.repository.find(id)
    return new this.entityClass(data).toJson()
  }

  async create(data) {
    const entity = new this.entityClass(data)
    const result = await this.repository.create(entity)
    return result
  }

  async update(id, data) {
    const entity = new this.entityClass(data)
    const result = await this.repository.update(id, entity)
    return result
  }

  async destroy(id) {
    const result = await this.repository.destroy(id)
    return result
  }
}
