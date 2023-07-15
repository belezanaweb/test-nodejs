const ProductRepository = require('../../../../src/infraestructure/repositories/ProductRepository');

describe('ProductRepository', () => {
    let productRepository;

    beforeEach(() => {
        productRepository = new ProductRepository();
    });

    afterEach(async () => {
        // Clean up the repository after each test
        await productRepository.clear();
    });

    it('should save a product', async () => {
        const product = { sku: 12345, name: 'New Product' };

        await productRepository.save(product);

        const storedProduct = await productRepository.findBySku(product.sku);
        expect(storedProduct).toEqual(product);
    });

    it('should find a product by SKU', async () => {
        const product1 = { sku: 12345, name: 'Test Product 1' };
        const product2 = { sku: 54321, name: 'Test Product 2' };
        await productRepository.save(product1);
        await productRepository.save(product2);

        const foundProduct = await productRepository.findBySku(product1.sku);

        expect(foundProduct).toEqual(product1);
    });

    it('should return undefined if product with SKU is not found', async () => {
        const product = { sku: 12345, name: 'Test Product' };

        const foundProduct = await productRepository.findBySku(product.sku);

        expect(foundProduct).toBeUndefined();
    });

    it('should delete a product', async () => {
        const product = { sku: 12345, name: 'Test Product' };
        await productRepository.save(product);

        await productRepository.delete(product.sku);

        const foundProduct = await productRepository.findBySku(product.sku);
        expect(foundProduct).toBeUndefined();
    });

    it('should not delete any product if the SKU is not found', async () => {
        const product = { sku: 12345, name: 'Test Product' };
        await productRepository.save(product);
        const nonExistingProductSku = 5555;

        await productRepository.delete(nonExistingProductSku);

        const foundProduct = await productRepository.findBySku(product.sku);
        expect(foundProduct).toEqual(product);
    });
});
