import { Request, Response } from "express";
import { DB } from "../index";
import { InvalidInputError } from "../errors/InvalidInputError";
import { NotFoundError } from "../errors/NotFoundError";

export class ProductController {

    public async createProduct(req: Request, res: Response) {
        try {
            const {
                sku,
                name,
                inventory,
                isMarketable
            } = req.body

            if (
                !name ||
                !inventory ||
                !sku
            ) {
                throw new InvalidInputError("Parâmetros inválidos")
            }
            DB.products.push({
                sku,
                name,
                inventory,
                isMarketable
            })
            
            res.status(201).send({
                message: "Produto criado com sucesso!"
            })
        }
        catch (err) {
            res.status(err.statusCode || 400).send({
                message: err.message
            });
        }
    }
    public async getAllProducts(req: Request, res: Response) {
        try {
            res.json(DB.products)
            res.status(200).send()
        }
        catch (err) {
            res.status(err.statusCode || 400).send({
                message: err.message
            });
        }
    }
    public async getProductBySku(req: Request, res: Response) {
        try {
            const sku = parseInt(req.params.sku)
            const product = DB.products.find(prod => prod.sku === sku)

            const quantityWarehouses = product.inventory.warehouses.reduce((acc, prod) => {
                if (acc.quantity) {
                    return acc.quantity + prod.quantity;
                }
                return quantityWarehouses
            })
            
            if(quantityWarehouses > 0){
                product.isMarketable = true;
            }
            if (!product) {
                throw new NotFoundError("Produto não encontrado")
            }

            res.status(200).send({
                product,
                quantityWarehouses
            })
        }
        catch (err) {
            res.status(err.statusCode || 404).send({
                message: err.message
            });
        }
    }
    public async updateProduct(req: Request, res: Response) {
        try {
            const skuDB = parseInt(req.params.sku)
            const product = DB.products.find(prod => prod.sku === skuDB)

            const {
                sku,
                name,
                inventory,
                isMarketable
            } = req.body


            if (sku != undefined) {
                product.sku = sku;
            }
            if (name != undefined) {
                product.name = name;
            }
            if (inventory != undefined) {
                product.inventory = inventory;
            }


            res.status(200).send({
                message: "Produto atualizado!"
            })
        }
        catch (err) {
            res.status(err.statusCode || 400).send({
                message: err.message
            });
        }
    }
    public async deleteProduct(req: Request, res: Response) {
        try {
            const sku = parseInt(req.params.sku)
            const index = DB.products.findIndex(prod => prod.sku === sku)

            if (index === -1) {
                throw new NotFoundError("Produto não encontrado")
            } else {
                DB.products.splice(index, 1)
            }

            res.status(200).send({
                message: "Produto excluído!"
            })
        }
        catch (err) {
            res.status(err.statusCode || 404).send({
                message: err.message
            });
        }
    }
}