const mongoose = require('mongoose');

const WarehouseSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  address: { type: String },
  // physical dimensions in meters (or consistent unit)
  length: { type: Number, default: 0 },
  breadth: { type: Number, default: 0 },
  height: { type: Number, default: 0 },
  // optional slot size (single storage cell) if warehouse is divided into slots
  slotSize: {
    length: { type: Number },
    breadth: { type: Number },
    height: { type: Number }
  },
  // misc settings
  meta: { type: mongoose.Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Warehouse', WarehouseSchema);
