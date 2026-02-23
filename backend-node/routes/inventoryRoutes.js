const express = require('express');
const router = express.Router();
const inv = require('../controllers/inventoryController');

router.get('/products', inv.listProducts);
router.post('/products', inv.createProduct);
router.get('/products/low-stock', inv.lowStock);
router.get('/products/:id', inv.getProduct);
router.put('/products/:id', inv.updateProduct);
router.post('/products/:id/adjust', inv.adjustStock);

module.exports = router;
