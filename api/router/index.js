const dataHolder = require('../lib/data-holder');

module.exports = app => {
  app.post('/products', (req, res) => {
    dataHolder.create(req.body)
      .then(result => res.status(200).json(result))
      .catch(e => res.status(500).json(e));
  });
  app.get('products/:id')
  app.all('*', (req, res) => res.status(404).send('NOT FOUND'));
}