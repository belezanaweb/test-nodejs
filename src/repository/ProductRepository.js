import RepositoryBase from './base/RepositoryBase'
import productDatabase from '../../database/database'

export default class ProductRepository extends RepositoryBase {
  constructor () {
    super({
      database: productDatabase,
      propId: 'sku'
    });
  }

}