import { Request, Response } from "express";

import Products from "./Products.entity";
import ProductsRepository from "./Products.repository";
import { ProductsService } from "./Products.service";

const productsRepository = new ProductsRepository();

class ProductsController {
  get(request: Request, response: Response): Response {
    const productsService = new ProductsService(productsRepository);
    return response.status(200).json(productsService.get());
  }

  getOne(request: Request, response: Response): Response {
    const productsService = new ProductsService(productsRepository);
    return response
      .status(200)
      .json(productsService.findOne(request.params.id));
  }

  create(request: Request<{}, {}, Products>, response: Response): Response {
    const productsService = new ProductsService(productsRepository);
    const product = productsService.create(request.body);

    return response.status(201).json(product);
  }

  put(
    request: Request<{ id: string }, {}, Products>,
    response: Response
  ): Response {
    const productsService = new ProductsService(productsRepository);
    const product = productsService.update(request.params.id, request.body);

    return response.status(200).json(product);
  }

  delete(request: Request, response: Response): Response {
    const productsService = new ProductsService(productsRepository);
    const product = productsService.delete(request.params.id);

    return response.status(204).json(product);
  }
}

export { ProductsController };
