import "reflect-metadata";
import { generate } from "../../helpers/generate-uuid";
import {
  Product,
  ProductCreateData,
  ProductData,
  ProductsRepository,
} from "../products-repository";
import { verifyProductExist } from "./helpers/verify-product-exist";
import { singleton, container } from "tsyringe";

@singleton()
class LocalProductsRepository implements ProductsRepository {
  private readonly products: ProductData[] = [];

  create({ name, sku, inventory }: ProductCreateData): any {
    const existSameProduct = verifyProductExist({
      products: this.products,
      sku,
    });

    if (!existSameProduct) {
      this.products.push({
        name,
        sku,
        inventory,
        id: generate(),
      });
      return;
    }

    throw new Error("Esse produto já está cadastrado");
  }

  recover(skuParam: number): ProductData | undefined {
    return this.products.find(({ sku }) => sku === skuParam);
  }

  delete(skuParam: number): void {
    const productsClone = this.products;
    const productIndex = productsClone.findIndex(({ sku }) => sku === skuParam);
    productsClone.splice(productIndex, 1);
  }

  update({ sku, name, inventory }: Product): ProductData {
    const productsClone = this.products;
    const productIndex = productsClone.findIndex(
      (product) => product.sku === sku
    );
    Object.assign(productsClone[productIndex], { sku, name, inventory });
    return productsClone[productIndex];
  }
}

const LocalProductsRepositoryContainer = container.resolve(
  LocalProductsRepository
);

export { LocalProductsRepositoryContainer };
