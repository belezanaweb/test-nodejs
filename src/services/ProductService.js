import ProductController from "../controllers/ProductController"
import { NotFoundInDatabaseError, AlreadyExistingInDatabaseError } from '../exceptions/RepositoryExceptions'
import HttpStatus from "http-status"


export const list = async (req, res) => {
  try {
    const controller = new ProductController()
    const result = await controller.list()
    return res.status(HttpStatus.OK).json(result)

  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}

export const find = async (req, res) => {
  try {
    const { sku } = req.params

    const controller = new ProductController()
    const result = await controller.find(parseInt(sku))
    return res.status(HttpStatus.OK).json(result)
   
  } catch (error) {
    if (error instanceof NotFoundInDatabaseError) {
      return res.status(HttpStatus.NOT_FOUND)
        .json({ message: error.message })  
    }

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}

export const create = async (req, res) => {
  try {
    const data = req.body
    // console.log(data)
    const controller = new ProductController()

    const result = await controller.create(data)

    res.status(HttpStatus.OK).json(result)
  } catch (error) {
    if (error instanceof AlreadyExistingInDatabaseError) {
      return res.status(HttpStatus.CONFLICT)
        .json({ message: error.message })  
    }

    res.status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }

}

export const update = async (req, res) => {
  try {
    const { sku } = req.params
    const data = req.body

    const controller = new ProductController()
    const result = await controller.update(parseInt(sku), data)

    res.status(HttpStatus.NO_CONTENT).json(result)
  } catch (error) {
    if (error instanceof NotFoundInDatabaseError) {
      return res.status(HttpStatus.NOT_FOUND)
        .json({ message: error.message })  
    }
    
    res.status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}

export const destroy = async (req, res) => {
  try {
    const { sku } = req.params

    const controller = new ProductController()
    const result = await controller.destroy(parseInt(sku))
    res.status(HttpStatus.NO_CONTENT).json(result)
  } catch (error) {
    if (error instanceof NotFoundInDatabaseError) {
      return res.status(HttpStatus.NOT_FOUND)
        .json({ message: error.message })  
    }

    res.status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}