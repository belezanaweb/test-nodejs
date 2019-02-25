const path = require('path');
const express = require('express');
const router = express.Router();
const Entity = require(path.resolve('./src/entity/Product'));
const GetProduct = require(path.resolve('./src/controller/GetProduct'));
const PutProduct = require(path.resolve('./src/controller/PutProduct'));
const PostProduct = require(path.resolve('./src/controller/PostProduct'));
const DeleteProduct = require(path.resolve('./src/controller/DeleteProduct'));

router.post('/', function (req, res) {
  try {
    if ((new Entity()).validate(req.body)) {
      (new PostProduct()).doit(req.body, (result) => {
        res.statusCode = (result) ? 201 : 400;
        res.end();
      });
    } else {
      res.statusCode = 400;
      res.end();
    }
  } catch (err) {
    res.statusCode = 500;
    res.end();
    console.error(err);
  }
});

router.put('/:sku', function (req, res) {
  try {
    let data = ((req.params instanceof Object) && (req.body instanceof Object)) ?
      Object.assign(req.params, req.body) : new Object();
    if ((new Entity()).validate(data)) {
      (new PutProduct()).doit(data, (result) => {
        res.statusCode = (result) ? 204 : 404;
        res.end();
      });
    } else {
      res.statusCode = 400;
      res.end();
    }
  } catch (err) {
    res.statusCode = 500;
    res.end();
    console.error(err);
  }
});

router.get('/:sku', function (req, res) {
  try {
    if ((undefined !== req.params.sku) && (Object.keys(req.params).length == 1)) {
      (new GetProduct()).doit(req.params.sku, (result) => {
        if (result) {
          res.statusCode = 200;
          res.send(result);
        } else {
          res.statusCode = 404;
          res.end();
        }
      });
    } else {
      res.statusCode = 400;
      res.end();
    }
  } catch (err) {
    res.statusCode = 500;
    res.end();
    console.error(err);
  }
});

router.delete('/:sku', function (req, res) {
  try {
    if ((undefined !== req.params.sku) && (Object.keys(req.params).length == 1)) {
      (new DeleteProduct()).doit(req.params.sku, (result) => {
        res.statusCode = (result) ? 204 : 404;
        res.end();
      });
    } else {
      res.statusCode = 400;
      res.end();
    }
  } catch (err) {
    res.statusCode = 500;
    res.end();
    console.error(err);
  }
});

module.exports = router;
