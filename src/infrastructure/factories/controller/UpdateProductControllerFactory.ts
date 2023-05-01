import UpdateProductController from "../../../application/v1/controller/UpdateProductController";
import { IProductService } from "../../../service/ProductService";


export default class UpdateProductControllerFactory {
  private static updateProductController: UpdateProductController;
  static async make(productService: IProductService): Promise<UpdateProductController> {
    if (this.updateProductController) {
      return this.updateProductController;
    }

    this.updateProductController = new UpdateProductController(productService);
    return this.updateProductController;
  }
}
