import Warehouse from './Warehouse';

type Inventory = {
  quantity?: number
  warehouses: Warehouse[]
}

/**
 * @swagger
 *  components:
 *    schemas:
 *      Inventory:
 *        type: object
 *        required:
 *          - warehouses
 *        properties:
 *          quantity:
 *            description: Total quantity of products in all warehouses
 *            type: number
 *          warehouses:
 *            type: Warehouse
 */

export default Inventory;
