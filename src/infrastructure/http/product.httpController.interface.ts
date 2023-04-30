import { Request, Response } from 'express';

interface IProductHttpController {
  createProduct(req: Request, res: Response): Response;
  updateProduct(req: Request, res: Response): Response;
  getProduct(req: Request, res: Response): Response;
  deleteProduct(req: Request, res: Response): Response;
}

export default IProductHttpController;
