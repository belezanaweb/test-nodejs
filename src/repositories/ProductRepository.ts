const cache = require('memory-cache');

class ProductRepository {

  private memoryCache;

  constructor(cache){
    this.memoryCache = cache;
  }

  public create(Product: object, sku: number) {
    this.memoryCache.put(sku, Product);
  }

  public getBySku(sku: number) {
    return this.memoryCache.get(sku);
  }

  public update(sku: number, Product: object) {
    this.memoryCache.put(sku, Product);
  }

  public delete(sku: number) {
    this.memoryCache.del(sku);
  }
}

export default new ProductRepository(cache);