
interface IWarehouse {
  locality: string,
  quantity: number,
  type: string
}

export interface IProduct {
  sku: number,
  name: string,
  inventory: {
    quantity?: number,
    warehouses: IWarehouse[]
  }
  isMarketable?: boolean
}

export const inMemoryProducts: IProduct[] = [];

class ProductRepository {

  private calculateInventory(product: IProduct) {
    const productWithExtraData = {...product}
    productWithExtraData.inventory.quantity = productWithExtraData.inventory.warehouses.reduce((totalQuantity, prod)=>{
      return prod.quantity + totalQuantity;
    }, 0)
    productWithExtraData.isMarketable =  productWithExtraData.inventory.quantity > 0;
    return productWithExtraData;
  }

  public findAll(){
    return inMemoryProducts.map(this.calculateInventory);
  }

  public findBySku(sku: number){
    const product =  inMemoryProducts.find((product) => product.sku === sku );
    if(product) return this.calculateInventory(product);
  }

  public insert(product: IProduct){
    if(!product.sku) throw Error('No empty SKU');
    const exist = !!this.findBySku(product.sku);
    if(exist) throw Error('No duplicated SKU');
    inMemoryProducts.push(product);
  }

  public delete(sku: number){
    const productIndex = inMemoryProducts.findIndex((product) => product.sku === sku);
    if(productIndex === -1) throw Error('Product not found')
    inMemoryProducts.splice(productIndex,1);
  }

  public update(sku: number, product: Omit<IProduct,'sku'>){
    const inMemoryProduct =  inMemoryProducts.find((product) => product.sku === sku );
    if(!inMemoryProduct) throw Error('Product not found')

    inMemoryProduct.name = product.name;
    inMemoryProduct.inventory.warehouses = product.inventory.warehouses
  }

}

export default ProductRepository;
