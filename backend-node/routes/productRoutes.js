const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createProduct, getProducts, getProductById } = require('../controllers/productController');

router.get('/', auth, getProducts);
router.get('/:id', auth, getProductById);
router.post('/', auth, createProduct);

module.exports = router;
