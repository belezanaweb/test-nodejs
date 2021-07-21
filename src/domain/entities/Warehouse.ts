type Warehouse = {
  locality: string
  quantity: number
  type: string
}

/**
 * @swagger
 *  components:
 *    schemas:
 *      Warehouse:
 *        type: object
 *        required:
 *          - locality
 *          - quantity
 *          - type
 *        properties:
 *          locality:
 *            description: The warehouse locality
 *            type: string
 *          quantity:
 *            description: The quantity of products in this warehouse
 *            type: number
 *          type:
 *            description: The type of warehouse
 *            type: string
 */

export default Warehouse;
