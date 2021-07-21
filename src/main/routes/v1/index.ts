import { Router } from 'express';

import Products from './Products';

const router = Router();

router.use('/product', Products);

export default router;
