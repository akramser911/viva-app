const express = require ('express');
const { getProducts, insertProduct, deleteProducts, getElement } = require('../logic/products');
const router = express.Router();

router.get('/', getProducts);
router.post('/', insertProduct);
router.delete('/:id', deleteProducts);
router.get('/:id', getElement);

module.exports = router;