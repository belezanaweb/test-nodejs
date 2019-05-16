/**
 * @swagger
 * definitions:
 *   Product:
 *     type: object
 *     required:
 *       - sku
 *       - name
 *     properties:
 *       sku:
 *         type: number
 *       name:
 *         type: string
 *       isMarketable:
 *         type: boolean
 *       inventory:
 *         type: object
 *         properties:
 *           quantity: 
 *             type: number
 *           warehouses:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 locality:
 *                   type: string
 *                 quantity:
 *                   type: number
 *                 type:
 *                   type: string
 *                   enum: [ECOMMERCE, PHYSICAL_STORE]
 */


/**
 * @swagger
 * /api/product/{sku}:
 *   get:
 *     summary: Read a single resource, by sku
 *     tags:
 *       - Product
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: sku
 *         description: sku
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: '#/definitions/Product'
 *       404:
 *         description: Not found
 */

 /**
 * @swagger
 * /api/product:
 *   post:
 *     summary: Create a single resource
 *     tags:
 *       - Product
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Create a single resource
 *         schema:
 *           $ref: '#/definitions/Product'
 *     responses:
 *       201:
 *         description: OK
 *         schema:
 *           $ref: '#/definitions/Product'
 *       400:
 *         description: Bad Request
 *         schema:
 *           $ref: '#/definitions/Error'
 */

 /**
 * @swagger
 * /api/product/{sku}:
 *   put:
 *     summary: Update a single resource, by sku
 *     tags:
 *       - Product
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: sku
 *         description: sku
 *         required: true
 *       - in: body
 *         name: body
 *         description: Create a single resource
 *         schema:
 *           $ref: '#/definitions/Product'
 *     responses:
 *       201:
 *         description: OK
 *         schema:
 *           $ref: '#/definitions/Product'
 *       400:
 *         description: Bad Request
 *         schema:
 *           $ref: '#/definitions/Error'
 */

 /**
 * @swagger
 * /api/product/{sku}:
 *   delete:
 *     summary: Delete a single resource, by sku
 *     tags:
 *       - Product
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: sku
 *         description: sku
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 *         schema:
 *           $ref: '#/definitions/Error'
 *       404:
 *         description: Not found
 */