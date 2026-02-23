const Warehouse = require('../models/Warehouse');
const Box = require('../models/Box');
const Arrangement = require('../models/Arrangement');

// Simple arrangement algorithm (volume-based sequential fill)
const createArrangement = async (req, res) => {
  try {
    const { warehouseId, boxes } = req.body;
    const warehouse = await Warehouse.findById(warehouseId);
    if (!warehouse) return res.status(404).json({ message: 'Warehouse not found' });

    const warehouseVolume = (warehouse.length || 0) * (warehouse.breadth || 0) * (warehouse.height || 0);
    if (!warehouseVolume) return res.status(400).json({ message: 'Warehouse dimensions not set' });

    let occupied = 0;
    const placements = [];
    let boxCounter = 1;

    // boxes: [{ boxId, quantity, products: [{ productId, quantity }] }]
    for (const item of boxes || []) {
      const boxDef = await Box.findById(item.boxId);
      if (!boxDef) continue;
      const boxVolume = (boxDef.length || 0) * (boxDef.breadth || 0) * (boxDef.height || 0);
      for (let q = 0; q < (item.quantity || 0); q++) {
        if (occupied + boxVolume > warehouseVolume) break; // can't place more
        const placement = {
          boxNumber: `B-${boxCounter}`,
          box: boxDef._id,
          products: item.products || [],
          positionIndex: boxCounter - 1,
        };
        placements.push(placement);
        occupied += boxVolume;
        boxCounter += 1;
      }
    }

    const totalBoxes = placements.length;
    const occupancyPercent = warehouseVolume ? Math.round((occupied / warehouseVolume) * 10000) / 100 : 0;

    const arrangement = new Arrangement({
      warehouse: warehouse._id,
      placements,
      totalBoxes,
      occupiedVolume: occupied,
      occupancyPercent,
    });

    await arrangement.save();
    res.status(201).json(arrangement);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getLatestArrangement = async (req, res) => {
  try {
    const warehouseId = req.params.warehouseId;
    const arrangement = await Arrangement.findOne({ warehouse: warehouseId }).sort({ createdAt: -1 }).populate('placements.box');
    if (!arrangement) return res.status(404).json({ message: 'No arrangements found' });
    res.json(arrangement);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { createArrangement, getLatestArrangement };
