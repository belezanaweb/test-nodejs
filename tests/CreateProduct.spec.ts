import chai from 'chai';
import Product from '../src/modules/products/infra/db/entities/Product';
import ProductRepository from '../src/modules/products/infra/db/repositories/ProductReposity';
import CreateProductService from '../src/modules/products/services/CreateProductService';
import DeleteProductBySkuService from '../src/modules/products/services/DeleteProductBySkuService';
import UpdateProductBySkuService from '../src/modules/products/services/UpdateProductBySkuService';

chai.should();

describe("Test Create Product", () =>{
    it('Should be able to create a product', async () => {
      const productRepository = new ProductRepository();
      const createProductService = new CreateProductService(productRepository);

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


      const productCreated = await createProductService.execute(product);

      chai.expect(productCreated).have.property("sku")
      chai.expect(productCreated).have.property("name")
      chai.expect(productCreated).have.property("inventory")
      chai.expect(productCreated).deep.property('inventory')
      chai.expect(productCreated).deep.property('inventory').deep.property('warehouses')
    });

    it('Not should be able to create a duplicate product', async () => {
      const productRepository = new ProductRepository();
      const createProductService = new CreateProductService(productRepository);

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


      await createProductService.execute(product)
      const productDuplicated = await createProductService.execute(product)

      chai.expect(productDuplicated).has.property('message').eql('product already exists')
    })
})
