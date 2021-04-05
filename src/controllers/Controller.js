class Controller {
  constructor() {
    this.entity = {}
    this.repository = {}
  }

  async find() {
    const result = await this.repository.find()
    result.forEach((item, idx) => {
      const data = new this.entity(item)
      result[idx] = data.toJson()
    })
    return result
  }

  async findOne(id) {
    const data = await this.repository.find(id)
    const result = new this.entity(data).toJson()
    return result
  }

  async create(data) {
    const entity = new this.entity(data)
    const result = await this.repository.create(entity)
    return result
  }

  async update(id, data) {
    const entity = new this.entity(data)
    const result = await this.repository.update(id, entity)
    return result
  }

  async destroy(id) {
    const result = await this.repository.destroy(id)
    return result
  }
}

export default Controller
