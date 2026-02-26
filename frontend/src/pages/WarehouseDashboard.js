import React, { useState, useMemo } from 'react';
import '../styles/WarehouseDashboard.css';
import WarehouseVisualizerR3F from '../components/WarehouseVisualizerR3F';

export default function WarehouseDashboard() {
  // Warehouse dimensions (meters)
  const [length, setLength] = useState(20);
  const [breadth, setBreadth] = useState(12);
  const [height, setHeight] = useState(4);
  const [walkingPct, setWalkingPct] = useState(10);

  // Box types list
  const [boxTypes, setBoxTypes] = useState([
    { id: 1, name: 'Small Box', l: 0.5, w: 0.4, h: 0.3, weight: 2.0, qty: 100, color: '#ef4444' },
    { id: 2, name: 'Medium Box', l: 0.8, w: 0.6, h: 0.5, weight: 6.0, qty: 60, color: '#3b82f6' },
    { id: 3, name: 'Tall Box', l: 0.6, w: 0.6, h: 1.2, weight: 8.0, qty: 30, color: '#10b981' }
  ]);

  const [results, setResults] = useState(null);

  // Simple greedy packing algorithm: allocate floor footprint slots to box types sorted by weight (heavier first), allow stacking
  const analyze = () => {
    const usableFloor = (length * breadth) * (1 - walkingPct / 100);
    const H = height;

    // clone and sort by weight descending
    const types = [...boxTypes].sort((a, b) => b.weight - a.weight);

    let availableFloor = usableFloor;
    const placements = [];
    let totalPlaced = 0;
    let occupiedVolume = 0;

    for (const t of types) {
      const footprint = t.l * t.w;
      if (footprint <= 0) continue;
      const maxFootprintSlots = Math.floor(availableFloor / footprint);
      const stackLayers = Math.max(1, Math.floor(H / t.h));
      const maxBoxesPossible = maxFootprintSlots * stackLayers;
      const toPlace = Math.min(t.qty || Infinity, maxBoxesPossible);

      if (toPlace <= 0) continue;

      const usedFootprintSlots = Math.ceil(toPlace / stackLayers);
      availableFloor -= usedFootprintSlots * footprint;

      // create placements for visualization: one entry per box with coordinates in meters
      let placed = 0;
      let slotIndex = 0;
      const slotsPerRow = Math.max(1, Math.floor(length / t.l));

      while (placed < toPlace) {
        const layer = Math.floor(placed / slotsPerRow / Math.max(1, Math.floor(breadth / t.w)));
        const slot = slotIndex;
        const col = slot % slotsPerRow;
        const row = Math.floor(slot / slotsPerRow);
        const x = (t.l / 2) + col * t.l;
        const y = (t.w / 2) + row * t.w;
        const z = (Math.floor((placed % (slotsPerRow * Math.max(1, Math.floor(breadth / t.w)))) / slotsPerRow)) * t.h;

        placements.push({
          id: `${t.id}-${placed}`,
          name: t.name,
          l: t.l,
          w: t.w,
          h: t.h,
          weight: t.weight,
          x,
          y,
          z,
          color: t.color
        });

        placed += 1;
        slotIndex += 1;
      }

      totalPlaced += toPlace;
      occupiedVolume += toPlace * t.l * t.w * t.h;
    }

    const warehouseVolume = length * breadth * height;
    const occupancyPercent = Math.min(100, (occupiedVolume / warehouseVolume) * 100);

    setResults({
      usableFloor,
      warehouseVolume,
      occupiedVolume,
      occupancyPercent: Math.round(occupancyPercent * 100) / 100,
      totalPlaced,
      placements
    });
  };

  const handleAddType = () => {
    const id = Date.now();
    setBoxTypes([...boxTypes, { id, name: 'New Box', l: 0.5, w: 0.5, h: 0.5, weight: 1, qty: 10, color: '#8b5cf6' }]);
  };

  const updateType = (id, key, val) => {
    setBoxTypes(boxTypes.map(t => t.id === id ? { ...t, [key]: val } : t));
  };

  const removeType = (id) => setBoxTypes(boxTypes.filter(t => t.id !== id));

  const visualBoxes = useMemo(() => results?.placements || [], [results]);



  return (
    <div className="warehouse-page container">
      <h2>Warehouse Dashboard</h2>
      <div className="warehouse-grid-layout">
        <div className="panel card">
          <h4>Warehouse Size (meters)</h4>
          <label>Length: <input type="number" value={length} onChange={e=>setLength(parseFloat(e.target.value)||0)} /></label>
          <label>Breadth: <input type="number" value={breadth} onChange={e=>setBreadth(parseFloat(e.target.value)||0)} /></label>
          <label>Height: <input type="number" value={height} onChange={e=>setHeight(parseFloat(e.target.value)||0)} /></label>
          <label>Walking space (% of floor): <input type="number" value={walkingPct} onChange={e=>setWalkingPct(parseFloat(e.target.value)||0)} /></label>

          <h4 style={{marginTop:12}}>Box Types</h4>
          {boxTypes.map(t => (
            <div key={t.id} className="box-type-row">
              <input value={t.name} onChange={e=>updateType(t.id,'name',e.target.value)} />
              <input type="number" step="0.1" value={t.l} onChange={e=>updateType(t.id,'l',parseFloat(e.target.value)||0)} />
              <input type="number" step="0.1" value={t.w} onChange={e=>updateType(t.id,'w',parseFloat(e.target.value)||0)} />
              <input type="number" step="0.1" value={t.h} onChange={e=>updateType(t.id,'h',parseFloat(e.target.value)||0)} />
              <input type="number" step="0.1" value={t.weight} onChange={e=>updateType(t.id,'weight',parseFloat(e.target.value)||0)} />
              <input type="number" value={t.qty} onChange={e=>updateType(t.id,'qty',parseInt(e.target.value)||0)} />
              <input type="color" value={t.color} onChange={e=>updateType(t.id,'color',e.target.value)} />
              <button onClick={()=>removeType(t.id)}>Remove</button>
            </div>
          ))}
          <div style={{marginTop:8}}>
            <button onClick={handleAddType}>Add Box Type</button>
            <button onClick={analyze} style={{marginLeft:8}}>Analyze & Arrange</button>
          </div>
        </div>

        <div className="panel card">
          <h4>Insights</h4>
          {results ? (
            <div>
              <p><strong>Usable floor area:</strong> {results.usableFloor.toFixed(2)} m²</p>
              <p><strong>Warehouse volume:</strong> {results.warehouseVolume.toFixed(2)} m³</p>
              <p><strong>Occupied volume:</strong> {results.occupiedVolume.toFixed(2)} m³</p>
              <p><strong>Occupancy:</strong> {results.occupancyPercent}%</p>
              <p><strong>Total boxes placed:</strong> {results.totalPlaced}</p>
            </div>
          ) : (
            <p>No analysis yet — click <strong>Analyze & Arrange</strong>.</p>
          )}

          <h4 style={{marginTop:12}}>Visualization</h4>
          <div style={{ height: 420 }}>
            <WarehouseVisualizerR3F length={length} breadth={breadth} height={height} boxes={visualBoxes} />
          </div>
        </div>
      </div>
    </div>
  );
}
