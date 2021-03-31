const fs = require('fs');

/**Import Functions */
const Healthckeck = require('../action/healthcheck');
const Product = require('../action/productActions');

/**Import Mocks */
const reqCreateProduct = JSON.parse(fs.readFileSync('./test/mocks/reqCreateProduct.json'), 'utf-8');
const resCreateProductFailed = JSON.parse(
  fs.readFileSync('./test/mocks/reqCreateProductFailedValidation.json'),
  'utf-8',
);
const reqProductMock = JSON.parse(fs.readFileSync('./test/mocks/reqProduct.json'), 'utf-8');
const resProductNotFoundMock = JSON.parse(fs.readFileSync('./test/mocks/resProductNotFound.json'), 'utf-8');

test('get-health-check', async () => {
  expect(await Healthckeck.do()).toMatchObject({ msg: "Somehow, I'm still alive!" });
});

test('create-product', async () => {
  expect(await Product.createProduct(reqCreateProduct)).toBe('Product (sku): 43264 created succesfuly');
});

test('get-product', async () => {
  await Product.createProduct(reqCreateProduct);
  expect(await Product.getProductBySky('43264')).toMatchObject(reqProductMock);
});

test('get-product-not-found', async () => {
  expect(await Product.getProductBySky('99999')).toMatchObject(resProductNotFoundMock);
});

test('delete-product', async () => {
  await Product.createProduct(reqCreateProduct);
  expect(await Product.deleteProductBySky('43264')).toBe('Product (sku): 43264 deleted succesfuly');
});

test('update-product', async () => {
  await Product.createProduct(reqCreateProduct);
  expect(await Product.updateProduct('43264', reqCreateProduct)).toBe('Product (sku): 43264 updated succesfuly');
});
