import produtosCollection from '../config/database';
import Produto from '../model/Produto';
import ProdutoException from '../exceptions/ProdutoException';
import Constants from '../constants';

export default class ProdutoDAO {
    
    // private db : Database = new Database();
    // private produtoCollection = this.db.addCollection(Constants.DB_COLLECTION)
    
    /**
     * Salva os dados do produto em memoria
     * @param produto 
     */
    public save(produto: Produto) {
        try {
            return produtosCollection.insert(produto);
        } catch (error) {
            throw new ProdutoException(ProdutoException.E00);
        }
        
    }

    /**
     * Recupera o produto
     * @param sku 
     */
    public find( sku : number) {
        try {
            return produtosCollection.findObject({ 'sku' : sku})
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
            return produtosCollection.chain().find({ 'sku' : sku}).update((produto) => produto = produto);
        } catch (error) {
            console.log(error);
            throw new ProdutoException(ProdutoException.E02);
        }
        
    }

    /**
     * Deleta o produto;
     * @param sku 
     */
    public delete (sku: number){
        try {
            return produtosCollection.findAndRemove({ 'sku' : sku});
        } catch (error) {
            throw new ProdutoException(ProdutoException.E03);
        }
        
    }
}