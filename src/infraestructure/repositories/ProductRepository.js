export default class ProductRepository {
    constructor() {
        this.products = []; // In memory database
    }

    async findBySku(sku) {
        try {
            return await this.products.find(product => product.sku === sku);
        }
        catch (error) {
            throw new ProductNotFoundError();
        }
    }

    async save(product) {
        try {
            await this.products.push(product);
        } catch (error) {
            throw new ProductNotFoundError();
        }

    }

    async delete(product) {
        try {
            const index = await this.products.findIndex(p => p.sku === product.sku);
            if (index !== -1) {
                this.products.splice(index, 1);
            }
        } catch (error) {
            throw new ProductNotFoundError();
        }

    }
}
