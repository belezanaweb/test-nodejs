import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findBySku(sku: number): Promise<Product> {
    return this.productModel.findOne({ sku }).exec();
  }

  async create(product: Product): Promise<void> {
    const newProduct = new this.productModel(product);

    await newProduct.save();
  }

  async update() {
    console.log('update');
  }

  async delete(): Promise<void> {
    console.log('delete');
  }
}
