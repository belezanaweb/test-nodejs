import chai from 'chai';
import Product from '../src/modules/products/infra/db/entities/Product';
import ProductRepository from '../src/modules/products/infra/db/repositories/ProductReposity';
import CreateProductService from '../src/modules/products/services/CreateProductService';
import DeleteProductBySkuService from '../src/modules/products/services/DeleteProductBySkuService';
import UpdateProductBySkuService from '../src/modules/products/services/UpdateProductBySkuService';

chai.should();

describe("Test Update Product", () =>{
  it('Should be able to update a product', async () => {
    const productRepository = new ProductRepository();
    const createProductService = new CreateProductService(productRepository);
    const updateProductBySkuService = new UpdateProductBySkuService(productRepository);

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

    product.name = 'Atualizado'

    const productUpdated = await updateProductBySkuService.execute(product.sku, product)

    chai.expect(productUpdated).has.property('name').eql('Atualizado')
  })
})
