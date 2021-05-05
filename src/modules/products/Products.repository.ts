import Products from "./Products.entity";

class ProductsRepository {
  private products: Products[];

  constructor() {
    this.products = [];
  }

  public all(): Products[] {
    return this.products;
  }

  public findOne(sku: string): Products {
    return this.products.find((product) => product.sku === sku);
  }

  public create(product: Products): Products {
    this.products.push(product);

    return product;
  }

  public update(sku: string, product: Products): Products {
    this.products = this.products.map((prod) =>
      prod.sku === sku ? prod : product
    );

    return product;
  }

  public delete(sku: string): boolean {
    this.products = this.products.filter((prod) => prod.sku !== sku);
    return true; // defined as true because in this case we have no interference from any ORM that could return us any false case
  }
}

export default ProductsRepository;
