const mongoose = require('mongoose');

const PlacementSchema = new mongoose.Schema({
  boxNumber: { type: String },
  box: { type: mongoose.Schema.Types.ObjectId, ref: 'Box' },
  products: [{ productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, quantity: Number }],
  // position index is a simple sequential slot index for MVP
  positionIndex: { type: Number },
});

const ArrangementSchema = new mongoose.Schema({
  warehouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse', required: true },
  placements: [PlacementSchema],
  totalBoxes: { type: Number, default: 0 },
  occupiedVolume: { type: Number, default: 0 },
  occupancyPercent: { type: Number, default: 0 },
  dispatchedCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Arrangement', ArrangementSchema);
