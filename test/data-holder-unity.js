const dataHolder = require('../api/lib/data-holder');
const expect = require('chai').expect;

describe('Memory data storage tests', () => {

  beforeEach(() => {
    return dataHolder.create({
      sku: 123,
      name: 'Batwoman rain cape',
      inventory: {
        warehouses: [
          {
            locality: 'SP',
            quantity: 120,
            type: 'ECOMMERCE'
          }
        ]
      }
    });
  });

  afterEach(() => dataHolder.delete(123).catch(() => {}));
  
  after(() => dataHolder.delete(1).catch(() => {}))

  it('Product creation cannot have unexpected properties', () => {
    return dataHolder.create({
      sku: 1,
      name: 'Supergirl beauty mask',
      inventory: {
        quantity: 1000,
        warehouses: [
          {
            locality: 'SP',
            quantity: 3,
            type: 'ECOMMERCE'
          }, {
            locality: 'MOEMA',
            quantity: 89,
            type: 'PHYSICAL_STORE'
          }, {
            locality: 'ES',
            quantity: 12,
            type: 'ECOMMERCE'
          },
        ]
      },
      notArealProperty: 'value',
      isMarketable: false
    })
      .then(result => {
        expect(result.sku).to.equals(1);
        expect(result).not.to.have.property('notArealProperty');
        expect(result.isMarketable).to.equal(true);
        expect(result.inventory.quantity).to.equals(104);
      });
  });

  it('Should not find unexinsting product', () => {
    return dataHolder.read(12)
      .catch(result => {
        expect(result).to.be.instanceOf(Error);
        expect(result.message).to.equals('PRODUCT 12 NOT FOUND');
      });
  });

  it('Find a product', () => {
    return dataHolder.read(123)
      .then(product => {
        expect(product.name).to.equals('Batwoman rain cape');
        expect(product.inventory.quantity).to.equals(120);
        expect(product.inventory.warehouses.length).to.equals(1);
      })
  });

  it('Should update a product', () => {
    return dataHolder.update(123, {
      sku: 123,
      name: 'Batwoman rain black cape',
      inventory: {
        warehouses: [
          {
            locality: 'SP',
            quantity: 0,
            type: 'ECOMMERCE'
          }, {
            locality: 'RJ',
            quantity: 0,
            type: 'PHYSICAL_STORE'
          }
        ]
      }
    })
      .then(product => {
        expect(product.name).not.to.equals('Batwoman rain cape');
        expect(product.inventory.quantity).to.equals(0);
        expect(product.isMarketable).to.equals(false);
        expect(product.inventory.warehouses.length).to.equals(2);
      });
  });

  it('Should delete product 123', () => {
    return dataHolder.delete(123)
      .then(result => expect(result).to.equals('Deleted product 123'));
  });
});