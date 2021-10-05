import ControllerBase from './base/ControllerBase'
import ProductRepository from '../repository/ProductRepository'
import ProductEntity from '../entities/ProductEntity'


export default class ProductController extends ControllerBase {
  constructor() {
    super()
    this.entityClass = ProductEntity
    this.repository = new ProductRepository()
  }
}
