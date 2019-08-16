import Product from '../../src/interfaces/Product';
import { validate } from './../../src/services/validations/ProductValidationSchema';

describe('ProductValidationSchema', () => {
  it('should require SKU when not provided', () => {
    expect(validate({} as Product)).toBe('"sku" is required');
  });

  it('should require INVENTORY when not provided', () => {
    const product = { sku: 12345, name: 'Product name' } as Product;
    expect(validate(product)).toBe('"inventory" is required');
  });

  it('should return undefined when no validation errors', () => {
    const product = { sku: 12345, name: 'Product name', inventory: {} } as Product;
    expect(validate(product)).toBeUndefined();
  });
});
