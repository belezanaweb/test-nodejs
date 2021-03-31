import { Product } from './product.entity';
import { products } from './product.data';
import CreateProductDto from './dto/create.product.dto';
import UpdateProductDto from './dto/update.product.dto';

export class ProductRepository extends Product {
  find() {
    return products;
  }
  findOne(sku: number): Product {
    return products.find((product) => product.sku === sku);
  }
  save(createProductDto: CreateProductDto): Product {
    products.push(createProductDto);
    return createProductDto;
  }
  update(sku: number, updateProductDto: UpdateProductDto): Product {
    const index = products.findIndex((product) => product.sku === sku);
    products.splice(index, 1, updateProductDto);
    return updateProductDto;
  }
  delete(sku: number): void {
    const index = products.findIndex((product) => product.sku === sku);
    products.splice(index, 1);
  }
}
