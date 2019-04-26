import { ProductModel } from "../model/ProductModel";

export class ProductBusiness{
    
    private products: ProductModel[];

    constructor(products?: ProductModel[]){
        this.products = products || [];
    }

    add(product: ProductModel){
        const found = this.get(product);
        if (found != null){
            throw new Error('SKU já registrado na base');
        }
        return this.products.push(product);
    }

    edit(product: ProductModel){
        const found = this.get(product);
        if (found){
            this.delete(product);
            this.add(product);
        } else {
            throw new Error('SKU não encontrado');
        }
        return product;
    }

    delete(product: ProductModel){
        const found = this.get(product);
        if (found) {
            this.products = this.products.filter(_product => product.sku !== product.sku);
        }else{
            throw new Error('SKU não encontrado');
        }
        return product;
    }

    get(product: ProductModel){
        const filteredProduct = this.products.filter(_product => _product.sku === product.sku);
        if (filteredProduct.length == 1){
            return filteredProduct[0];
        }else{
            return null;
        }
    }

    getAll(): ProductModel[]{
        return this.products;
    }

}