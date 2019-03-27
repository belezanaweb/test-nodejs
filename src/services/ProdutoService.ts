import Produto from '../model/Produto';
import Inventory from '../model/Inventory';
import ProdutoDAO from '../dao/ProdutoDAO';
import ProdutoBO from '../bo/ProdutoBO';
import ProdutoException from '../exceptions/ProdutoException';
import Constants from '../constants'

export default class ProdutoService {
    //TODO: dependency injection 
    private produto : Produto = new Produto();
    private inventory: Inventory = new Inventory();
    private produtoDAO : ProdutoDAO = new ProdutoDAO();
    private produtoBO : ProdutoBO = new ProdutoBO ();

    public save( data : any ){
        try {
            const _produto = this.produtoDAO.find(data.sku);
            this.produtoBO.validaSKU(_produto);
            // setando os dados para salvar o produto
            this.produto.sku = data.sku;
            this.produto.name = data.name;
            this.inventory.warehouses = data.inventory.warehouses;
            this.produto.inventory = this.inventory;
            this.produto.inventory.quantity = this.produtoBO.calculaInventoryQuantity(data.inventory.warehouses);
            //validando os dados de inventory.quantity e marketable
            
            this.produto.isMarketable = this.produtoBO.validaIsMarketable(this.produto);
            return this.produtoDAO.save(this.produto);
        } catch (error) {
            throw error;
        }
        
      
           
    }
    /**
     * Delete o produto
     * @param sku 
     */
    public delete( sku: number) {
        try {
            if(!sku) throw new ProdutoException(ProdutoException.E06);
            let produto = this.produtoDAO.find(sku);
            if(!produto) throw new ProdutoException(ProdutoException.E07);
            const produtoDeletado = this.produtoDAO.delete(sku);
            return produtoDeletado.data();
        } catch (error) {
            throw error
        }
    }

    /**
     * Busca o produto
     * @param sku 
     */
    public find( sku: number) {
        try {
            if(!sku) throw new ProdutoException(ProdutoException.E06);
            let produto = this.produtoDAO.find(sku);

            if(!produto) throw new ProdutoException(ProdutoException.E07);
            return produto;
        } catch (error) {
            throw error
        }
    }

    /**
     * Atualiza o produto
     * @param sku 
     * @param data 
     */
    public update( sku: number , data: any) {
        try {
            if(!sku) throw new ProdutoException(ProdutoException.E06);
            let produto = this.produtoDAO.find(sku);

            if(!produto) throw new ProdutoException(ProdutoException.E07);

            produto.name = data.name;
            produto.inventory = data.inventory;
            produto.inventory.quantity = this.produtoBO.calculaInventoryQuantity(data.inventory.warehouses);
            produto.isMarketable = this.produtoBO.validaIsMarketable(produto);
            this.produto = produto;
            const produtoAtualizado = this.produtoDAO.update(sku, this.produto);
            return produtoAtualizado.data();

        } catch (error) {
            throw error
        }
    }

}