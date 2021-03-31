const fs = require('fs');

/**Import Functions */
const Healthckeck = require('../action/healthcheck');
const Product = require('../action/product');

/**Import Mocks */
const requestProductMock = JSON.parse(fs.readFileSync('./test/mocks/requestProduct.json'), 'utf-8');

test('get-health-check', async () => {
  expect(await Healthckeck.do()).toMatchObject({ msg: "Somehow, I'm still alive!" });
});

test('get-product', async () => {
  expect(await Product.getProductBySky(43264)).toMatchObject(requestProductMock);
});
