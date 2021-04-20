import { Router } from 'express';

import ProductsRoutes from '@apps/Products/routes';

const route = Router();

route.use('/products', ProductsRoutes);

export default route;
