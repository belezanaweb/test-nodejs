import 'dotenv/config';
import { Request, Response, Router } from 'express';
import packagejson from '../../../../../package.json';

const healthRoutes = Router();

healthRoutes.get('/health', (_: Request, res: Response) => {
  const healthStatus: object = {
    health: 'True',
    version: packagejson.version,
  };
  return res.status(200).json(healthStatus);
});

export default healthRoutes;
