import { IResponseCustom } from "../../../utils/interfaces/iresponse-custom.interface";
import { IProductUpdateDTO } from "./iproduct-update-dto.interface";
import { ProductUpdateApp } from "./product-update.app";

export class ProductUpdateController {

  constructor(private readonly productUpdateApp: ProductUpdateApp) { }

  /**
   * Handle
   * @param sku
   * @param productUpdateDTO
   * @returns
   */
  async handle(sku: number, productUpdateDTO: IProductUpdateDTO): Promise<IResponseCustom> {
    await this.productUpdateApp.execute(sku, productUpdateDTO);
    return {
      code: 200,
      message: 'Produto Atualizado!'
    }
  }
}
