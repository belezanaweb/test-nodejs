import { Router } from "express";
import healthRoutes from './health';

const routes: Router = Router();

routes.use('/health', healthRoutes);

export { routes };
