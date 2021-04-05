import Controller from "./Controller"
import ProductRepository from "../repository/ProductRepository"
import ProductEntity from "../entities/ProductEntity"


class ProductController extends Controller {
  constructor() {
    super()
    this.entity = ProductEntity
    this.repository = new ProductRepository()
  }
}

export default ProductController
