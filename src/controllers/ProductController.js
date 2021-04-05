import Controller from "./Controller"
import ProductsRepository from "../repository/ProductsRepository"
import ProductEntity from "../entities/ProductEntity"


class ProductController extends Controller {
  constructor() {
    super()
    this.entity = ProductEntity
    this.repository = new ProductsRepository()
  }
}

export default ProductController
