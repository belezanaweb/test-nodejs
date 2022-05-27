import Product from '../models/product';
import { transformProduct } from '../utils/transformer-product';
import { Request,RequestUpdate } from '../interfaces/global.interfaces';

class ProductsRepository {
    private products: Product[];
  
    constructor() {
      this.products = [];
    }
  
    public create({ sku, name, inventory}: Request): Product {
      const found = this.products.find( product => product.sku == sku);

      if( found instanceof Product ) throw new Error('A product with this SKU already exists');

      const productTransformer = transformProduct({sku, name, inventory})
      const product = new Product(productTransformer);
      this.products.push(product); 
      return product;
    }

    public update( sku: number, { name, inventory }: RequestUpdate): Product {
      const index = this.products.findIndex( product => product.sku == sku);

      if( index == -1 ) throw new Error('Product not found');

      this.products[index].inventory = inventory;
      this.products[index].name = name;

      transformProduct(this.products[index]);
      return this.products[index];
    }

    public get(sku: number): Product {
      const product = this.products.find( product => product.sku == sku);
      if( typeof product === 'undefined' ) throw new Error('Product not found');
      return product;
    }
    
    public delete(sku: number) {
      const index = this.products.findIndex( product => product.sku == sku);
      if( index == -1 ) throw new Error('Product not found');
      this.products.splice(index,1);
      return;
    }
  }
  
  export default ProductsRepository;
  