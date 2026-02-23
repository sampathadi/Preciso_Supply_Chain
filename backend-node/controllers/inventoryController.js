const Product = require('../models/Product');
const InventoryMovement = require('../models/InventoryMovement');

// Create a product
exports.createProduct = async (req, res) => {
  try {
    const { sku, name, description, unitCost, lowStockThreshold } = req.body;
    const p = new Product({ sku, name, description, unitCost, lowStockThreshold });
    await p.save();
    res.status(201).json(p);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create product', details: err.message });
  }
};

// List products (with basic filters)
exports.listProducts = async (req, res) => {
  try {
    const products = await Product.find().limit(200).lean();
    // compute total quantity from locations/batches
    const enriched = products.map(p => {
      const qtyFromLocations = (p.locations || []).reduce((s, l) => s + (l.quantity||0), 0);
      const qtyFromBatches = (p.batches || []).reduce((s, b) => s + (b.quantity||0), 0);
      return { ...p, quantity: qtyFromLocations || qtyFromBatches };
    });
    res.json(enriched);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to list products' });
  }
};

// Get product
exports.getProduct = async (req, res) => {
  try {
    const p = await Product.findById(req.params.id).populate('locations.warehouse').lean();
    if(!p) return res.status(404).json({ error: 'Not found' });
    res.json(p);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get product' });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(p);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update product' });
  }
};

// Adjust stock (create movement and update product quantities)
exports.adjustStock = async (req, res) => {
  try {
    const { type, quantity, fromLocation, toLocation, batchNumber, unitCost } = req.body;
    const productId = req.params.id;
    const prod = await Product.findById(productId);
    if(!prod) return res.status(404).json({ error: 'Product not found' });

    // create movement record
    const mv = new InventoryMovement({ product: productId, type, quantity, fromLocation, toLocation, batchNumber, unitCost });
    await mv.save();

    // Basic adjustments: update locations or batches if provided
    if(batchNumber) {
      let batch = prod.batches.find(b => b.batchNumber === batchNumber);
      if(!batch && type === 'IN') {
        batch = { batchNumber, quantity: 0 };
        prod.batches.push(batch);
      }
      if(batch) {
        batch.quantity = (batch.quantity || 0) + (type === 'OUT' ? -Math.abs(quantity) : Math.abs(quantity));
      }
    }

    if(toLocation) {
      let loc = prod.locations.find(l => l.shelf === toLocation || String(l.warehouse) === String(toLocation));
      if(!loc) {
        prod.locations.push({ shelf: toLocation, quantity: quantity });
      } else {
        loc.quantity = (loc.quantity||0) + (type === 'OUT' ? -Math.abs(quantity) : Math.abs(quantity));
      }
    }

    if(fromLocation && !toLocation) {
      let loc = prod.locations.find(l => l.shelf === fromLocation || String(l.warehouse) === String(fromLocation));
      if(loc) loc.quantity = (loc.quantity||0) - Math.abs(quantity);
    }

    await prod.save();
    res.json({ ok: true, movement: mv });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to adjust stock' });
  }
};

// Low stock products
exports.lowStock = async (req, res) => {
  try {
    const products = await Product.find({ lowStockThreshold: { $gt: 0 } }).lean();
    const low = products.filter(p => {
      const qty = (p.locations || []).reduce((s,l) => s + (l.quantity||0), 0) || (p.batches || []).reduce((s,b) => s + (b.quantity||0), 0);
      return qty <= (p.lowStockThreshold || 0);
    });
    res.json(low);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to compute low stock' });
  }
};
