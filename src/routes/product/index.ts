import { Router } from 'express'
import ProductController from './../../controllers/products'
const router = Router()


router.get('/', async (_req, res) => {
  const result = await new ProductController().index();
  res.status(200).json(result)
})

router.post('/', async (req, res) => {
  const result = await new ProductController().save(req.body);
  if(result){
      res.status(201).json(result)
  } else {
      res.status(409).json({
          message: 'Not created. Product already exists',
      })
  }

})

router.get('/:sku', async (req, res) => {
  const result = await new ProductController().find(req.params.sku);
  if(result) {
      res.status(200).json(result)
  } else {
      res.status(404).json({
        status: false, message: 'sku not found'
      })
  }

})

router.put('/:sku', async (req, res) => {
  const result = await new ProductController().update(req.params.sku, req.body);
  if(result){
      res.status(201).json(result)
  } else {
      res.status(404).json({
          message: 'Not found.',
      })
  }
})

router.delete('/:sku', async (req, res) => {
  const result = await new ProductController().delete(req.params.sku);
  if(result) {
    res.status(200).json({
      status: true, message: 'Product deleted'
    })
  } else {
      res.status(404).json({
        status: false, message: 'sku not found'
      })
  }
})
router.patch('/:sku', async (_req, res) => {
  res.status(405).send()
})

export default router
