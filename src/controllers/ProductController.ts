import { Request, Response } from 'express';
import { Product } from "../models/Product";
import { ProductRepositoryInMemory } from "../repository/ProductRepositoryInMemory";
import { ProductService } from "../services/ProductService";

export default class ProductController {

  private productService: ProductService;

  constructor() {
    const repository = new ProductRepositoryInMemory();
    this.productService = new ProductService(repository);

    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.get = this.get.bind(this)
    this.delete = this.delete.bind(this)
  }

  public async create(
    request: Request<{}, {}, Omit<Product, "inventory.quantity" | "isMarketable">, {}>,
    response: Response
  ): Promise<void> {
    const body = request.body;
    try {
      const newProduct = await this.productService.create(body);
      response.status(201).send(newProduct);
    } catch (err) {
      response.status(400).send({ error: err.message });
    }
  }

  public async update(
    request: Request<{ sku: number }, {}, Omit<Product, "inventory.quantity" | "isMarketable">, {}>,
    response: Response
  ): Promise<void> {
    const { sku } = request.params;
    const body = request.body;

    try {
      const product = await this.productService.update(sku, body);
      response.status(200).send(product);
    } catch (err) {
      response.status(400).send({ error: err.message });
    }
  }

  public async get(
    request: Request<{ sku: number }, {}, {}, {}>,
    response: Response
  ): Promise<void> {
    try {
      const { sku } = request.params;
      const product = await this.productService.get(sku);
      response.status(200).send(product);
    } catch (err) {
      response.status(400).send({ error: err.message });
    }
  }

  public async delete(
    request: Request<{ sku: number }, {}, {}, {}>,
    response: Response
  ): Promise<void> {
    const { sku } = request.params;

    try {
      await this.productService.delete(sku);
      response.status(200).send();
    } catch (err) {
      response.status(400).send({ error: err.message });
    }
  }
}
