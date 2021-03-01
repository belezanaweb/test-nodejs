import { Request, Response } from 'express'

import Product from '../models/product'

class ProductsController {
  public async get (req: Request, res: Response): Promise<Response> {
    const sku: number = parseInt(req.params.sku)

    try {
      const product = await Product.findOne({ sku })

      if (!product) {
        return res.status(400).json({ error: 'No products found' })
      }

      return res.json(product)
    } catch (err) {
      return res.status(400).json({ error: 'There was an error processing this information' })
    }
  }

  public async set (req: Request, res: Response): Promise<Response> {
    const sku: number = parseInt(req.params.sku)
    const { name, inventory } = req.body

    const product = await Product.findOne({ sku })

    if (!product) {
      return res.status(400).json({ error: 'No products found' })
    }

    let allQuantity = 0

    // eslint-disable-next-line array-callback-return
    inventory.warehouses.map((data: {quantity: number}) => {
      allQuantity += data.quantity
    })

    let isMarketable

    if (inventory.warehouses.length > 0) {
      isMarketable = true
    } else {
      isMarketable = false
    }

    product.overwrite({
      sku,
      name,
      inventory: {
        quantity: allQuantity,
        warehouses: inventory.warehouses
      },
      isMarketable
    })

    product.save()

    return res.json(product)
  }

  public async add (req: Request, res: Response): Promise<Response> {
    const { sku, name, inventory } = req.body

    const product = await Product.findOne({ sku })

    if (product) {
      let allQuantity = 0
      const warehouses: Array<Object> = []
      // eslint-disable-next-line array-callback-return
      inventory.warehouses.map((data: {quantity: number}) => {
        allQuantity += data.quantity

        warehouses.push(data)
      })

      let isMarketable

      if (inventory.warehouses.length > 0) {
        isMarketable = true
      } else {
        isMarketable = false
      }

      product.overwrite({
        sku,
        name,
        inventory: {
          quantity: allQuantity,
          warehouses: inventory.warehouses
        },
        isMarketable
      })

      product.save()

      return res.json(product)
    }

    let allQuantity = 0
    const warehouses: Array<Object> = []
    // eslint-disable-next-line array-callback-return
    inventory.warehouses.map((data: {quantity: number}) => {
      allQuantity += data.quantity

      warehouses.push(data)
    })

    let isMarketable

    if (inventory.warehouses.length > 0) {
      isMarketable = true
    } else {
      isMarketable = false
    }

    try {
      const product = await Product.create({
        sku,
        name,
        inventory: {
          quantity: allQuantity,
          warehouses: inventory.warehouses
        },
        isMarketable
      })

      return res.json(product)
    } catch (err) {
      console.log(err)

      return res.send(400).json(err)
    }
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    const sku: number = parseInt(req.params.sku)

    const product = await Product.findOne({ sku })

    if (!product) {
      return res.status(400).json({ error: 'No products found' })
    }

    product.deleteOne()

    return res.json({ message: 'Product deleted' })
  }
}

export default new ProductsController()
