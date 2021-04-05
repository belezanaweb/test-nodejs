import ProductController from "../controllers/ProductController"
import HttpStatus from "http-status"

export const find = async (req, res) => {
  try {
    const { sku } = req.params
    const controller = new ProductController()

    if (sku) {
      const result = await controller.findOne(parseInt(sku))
      return res.status(HttpStatus.OK).json(result)
    }

    const result = await controller.find()
    res.status(HttpStatus.OK).json(result)
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST)
      .json({ message: error.message })
  }
}

export const create = async (req, res) => {
  try {
    const data = req.body
    const controller = new ProductController()

    const result = await controller.create(data)

    res.status(HttpStatus.OK).json(result)
  } catch (error) {
    res.status(HttpStatus.UNPROCESSABLE_ENTITY)
      .json({ message: error.message })
  }

}

export const update = async (req, res) => {
  try {
    const { sku } = req.params
    const data = req.body

    const controller = new ProductController()
    const result = await controller.update(parseInt(sku), data)

    res.status(HttpStatus.OK).json(result)
  } catch (error) {
    res.status(HttpStatus.UNPROCESSABLE_ENTITY)
      .json({ message: error.message })
  }
}

export const destroy = async (req, res) => {
  try {
    const { sku } = req.params

    const controller = new ProductController()
    const result = await controller.destroy(parseInt(sku))
    res.status(HttpStatus.OK).json(result)
  } catch (error) {
    res.status(HttpStatus.UNPROCESSABLE_ENTITY)
      .json({ message: error.message })
  }
}
