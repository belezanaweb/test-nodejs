import { Router } from "express";
import healthRoutes from "./health";
import productRoutes from "./product";

const routes: Router = Router();

routes.use("/health", healthRoutes);
routes.use("/products", productRoutes);

export { routes };
