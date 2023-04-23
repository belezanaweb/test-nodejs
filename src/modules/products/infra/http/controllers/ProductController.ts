import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateProductService } from '../../../services/UpdateProductService';
import { DeleteProductService } from '../../../services/DeleteProductService';
import { CreateProductService } from '../../../services/CreateProductService';
import { FindProductService } from '../../../services/FindProductService';

class ProductController {
  public async find(req: Request, resp: Response): Promise<Response> {
    const findProductService = container.resolve(FindProductService);

    const sku = Number(req.params.sku);
    const data = await findProductService.execute({ sku });
    return resp.status(200).json(data);
  }

  public async create(req: Request, resp: Response): Promise<any> {
    const createProductService = container.resolve(CreateProductService);

    const product = req.body;

    const data = await createProductService.execute({ product });
    return resp.status(200).json(data);
  }

  public async update(req: Request, resp: Response): Promise<any> {
    const updateProductService = container.resolve(UpdateProductService);

    const sku = Number(req.params.sku);
    const product = req.body;

    const data = await updateProductService.execute({ sku, product });
    return resp.status(200).json(data);
  }

  public async delete(req: Request, resp: Response): Promise<any> {
    const deleteProductService = container.resolve(DeleteProductService);

    const sku = Number(req.params.sku);
    const data = await deleteProductService.execute(sku);
    return resp.status(200).json(data);
  }
}

export default new ProductController();
