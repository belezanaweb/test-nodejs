import { Inventory, Product, ProductsInputDTO } from "./entities/Product";
import { CustomError } from "./error/CustomError";

const productJson = require("../data/product.json");

export class ProductBusiness {
  constructor(private productDataBase: typeof productJson) {}

  public createProduct = async (input: ProductsInputDTO, inventory: Inventory): Promise<void> => {
    try {
      if (!input.sku || !input.name || !input.inventory) {
        throw new CustomError(422, "Please fill in all the fields.");
      }
      if (input.sku === productJson.sku) {
        throw new CustomError(422, "Deu ruim rapá");
      }

       const newProduct: Product = new Product(
        input.sku,
        input.name,
        input.inventory,      
      );

      this.productDataBase.createProduct(newProduct);
    } catch (error) {
        throw new CustomError(error.statusCode, error.message);
    }
  };
}
