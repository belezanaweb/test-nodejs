const dataHolder = require('../lib/data-holder');

module.exports = app => {
  app.post('/products', (req, res) => {
    dataHolder.create(req.body)
      .then(result => res.status(200).json(result))
      .catch(e => res.status(500).json(e.message));
  });
  app.get('/products/:sku', (req, res) => {
    dataHolder.read(req.params.sku)
      .then(product => res.status(200).json(product))
      .catch(e => res.status(404).json(e.message));
  });
  app.get('/products/:offset/:limit', (req, res) => {
    dataHolder.paginate(req.params.offset, req.params.limit)
      .then(product => res.status(200).json(product));
  });
  app.put('/products/:sku', (req, res) => {
    dataHolder.update(req.params.sku, req.body)
      .then(product => res.status(200).json(product))
      .catch(e => res.status(404).json(e.message));
  });
  app.delete('/products/:sku', (req, res) => {
    dataHolder.delete(req.params.sku, req.body)
      .then(response => res.status(200).json(response));
  });
  app.all('*', (req, res) => res.status(404).send('NOT FOUND'));
}