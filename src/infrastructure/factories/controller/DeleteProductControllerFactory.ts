import DeleteProductController from "../../../application/v1/controller/DeleteProductController";
import { IProductService } from "../../../service/ProductService";


export default class DeleteProductControllerFactory {
  private static deleteProductController: DeleteProductController;
  static async make(productService: IProductService): Promise<DeleteProductController> {
    if (this.deleteProductController) {
      return this.deleteProductController;
    }

    this.deleteProductController = new DeleteProductController(productService);
    return this.deleteProductController;
  }
}
