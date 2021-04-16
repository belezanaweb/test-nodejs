import chai from 'chai';
import Product from '../src/modules/products/infra/db/entities/Product';
import ProductRepository from '../src/modules/products/infra/db/repositories/ProductReposity';
import CreateProductService from '../src/modules/products/services/CreateProductService';
import DeleteProductBySkuService from '../src/modules/products/services/DeleteProductBySkuService';
import UpdateProductBySkuService from '../src/modules/products/services/UpdateProductBySkuService';
import FindProductBySkuService from '../src/modules/products/services/FindProductBySkuService';

chai.should();

describe("Test Find Product", () =>{
  it('Should be able to find a product', async () => {
    const productRepository = new ProductRepository();
    const createProductService = new CreateProductService(productRepository);
    const findProductBySkuService = new FindProductBySkuService(productRepository);

    const product: Product = {
      sku: 43264,
      name: "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
      inventory: {
          quantity: 0,
          warehouses: [
              {
                  locality: "SP",
                  quantity: 12,
                  type: "ECOMMERCE"
              },
              {
                  locality: "MOEMA",
                  quantity: 3,
                  type: "PHYSICAL_STORE"
              }
          ]
      }
    }


    await createProductService.execute(product);

    const productFinded = await findProductBySkuService.execute(product.sku)

    chai.expect(productFinded).have.property("sku")
    chai.expect(productFinded).have.property("name")
    chai.expect(productFinded).have.property("inventory")
    chai.expect(productFinded).deep.property('inventory')
    chai.expect(productFinded).deep.property('inventory').deep.property('warehouses')
  });
})
