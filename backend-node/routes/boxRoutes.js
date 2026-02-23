const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getBoxes, getBoxById, createBox, updateBox, deleteBox } = require('../controllers/boxController');

router.get('/', auth, getBoxes);
router.get('/:id', auth, getBoxById);
router.post('/', auth, createBox);
router.put('/:id', auth, updateBox);
router.delete('/:id', auth, deleteBox);

module.exports = router;
