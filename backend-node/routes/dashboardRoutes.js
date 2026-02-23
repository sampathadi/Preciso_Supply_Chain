const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getWarehouseDashboard } = require('../controllers/dashboardController');

router.get('/warehouse/:warehouseId', auth, getWarehouseDashboard);

module.exports = router;
