const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createDispatch, getDispatches } = require('../controllers/dispatchController');

router.get('/', auth, getDispatches);
router.post('/', auth, createDispatch);

module.exports = router;
