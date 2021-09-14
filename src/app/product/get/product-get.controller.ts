import { IResponseCustom } from "../../../utils/interfaces/iresponse-custom.interface";
import { ProductGetAPP } from "./product-get.app";

export class ProductGetController {
  constructor(private readonly productGetAPP: ProductGetAPP) { }

  /**
   * Handle
   * @returns
   */
   async handle(): Promise<IResponseCustom> {
    const response = await this.productGetAPP.execute();
    return {
      code: 200,
      data: response
    }
  }
}
