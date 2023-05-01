import CreateProductController from "../../../application/v1/controller/CreateProductController";
import { IProductService } from "../../../service/ProductService";


export default class CreateProductControllerFactory {
  private static createProductController: CreateProductController;
  static async make(productService: IProductService): Promise<CreateProductController> {
    if (this.createProductController) {
      return this.createProductController;
    }

    this.createProductController = new CreateProductController(productService);
    return this.createProductController;
  }
}
