import { Router } from 'express';
import productRoutes from "src/drivers/web/routes/products";

const router = Router();
router.use("/products", productRoutes);

export default router;
