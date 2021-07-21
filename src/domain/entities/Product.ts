import Inventory from './Inventory';

type Product = {
  sku: number
  inventory: Inventory
  isMarketable?: boolean
  name: string
}

/**
 * @swagger
 *  components:
 *    schemas:
 *      Product:
 *        type: object
 *        required:
 *          - sku
 *          - name
 *          - inventory
 *        properties:
 *          sku:
 *            description: The SKU identification
 *            type: number
 *          inventory:
 *            type: Inventory
 *          isMarketable:
 *            description: Informs if the product is is marketable
 *            type: boolean
 *          name:
 *            description: The product name
 *            type: string
 */

export default Product;
