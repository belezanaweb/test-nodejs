import Produto from '../model/Produto';
import Inventory from '../model/Inventory';
import Warehouse from '../model/Warehouse';
import ProdutoDAO from '../dao/ProdutoDAO';
import ProdutoBO from '../bo/ProdutoBO';

export default class ProdutoService {

    private produto : Produto = new Produto();
    private inventory: Inventory = new Inventory();
    // private warehouse : Warehouse = new Warehouse();
    private produtoDAO : ProdutoDAO = new ProdutoDAO();
    private produtoBO : ProdutoBO = new ProdutoBO ();

    public save( data : any ){
      try {
        const _produto = this.produtoDAO.find(data.sku);
        this.produtoBO.validaSKU(_produto);
        // setando os dados para salvar o produto
        this.produto._sku = data.sku;
        this.produto._name = data.name;
        this.inventory._warehouses = [data.warehouse];
        this.produto._inventory = this.inventory;
        //validando os dados de inventory.quantity e marketable
        this.produto._inventory._quantity = this.produtoBO.calculaInventoryQuantity(this.produto);
        this.produto._isMarketable = this.produtoBO.validaIsMarketable(this.produto);

        return this.produtoDAO.save(this.produto);
      } catch (error) {
          throw error
      }
           
    }
    /**
     * Delete o produto
     * @param sku 
     */
    public delete( sku: number) {
        try {
            return this.produtoDAO.delete(sku);
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
            return this.produtoDAO.find(sku);
        } catch (error) {
            throw error
        }
    }

}