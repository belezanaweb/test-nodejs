import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { sku } = createProductDto;
    const product = await this.productModel.findOne({ sku: +sku });

    if (product) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Product already exists',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  async findOne(sku: number) {
    const product = await this.productModel.findOne({ sku }).exec();

    if (!product) {
      throw new NotFoundException('Product not found!');
    }

    product.inventory.quantity = product.inventory.warehouses.reduce(
      (acc, warehouse) => {
        return (acc += warehouse.quantity);
      },
      0,
    );

    product.isMarketable = product.inventory.quantity > 0;

    return product;
  }

  async update(sku: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(sku);
    delete product.isMarketable;
    delete product.inventory.quantity;

    const updated = Object.assign(product, updateProductDto);
    return await updated.save();
  }

  async remove(sku: number) {
    const product = await this.findOne(sku);

    product.delete();
  }
}
