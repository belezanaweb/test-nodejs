const {
    readFile,
    writeFile
} = require('fs');

const {
    promisify
} = require('util');

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Database {
    constructor() {
        this.FILE_NAME = __dirname + '/products.json';
    }
    async readFileData() {
        const arquivo = await readFileAsync(this.FILE_NAME, 'utf8');
        return JSON.parse(arquivo.toString());
    }
    async writeFileData(data) {
        await writeFileAsync(this.FILE_NAME, JSON.stringify(data));
        return true;
    }
    async create(product) {
        const currentFileData = await this.readFileData();
        const newFileData = [
            ...currentFileData,
            product
        ];

        return await this.writeFileData(newFileData);
    }
    async read(sku) {
        const fileData = await this.readFileData();

        const filteredProduct = fileData.find(product => product.sku === sku);
        
        return filteredProduct;
    }
    async update(product) {
        const currentFileData = await this.readFileData();
        const productIndex = currentFileData.findIndex(item => (item.sku === product.sku))
        
        currentFileData.splice(productIndex, 1, product);

        await this.writeFileData(currentFileData);

        const result = await this.readFileData();

        return result[productIndex];
    }
    async delete(sku) {
        const currentFileData = await this.readFileData();
        const productIndex = currentFileData.findIndex(item => (item.sku === sku))

        currentFileData.splice(productIndex, 1);

        return await this.writeFileData(currentFileData);
    }
}

module.exports = new Database();