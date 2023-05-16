import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async getBySku() {
    console.log('getBySku');
  }

  async create(): Promise<void> {
    console.log('create');
  }

  async update() {
    console.log('update');
  }

  async delete(): Promise<void> {
    console.log('delete');
  }
}
