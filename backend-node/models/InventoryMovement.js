const mongoose = require('mongoose');

const InventoryMovementSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  type: { type: String, enum: ['IN','OUT','TRANSFER','ADJUST'], required: true },
  quantity: { type: Number, required: true },
  unitCost: { type: Number },
  fromLocation: { type: String },
  toLocation: { type: String },
  batchNumber: { type: String },
  createdAt: { type: Date, default: Date.now },
  meta: { type: mongoose.Schema.Types.Mixed }
});

module.exports = mongoose.model('InventoryMovement', InventoryMovementSchema);
