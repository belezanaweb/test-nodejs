import { IResponseCustom } from "../../../utils/interfaces/iresponse-custom.interface";
import { ProductDeleteApp } from "./product-delete.app";

export class ProductDeleteController {
  constructor(private readonly productDeleteApp: ProductDeleteApp) { }

  /**
   * Handle
   * @param sku
   * @returns
   */
   async handle(sku: number): Promise<IResponseCustom> {
    await this.productDeleteApp.execute(sku);
    return {
      code: 200,
      message: 'Produto deletado com sucesso'
    }
  }
}
