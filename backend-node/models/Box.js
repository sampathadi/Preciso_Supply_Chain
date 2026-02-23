const mongoose = require('mongoose');

const ProductEntrySchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, default: 0 },
});

const BoxSchema = new mongoose.Schema({
  warehouseId: { type: String, required: true, index: true },
  name: { type: String, required: true },
  sku: { type: String, unique: false },
  dimensions: {
    length: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
  },
  volume: { type: Number, default: 0 },
  maxWeight: { type: Number, default: 0 },
  currentWeight: { type: Number, default: 0 },
  status: { type: String, enum: ['EMPTY','PARTIALLY_FILLED','FULL','DISPATCHED'], default: 'EMPTY' },
  products: [ProductEntrySchema],
  meta: { type: mongoose.Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now },
});

// compute volume before save
BoxSchema.pre('save', function (next) {
  try {
    const d = this.dimensions || {};
    this.volume = (d.length || 0) * (d.width || 0) * (d.height || 0);
  } catch (e) {
    this.volume = this.volume || 0;
  }
  next();
});

module.exports = mongoose.model('Box', BoxSchema);
