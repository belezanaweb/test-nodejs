import ProductException from '../exceptions/ProductException';
import Product from '../model/Product';
import Warehouses from '../model/Warehouse';

export default class ProductBO {

    /**
     * Valida se já existe um produto com o sku informado
     * @param produto 
     */
    public validateSKU(produto : Product | any): void {
        if(produto) throw new ProductException(ProductException.E04);
    }

    /**
     * Retorna a quantity dos warehouses e soma para atribuir o valor ao inventory.quantity
     * @param produto 
     */
    public calculateInventoryQuantity (warehouses: Warehouses[]): number {
        
        if(!warehouses || warehouses.length <= 0) throw new ProductException(ProductException.E05);
        const inventoryQuantity = warehouses.reduce((prevValue, currentValue) => {

           if(currentValue.quantity){
               return prevValue + currentValue.quantity;
           }
           return prevValue;
        }  , 0);

        return inventoryQuantity;
        
    }
    
    /**
     * Verifica se a flag isMarkatable deve ser setada se quantity no inventory for maior que 0
     * @param produto 
     */
    public validateIsMarketableFlag(produto: Product): boolean {
        if(!produto.inventory) throw new ProductException(ProductException.E08);
        if(produto.inventory.quantity  && produto.inventory.quantity > 0) return true;
        return false
    }

}