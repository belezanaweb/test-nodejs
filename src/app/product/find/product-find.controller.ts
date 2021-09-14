import { IResponseCustom } from "../../../utils/interfaces/iresponse-custom.interface";
import { ProductFindApp } from "./product-find.app";

export class ProductFindController {
  constructor(private readonly productFindApp: ProductFindApp) { }

  /**
   * Handle
   * @param sku
   * @returns
   */
   async handle(sku: number): Promise<IResponseCustom> {
    const response = await this.productFindApp.execute(sku);
    return {
      code: 200,
      data: response
    }
  }
}
