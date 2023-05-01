import GetOneProductController from "../../../application/v1/controller/GetOneProductController";
import { IProductService } from "../../../service/ProductService";


export default class GetOneProductControllerFactory {
  private static getOneProductController: GetOneProductController;
  static async make(productService: IProductService): Promise<GetOneProductController> {
    if (this.getOneProductController) {
      return this.getOneProductController;
    }

    this.getOneProductController = new GetOneProductController(productService);
    return this.getOneProductController;
  }
}
