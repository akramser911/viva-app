const express = require ('express');
const { getProducts, insertProduct, deleteProducts } = require('../logic/products');
const router = express.Router();

router.get('/', getProducts);
router.post('/', insertProduct);
router.delete('/:id', deleteProducts);

module.exports = router;