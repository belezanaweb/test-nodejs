const express = require('express');
const router = express.Router();
const controller = require('../controllers/produtosController');

router.post('/', controller.post);
router.put('/:id', controller.put);
router.get('/:id', controller.get);
router.delete('/:id', controller.delete);

module.exports = router;