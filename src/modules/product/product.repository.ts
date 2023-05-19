import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findBySku(sku: number): Promise<Product> {
    return this.productModel.findOne({ sku }).exec();
  }

  async create(product: Product): Promise<Product> {
    const newProduct = new this.productModel(product);
    return newProduct.save();
  }

  async update(id: string, product: Partial<Product>): Promise<Product> {
    return this.productModel.findOneAndUpdate({ _id: id }, product, {
      new: true,
    });
  }

  async delete(sku: number): Promise<void> {
    await this.productModel.deleteOne({ sku });
  }
}
