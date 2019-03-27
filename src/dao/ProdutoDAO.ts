import Database from '../config/database';
import Produto from '../model/Produto';
import ProdutoException from '../exceptions/ProdutoException';

export default class ProdutoDAO {
    
    private produtoCollection : Database = new Database();
    
    /**
     * Salva os dados do produto em memoria
     * @param produto 
     */
    public save(produto: Produto) {
        try {
            return this.produtoCollection.getDb().insert(produto);
        } catch (error) {
           
        }
        
    }

    /**
     * Recupera o produto
     * @param sku 
     */
    public find( sku : number) {
        try {
            return this.produtoCollection.getDb().findObject({ 'sku' : sku});
        } catch (error) {
            throw new ProdutoException(ProdutoException.E01);
        }
       
    }

    /**
     * Atualiza o produto
     * @param sku 
     * @param produto 
     */
    public update( sku : number , produto : Produto){
        try {
            return this.produtoCollection.getDb().findObject({ 'sku' : sku}).update(produto);
        } catch (error) {
            throw new ProdutoException(ProdutoException.E02);
        }
        
    }

    /**
     * Deleta o produto;
     * @param sku 
     */
    public delete (sku: number){
        try {
            return this.produtoCollection.getDb().findObject({ 'sku' : sku}).remove();
        } catch (error) {
            throw new ProdutoException(ProdutoException.E03);
        }
        
    }
}