const Box = require('../models/Box');

const getBoxes = async (req, res) => {
  try {
    const boxes = await Box.find();
    res.json(boxes);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getBoxById = async (req, res) => {
  try {
    const box = await Box.findById(req.params.id);
    if (!box) return res.status(404).json({ message: 'Box not found' });
    res.json(box);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const createBox = async (req, res) => {
  try {
    const box = new Box(req.body);
    await box.save();
    res.status(201).json(box);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const updateBox = async (req, res) => {
  try {
    const box = await Box.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!box) return res.status(404).json({ message: 'Box not found' });
    res.json(box);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const deleteBox = async (req, res) => {
  try {
    const box = await Box.findByIdAndDelete(req.params.id);
    if (!box) return res.status(404).json({ message: 'Box not found' });
    res.json({ message: 'Box deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  getBoxes,
  getBoxById,
  createBox,
  updateBox,
  deleteBox,
};
