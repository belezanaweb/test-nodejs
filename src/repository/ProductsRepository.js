import BaseRepository from './base/BaseRepository'
import { join } from 'path'

const productsDatabase = join(__dirname, './../../database', 'products.json')

class ProductsRepository extends BaseRepository {
  constructor() {
    super({ file: productsDatabase })
  }

  find(itemId) {
    return super.find(itemId, 'sku')
  }

  create(data) {
    return super.create(data, 'sku')
  }

  update(itemId, data) {
    return super.update(itemId, data, 'sku')
  }

  destroy(itemId) {
    return super.destroy(itemId, 'sku')
  }
}

export default ProductsRepository
