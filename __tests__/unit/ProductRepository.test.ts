import ProductRepository, { IProduct, inMemoryProducts } from '../../src/api/Product/ProductRepository'

describe('Product Repository', () => {
  beforeEach(()=>{
    while(inMemoryProducts.length){
      inMemoryProducts.pop()
    }
  });

  describe('.insert', () => {
    it('should insert product one correctly', () =>{
      const product: IProduct = {
        sku : 1234,
        name : 'Name',
        inventory : {
          warehouses:[]
        }
      }
      const productRepository = new ProductRepository();

      productRepository.insert(product);

      expect(inMemoryProducts[0]).toEqual(product);
    });

    it('should insert two products correctly', () =>{
      const product: IProduct = {
        sku : 1234,
        name : 'Name',
        inventory : {
          warehouses:[]
        }
      };

      const otherProduct: IProduct = {
        sku : 1235,
        name : 'Name',
        inventory : {
          warehouses:[]
        }
      }
      const productRepository = new ProductRepository();

      productRepository.insert(product);
      productRepository.insert(otherProduct);

      expect(inMemoryProducts[0]).toEqual(product);
      expect(inMemoryProducts[1]).toEqual(otherProduct);
    });

    it('should throw error when try to insert product with existing sku', () =>{
      const product: IProduct = {
        sku : 1234,
        name : 'Name',
        inventory : {
          warehouses:[]
        }
      };
      const productRepository = new ProductRepository();

      productRepository.insert(product);
      expect(() => productRepository.insert(product)).toThrow(Error('No duplicated SKU'));
    });
  });

  describe('.findBySku', () => {
    it('should return quantity and isMarketable data from product without warehouses', () =>{
      const product: IProduct = {
        sku : 1234,
        name : 'Name',
        inventory : {
          warehouses:[]
        }
      }
      inMemoryProducts.push(product);

      const productRepository = new ProductRepository();

      const receivedProduct = productRepository.findBySku(product.sku);

      const expectProduct: IProduct = {
        sku : 1234,
        name : 'Name',
        inventory : {
          quantity: 0,
          warehouses:[]
        },
        isMarketable: false
      }
      expect(receivedProduct).toEqual(expectProduct)

    });

    it('should return quantity and isMarketable data from product with one warehouses', () =>{
      const product: IProduct = {
        sku : 1234,
        name : 'Name',
        inventory : {
          warehouses:[{
            quantity: 10,
            locality: 'SP',
            type:  'E-COMMERCE'
          }]
        }
      }
      inMemoryProducts.push(product);

      const productRepository = new ProductRepository();

      const receivedProduct = productRepository.findBySku(product.sku);

      const expectProduct: IProduct = {
        sku : 1234,
        name : 'Name',
        inventory : {
          quantity: 10,
          warehouses:[{
            quantity: 10,
            locality: 'SP',
            type:  'E-COMMERCE'
          }]
        },
        isMarketable: true
      }
      expect(receivedProduct).toEqual(expectProduct)
    });

    it('should return quantity as sum of warehouses quantity', () =>{
      const product: IProduct = {
        sku : 1234,
        name : 'Name',
        inventory : {
          warehouses:[
            {
              quantity: 10,
              locality: 'SP',
              type:  'E-COMMERCE'
            },
            {
              quantity: 10,
              locality: 'MG',
              type:  'E-COMMERCE'
            },
            {
              quantity: 10,
              locality: 'PR',
              type:  'E-COMMERCE'
            }
          ]
        }
      }
      inMemoryProducts.push(product);

      const productRepository = new ProductRepository();

      const receivedProduct = productRepository.findBySku(product.sku);

      const expectProduct: IProduct = {
        sku : 1234,
        name : 'Name',
        inventory : {
          quantity: 30,
          warehouses:[
            {
              quantity: 10,
              locality: 'SP',
              type:  'E-COMMERCE'
            },
            {
              quantity: 10,
              locality: 'MG',
              type:  'E-COMMERCE'
            },
            {
              quantity: 10,
              locality: 'PR',
              type:  'E-COMMERCE'
            }
          ]
        },
        isMarketable: true
      }
      expect(receivedProduct).toEqual(expectProduct)
    });

    it('should return undefined when product sku not exists', () =>{
      const product: IProduct = {
        sku : 1234,
        name : 'Name',
        inventory : {
          warehouses:[
            {
              quantity: 10,
              locality: 'SP',
              type:  'E-COMMERCE'
            },
            {
              quantity: 10,
              locality: 'MG',
              type:  'E-COMMERCE'
            },
            {
              quantity: 10,
              locality: 'PR',
              type:  'E-COMMERCE'
            }
          ]
        }
      }
      inMemoryProducts.push(product);

      const productRepository = new ProductRepository();

      const receivedProduct = productRepository.findBySku(123);

      expect(receivedProduct).toBeUndefined();
    });
  });

  describe('.delete', () => {
    it('should delete product', () =>{
      const product: IProduct = {
        sku : 1234,
        name : 'Name',
        inventory : {
          warehouses:[]
        }
      };

      const product2: IProduct = {
        sku : 1235,
        name : 'Name',
        inventory : {
          warehouses:[]
        }
      };

      inMemoryProducts.push(product);
      inMemoryProducts.push(product2);

      const productRepository = new ProductRepository();

      productRepository.delete(product.sku);

      expect(inMemoryProducts).toHaveLength(1);
    });

    it('should delete product', () =>{
      const product: IProduct = {
        sku : 1234,
        name : 'p1',
        inventory : {
          warehouses:[]
        }
      };

      const product2: IProduct = {
        sku : 1235,
        name : 'p2',
        inventory : {
          warehouses:[]
        }
      };

      const product3: IProduct = {
        sku : 1236,
        name : 'p3',
        inventory : {
          warehouses:[]
        }
      };

      inMemoryProducts.push(product);
      inMemoryProducts.push(product2);
      inMemoryProducts.push(product3);

      const productRepository = new ProductRepository();

      productRepository.delete(product2.sku);

      expect(inMemoryProducts).toHaveLength(2);
      expect(inMemoryProducts).toEqual([product, product3]);
    });

    it('should throw error when product sku do not exists', () =>{
      const product: IProduct = {
        sku : 1234,
        name : 'Name',
        inventory : {
          warehouses:[]
        }
      };

      const product2: IProduct = {
        sku : 1235,
        name : 'Name',
        inventory : {
          warehouses:[]
        }
      };

      const product3: IProduct = {
        sku : 1236,
        name : 'Name',
        inventory : {
          warehouses:[]
        }
      };

      inMemoryProducts.push(product);
      inMemoryProducts.push(product2);
      inMemoryProducts.push(product3);

      const productRepository = new ProductRepository();

      expect(()=> productRepository.delete(123)).toThrow(Error('Product not found'));
    });
  });

  describe('.update', () => {
    it('should update product', () =>{
      const product: IProduct = {
        sku : 1234,
        name : 'Name',
        inventory : {
          warehouses:[]
        }
      };
      inMemoryProducts.push(product);
      const productRepository = new ProductRepository();

      const productToUpdate: Omit<IProduct, 'sku'> = {
        name: 'updatedName',
        inventory : {
          warehouses : [{
            quantity: 10,
            locality: 'SP',
            type: 'WEB'
          }]
        }
      };

      productRepository.update(product.sku, productToUpdate);
      expect(inMemoryProducts[0]).toEqual({...productToUpdate, sku: 1234 } );

      expect(inMemoryProducts[0]).toEqual({...productToUpdate, sku: 1234 } );
    });

  });

  describe('.findAll', () => {
    it('should show all product with ', () =>{
      const product: IProduct = {
        sku : 1234,
        name : 'Name',
        inventory : {
          warehouses:[{
            quantity: 5,
            locality: 'SP',
            type:  'E-COMMERCE'
          }]
        }
      };

      const product2: IProduct = {
        sku : 1235,
        name : 'Name 2',
        inventory : {
          warehouses:[{
            quantity: 10,
            locality: 'SP',
            type:  'E-COMMERCE'
          }]
        }
      };

      const product3: IProduct = {
        sku : 1235,
        name : 'Name 2',
        inventory : {
          warehouses:[{
            quantity: 0,
            locality: 'SP',
            type:  'E-COMMERCE'
          }]
        }
      };

      inMemoryProducts.push(product);
      inMemoryProducts.push(product2);
      inMemoryProducts.push(product3);

      const productRepository = new ProductRepository();

      const receivedProducts = productRepository.findAll();
      const expectedProducts = [product, product2, product3];
      expectedProducts[0].isMarketable = true;
      expectedProducts[0].inventory.quantity = 5;
      expectedProducts[1].isMarketable = true;
      expectedProducts[1].inventory.quantity = 10;
      expectedProducts[2].isMarketable = false;
      expectedProducts[2].inventory.quantity = 0;
      expect(receivedProducts).toEqual(expectedProducts);
    });
  });
})
