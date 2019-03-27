import produtosCollection from '../config/database';
import Product from '../model/Product';
import ProductException from '../exceptions/ProductException';

export default class ProductDAO {
    
    // private db : Database = new Database();
    // private produtoCollection = this.db.addCollection(Constants.DB_COLLECTION)
    
    /**
     * Salva os dados do produto em memoria
     * @param produto 
     */
    public save(produto: Product) {
        try {
            return produtosCollection.insert(produto);
        } catch (error) {
            throw new ProductException(ProductException.E00);
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
            throw new ProductException(ProductException.E01);
        }
       
    }

    /**
     * Atualiza o produto
     * @param sku 
     * @param produto 
     */
    public update( sku : number , produto : Product){
        try {
            return produtosCollection.chain().find({ 'sku' : sku}).update((produto) => produto = produto);
        } catch (error) {
            console.log(error);
            throw new ProductException(ProductException.E02);
        }
        
    }

    /**
     * Deleta o produto;
     * @param sku 
     */
    public delete (sku: number){
        try {
            return produtosCollection.chain().find({ 'sku' : sku}).remove();
        } catch (error) {
            throw new ProductException(ProductException.E03);
        }
        
    }
}