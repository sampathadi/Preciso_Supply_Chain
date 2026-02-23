const Warehouse = require('../models/Warehouse');

// Get list of warehouses
const getWarehouses = async (req, res) => {
  try {
    const warehouses = await Warehouse.find();
    res.json(warehouses);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get single warehouse
const getWarehouseById = async (req, res) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id);
    if (!warehouse) return res.status(404).json({ message: 'Warehouse not found' });
    res.json(warehouse);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Create warehouse
const createWarehouse = async (req, res) => {
  try {
    const { code, name, address, meta } = req.body;
    const existing = await Warehouse.findOne({ code });
    if (existing) return res.status(400).json({ message: 'Warehouse code already exists' });
    const warehouse = new Warehouse({ code, name, address, meta });
    await warehouse.save();
    res.status(201).json(warehouse);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update warehouse
const updateWarehouse = async (req, res) => {
  try {
    const updates = req.body;
    const warehouse = await Warehouse.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!warehouse) return res.status(404).json({ message: 'Warehouse not found' });
    res.json(warehouse);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete warehouse
const deleteWarehouse = async (req, res) => {
  try {
    const warehouse = await Warehouse.findByIdAndDelete(req.params.id);
    if (!warehouse) return res.status(404).json({ message: 'Warehouse not found' });
    res.json({ message: 'Warehouse deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  getWarehouses,
  getWarehouseById,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
};
