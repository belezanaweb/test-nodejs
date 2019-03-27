import ProdutoException from '../exceptions/ProdutoException';
import Produto from '../model/Produto';
import Warehouses from '../model/Warehouse';

export default class ProdutoBO {

    /**
     * Valida se já existe um produto com o sku informado
     * @param produto 
     */
    public validaSKU(produto : Produto | any): void {
        if(produto) throw new ProdutoException(ProdutoException.E04);
    }

    /**
     * Retorna a quantity dos warehouses e soma para atribuir o valor ao inventory.quantity
     * @param produto 
     */
    public calculaInventoryQuantity (warehouses: Warehouses[]): number {
        
        if(!warehouses || warehouses.length <= 0) throw new ProdutoException(ProdutoException.E05);
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
    public validaIsMarketable(produto: Produto): boolean {
        if(!produto.inventory) throw new ProdutoException(ProdutoException.E08);
        if(produto.inventory.quantity  && produto.inventory.quantity > 0) return true;
        return false
    }

}