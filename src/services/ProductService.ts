import Product from '../model/Product';
import Inventory from '../model/Inventory';
import ProductDAO from '../dao/ProductDAO';
import ProductBO from '../bo/ProductBO';
import ProductException from '../exceptions/ProductException';


export default class ProductService {
    //TODO: dependency injection 
    private product : Product = new Product();
    private inventory: Inventory = new Inventory();
    private productDAO : ProductDAO = new ProductDAO();
    private productBO : ProductBO = new ProductBO ();

    public save( data : any ){
        try {
            const _product = this.productDAO.find(data.sku);
            this.productBO.validateSKU(_product);
            // setando os dados para salvar o product
            this.product.sku = data.sku;
            this.product.name = data.name;
            this.inventory.warehouses = data.inventory.warehouses;
            this.product.inventory = this.inventory;
            this.product.inventory.quantity = this.productBO.calculateInventoryQuantity(data.inventory.warehouses);
            //validando os dados de inventory.quantity e marketable
            
            this.product.isMarketable = this.productBO.validateIsMarketableFlag(this.product);
            return this.productDAO.save(this.product);
        } catch (error) {
            throw error;
        }
        
      
           
    }
    /**
     * Delete o product
     * @param sku 
     */
    public delete( sku: number) {
        try {
            if(!sku) throw new ProductException(ProductException.E06);
            let product = this.productDAO.find(sku);
            if(!product) throw new ProductException(ProductException.E07);
            const productDelete = this.productDAO.delete(sku);
            return productDelete.data();
        } catch (error) {
            throw error
        }
    }

    /**
     * Busca o product
     * @param sku 
     */
    public find( sku: number) {
        try {
            if(!sku) throw new ProductException(ProductException.E06);
            let product = this.productDAO.find(sku);

            if(!product) throw new ProductException(ProductException.E07);
            return product;
        } catch (error) {
            throw error
        }
    }

    /**
     * Atualiza o product
     * @param sku 
     * @param data 
     */
    public update( sku: number , data: any) {
        try {
            if(!sku) throw new ProductException(ProductException.E06);
            let product = this.productDAO.find(sku);

            if(!product) throw new ProductException(ProductException.E07);

            product.name = data.name;
            product.inventory = data.inventory;
            product.inventory.quantity = this.productBO.calculateInventoryQuantity(data.inventory.warehouses);
            product.isMarketable = this.productBO.validateIsMarketableFlag(product);
            this.product = product;
            const productUpdate = this.productDAO.update(sku, this.product);
            return productUpdate.data();

        } catch (error) {
            throw error
        }
    }

}