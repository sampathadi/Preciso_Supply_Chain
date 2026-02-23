const mongoose = require('mongoose');

const DispatchSchema = new mongoose.Schema({
  warehouseId: { type: String, required: true, index: true },
  boxIds: [{ type: String }],
  status: { type: String, enum: ['CREATED','READY','SENT','DELIVERED','CANCELLED'], default: 'CREATED' },
  meta: { type: mongoose.Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Dispatch', DispatchSchema);
