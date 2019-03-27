import ProdutoException from '../exceptions/ProdutoException';
import Produto from '../model/Produto';

export default class ProdutoBO {

    /**
     * Valida se já existe um produto com o sku informado
     * @param produto 
     */
    public validaSKU(produto : Produto): void {
        if(produto) throw new ProdutoException(ProdutoException.E04);
    }

    /**
     * Retorna a quantity dos warehouses e soma para atribuir o valor ao inventory.quantity
     * @param produto 
     */
    public calculaInventoryQuantity (produto: Produto): number {
        
        if(!produto._inventory) throw new ProdutoException(ProdutoException.E05);
        const inventoryQuantity = produto._inventory._warehouses!.reduce((prevValue, currentValue) => (currentValue && currentValue._quantity ) ? prevValue + currentValue._quantity: 0 , 0);
        return inventoryQuantity;
        
    }
    
    /**
     * Verifica se a flag isMarkatable deve ser setada se quantity no inventory for maior que 0
     * @param produto 
     */
    public validaIsMarketable(produto: Produto): boolean {
        if(!produto._inventory) throw new ProdutoException(ProdutoException.E05);
        if(produto._inventory._quantity  && produto._inventory._quantity > 0) return true;
        return false
    }

}