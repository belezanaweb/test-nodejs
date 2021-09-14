import { IResponseCustom } from "../../../utils/interfaces/iresponse-custom.interface";
import { IProductCreateDTO } from "./iproduct-create-dto.interface";
import { ProductCreateApp } from "./product-create.app";

export class ProductCreateController {

  constructor(private readonly productCreateApp: ProductCreateApp) { }

  /**
   * Handle
   * @param productCreateDTO
   */
  async handle(productCreateDTO: IProductCreateDTO): Promise<IResponseCustom> {
    await this.productCreateApp.execute(productCreateDTO);
    return {
      code: 200,
      message: 'Produto cadastrado!'
    }
  }
}
