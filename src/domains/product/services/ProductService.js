const ProductRepository = require("../repositories/ProductRepository");
const { Conflict, NotFound } = require("../../../utils/errors");

class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  get() {
    return this.productRepository.get();
  }

  getBySku(sku) {
    const product = this.productRepository.getBySku(sku);

    if (!product) throw new NotFound("Product not found");

    const inventoryQuantity = this.calculateInventoryQuantity(product.inventory.warehouses);

    product.inventory.quantity = inventoryQuantity;
    product.isMarketable = this.isMarketable(inventoryQuantity);

    return product;
  }

  create(payload) {
    const product = this.productRepository.getBySku(payload.sku);

    if (product) throw new Conflict("Product already created");

    return this.productRepository.create(payload);
  }

  update(payload) {
    const product = this.productRepository.getBySku(payload.sku);

    if (!product) throw new NotFound("Product not found");

    return this.productRepository.update(payload);
  }

  delete(sku) {
    const product = this.productRepository.getBySku(sku);

    if (!product) throw new NotFound("Product not found");

    return this.productRepository.delete(sku);
  }

  calculateInventoryQuantity(inventories = []) {
    const initialQuantity = 0;

    return inventories.reduce(
      (acumulator, inventory) => acumulator + inventory.quantity,
      initialQuantity
    );
  }

  isMarketable(inventoryQuantity = 0) {
    return inventoryQuantity > 0;
  }
}

module.exports = ProductService;