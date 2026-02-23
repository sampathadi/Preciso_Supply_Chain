const Dispatch = require('../models/Dispatch');
const Box = require('../models/Box');

const createDispatch = async (req, res) => {
  try {
    const { warehouseId, boxIds, meta } = req.body;
    const d = new Dispatch({ warehouseId, boxIds, meta });
    await d.save();

    // mark boxes as DISPATCHED
    await Box.updateMany({ warehouseId, _id: { $in: boxIds } }, { $set: { status: 'DISPATCHED' } });

    res.status(201).json(d);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getDispatches = async (req, res) => {
  try {
    const list = await Dispatch.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { createDispatch, getDispatches };
