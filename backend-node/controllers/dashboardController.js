const Warehouse = require('../models/Warehouse');
const Box = require('../models/Box');
const Product = require('../models/Product');

const getWarehouseDashboard = async (req, res) => {
  try {
    const warehouseId = req.params.warehouseId;
    const warehouse = await Warehouse.findOne({ code: warehouseId }) || await Warehouse.findById(warehouseId);
    if (!warehouse) return res.status(404).json({ message: 'Warehouse not found' });

    const totalVolume = (warehouse.length || warehouse.dimensions?.length || 0) * (warehouse.breadth || warehouse.dimensions?.breadth || 0) * (warehouse.height || warehouse.dimensions?.height || 0);

    // counts by status
    const boxesByStatus = await Box.aggregate([
      { $match: { warehouseId: warehouse.code || warehouse._id.toString() } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const totalBoxes = await Box.countDocuments({ warehouseId: warehouse.code || warehouse._id.toString() });

    const used = await Box.aggregate([
      { $match: { warehouseId: warehouse.code || warehouse._id.toString(), status: { $ne: 'DISPATCHED' } } },
      { $group: { _id: null, usedVolume: { $sum: '$volume' }, usedWeight: { $sum: '$currentWeight' } } }
    ]);

    const usedVolume = (used[0] && used[0].usedVolume) || 0;
    const usedWeight = (used[0] && used[0].usedWeight) || 0;
    const occupancyPercent = totalVolume ? Math.round((usedVolume / totalVolume) * 10000) / 100 : 0;

    const boxesReady = await Box.find({ warehouseId: warehouse.code || warehouse._id.toString(), status: 'FULL' }).limit(50);

    // products summary (summed across boxes)
    const prodAgg = await Box.aggregate([
      { $match: { warehouseId: warehouse.code || warehouse._id.toString() } },
      { $unwind: { path: '$products', preserveNullAndEmptyArrays: true } },
      { $group: { _id: '$products.productId', totalQty: { $sum: '$products.quantity' } } },
      { $lookup: { from: 'products', localField: '_id', foreignField: '_id', as: 'product' } },
      { $unwind: { path: '$product', preserveNullAndEmptyArrays: true } },
      { $project: { productId: '$_id', name: '$product.name', totalQty: 1 } }
    ]);

    res.json({
      warehouse: { id: warehouse._id, code: warehouse.code, name: warehouse.name },
      totalBoxes,
      boxesByStatus,
      usedVolume,
      usedWeight,
      occupancyPercent,
      boxesReady,
      products: prodAgg,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getWarehouseDashboard };
