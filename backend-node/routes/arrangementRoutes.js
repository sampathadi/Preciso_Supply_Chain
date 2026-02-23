const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createArrangement, getLatestArrangement } = require('../controllers/arrangementController');

router.post('/', auth, createArrangement);
router.get('/latest/:warehouseId', auth, getLatestArrangement);

module.exports = router;
