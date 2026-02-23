const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  getWarehouses,
  getWarehouseById,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
} = require('../controllers/warehouseController');

// Public list (could be protected if desired)
router.get('/', auth, getWarehouses);
router.get('/:id', auth, getWarehouseById);
router.post('/', auth, createWarehouse);
router.put('/:id', auth, updateWarehouse);
router.delete('/:id', auth, deleteWarehouse);

module.exports = router;
