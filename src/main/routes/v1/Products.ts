import { Router } from 'express';

import createProductController from '../../../use-cases/product/create-product';
import deleteProductController from '../../../use-cases/product/delete-product';
import getAllProductsController from '../../../use-cases/product/get-all-products';
import getProductController from '../../../use-cases/product/get-product';
import updateProductController from '../../../use-cases/product/update-product';

import { ExpressRouteAdapter } from '../../adapters';

const router = Router();

router.route('/')

  /**
   * @swagger
   * /v1/product:
   *   get:
   *     tags:
   *      - Product
   *     operationId: getAll
   *     security: []
   *     summary: Get a products list
   *     responses:
   *       200:
   *         description: Success
   *       500:
   *         description: Internal server error
   */
  .get(ExpressRouteAdapter(getAllProductsController))

  /**
   * @swagger
   * /v1/product:
   *   post:
   *     tags:
   *      - Product
   *     operationId: create
   *     summary: Create a new product
   *     requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            required:
   *              - sku
   *              - name
   *              - inventory
   *            properties:
   *              sku:
   *                type: string
   *              name:
   *                type: string
   *              inventory:
   *                type: Inventory
   *            example:
   *              {
   *                "sku": 43264,
   *                "name": "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
   *                "inventory": {
   *                    "warehouses": [
   *                        {
   *                            "locality": "SP",
   *                            "quantity": 12,
   *                            "type": "ECOMMERCE"
   *                        },
   *                        {
   *                            "locality": "MOEMA",
   *                            "quantity": 3,
   *                            "type": "PHYSICAL_STORE"
   *                        }
   *                    ]
   *                }
   *             }
   *     responses:
   *       201:
   *         description: Product created successfully
   *       400:
   *         description: Validation error
   *       406:
   *         description: Schema validation error
   *       500:
   *         description: Internal server error
   */
  .post(ExpressRouteAdapter(createProductController));

router.route('/:sku')

  /**
   * @swagger
   * /v1/product/{sku}:
   *   get:
   *     tags:
   *      - Product
   *     operationId: get
   *     summary: Get a product
   *     parameters:
   *       - in: path
   *         name: sku
   *         example: 43264
   *         required: true
   *     responses:
   *       200:
   *         description: Success
   *       404:
   *         description: Product not found
   *       500:
   *         description: Internal server error
   */
  .get(ExpressRouteAdapter(getProductController))

  /**
   * @swagger
   * /v1/product/{sku}:
   *   put:
   *     tags:
   *      - Product
   *     operationId: update
   *     summary: Update a product
   *     parameters:
   *       - in: path
   *         name: sku
   *         example: 43264
   *         schema:
   *           type: string
   *         required: true
   *     requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            required:
   *              - sku
   *              - name
   *              - inventory
   *            properties:
   *              sku:
   *                type: string
   *              name:
   *                type: string
   *              inventory:
   *                type: Inventory
   *            example:
   *              {
   *                "sku": 43264,
   *                "name": "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
   *                "inventory": {
   *                    "warehouses": [
   *                        {
   *                            "locality": "SP",
   *                            "quantity": 10,
   *                            "type": "ECOMMERCE"
   *                        },
   *                    ]
   *                }
   *             }
   *     responses:
   *       200:
   *         description: Product updated successfully
   *       404:
   *         description: Product not found
   *       406:
   *         description: Schema validation error
   *       500:
   *         description: Internal server error
   */
  .put(ExpressRouteAdapter(updateProductController))

  /**
  * @swagger
  * /v1/product/{sku}:
  *   delete:
  *     tags:
  *      - Product
  *     operationId: delete
  *     summary: Delete a product
  *     parameters:
  *       - in: path
  *         name: sku
  *         example: 43264
  *         required: true
  *     responses:
  *       200:
  *         description: Product removed successfully
  *       404:
  *         description: Product not found
  *       500:
  *         description: Internal server error
  */
  .delete(ExpressRouteAdapter(deleteProductController));

export default router;
