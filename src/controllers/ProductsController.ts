import ProductValidations from '../validations/ProductValidations';
import ProductRepository from '../repositories/ProductRepository';
import Product from '../representations/Product';

class ProductsController {
  
  private repository;

  constructor(repository) {
    this.repository = repository;
  }

  public getBySku = async (sku: number, response: any) => {
    let product = await this.repository.getBySku(sku);

    if (!product) {
      return response.json({
        success: false,
        data: [] 
      });
    }

    product.inventory.quantity = product.inventory.warehouses.map(w => w.quantity).reduce((a, b) => a + b);
    product.isMarketable = false;
    
    if (parseInt(product.inventory.quantity) > 0) {
      product.isMarketable = true;
    }
    response.json({
      success: true,
      data: product 
    });
  }

  public create = async (request: any, response: any) => {
    let productRequest = request.body;
    let productValidate = new ProductValidations(productRequest);
    productValidate.validate();

    if(productValidate.error){
      return response.json(productValidate.getError());
    }

    let randomNumber = Math.floor(Math.random() * 200) + 100;

    Product.setSku(randomNumber);
    Product.setName(productRequest.name);
    Product.setInventory(productRequest.inventory);

    try {
      await this.repository.create(Product, Product.getSku());
    } catch (error) {
      return response.json(error);
    }

    response.json({
      success: true,
      message: 'product created successfully.',
      data: Product
    });

  }

  public update = async (sku: number, request: any, response: any) => {
    let product = this.repository.getBySku(sku);

    if(!product) {
      return response.json({
        success: false,
        message: 'product not found for update',
        data: []
      });
    }

    let productRequest = request.body;
    let productValidate = new ProductValidations(productRequest);
    productValidate.validate();

    if(productValidate.error){
      return response.json(productValidate.getError());
    }

    Product.setSku(sku);
    Product.setName(productRequest.name);
    Product.setInventory(productRequest.inventory);

    try {
      await this.repository.update(Product.getSku(), Product);
    } catch (error) {
        response.json(error);
    }

    response.json({
      success: true,
      message: 'Product successfully changed.',
      data: product 
    });
  }

  public delete = async (sku: number, request: any, response: any) => {
    let product = this.repository.getBySku(sku);

    if (!product) {
      return response.json({
        success: false,
        data: [] 
      });
    }

    try {
      await this.repository.delete(sku);
    } catch (error) {
      return response.json({
        success: false,
        data: [] 
      });
    }
    
    response.json({
      success: true,
      message: 'Product successfully deleted.',
      data: product 
    });
  }

}

export default new ProductsController(ProductRepository);