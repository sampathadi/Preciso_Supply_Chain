const mongoose = require('mongoose');

const BatchSchema = new mongoose.Schema({
  batchNumber: { type: String, required: true },
  quantity: { type: Number, default: 0 },
  expiryDate: { type: Date },
  location: { type: String }, // e.g. WH1-A3
});

const LocationSchema = new mongoose.Schema({
  warehouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse' },
  shelf: { type: String },
  quantity: { type: Number, default: 0 },
});

const ProductSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  description: { type: String },
  unitCost: { type: Number, default: 0 },
  unitWeight: { type: Number, default: 0 },
  unitVolume: { type: Number, default: 0 },
  totalQuantity: { type: Number, default: 0 },
  lowStockThreshold: { type: Number, default: 0 },
  locations: [LocationSchema],
  batches: [BatchSchema],
  dispatchStatus: {
    stored: { type: Number, default: 0 },
    readyToDispatch: { type: Number, default: 0 },
    dispatched: { type: Number, default: 0 },
  },
  meta: { type: mongoose.Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', ProductSchema);
