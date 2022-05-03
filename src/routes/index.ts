import { Router } from 'express'

const router = Router()

router.get('/', function(_req, res, _next) {
  res.json('<p>Hello :)</p>');
});

export default router
