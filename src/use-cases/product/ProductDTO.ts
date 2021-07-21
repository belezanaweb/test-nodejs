import Warehouse from '../../domain/entities/Warehouse';

type ProductDTO = {
  sku: number
  name: string
  inventory: {
    warehouses: Warehouse[]
  }
}

export default ProductDTO;
