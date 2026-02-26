import React, { useState, useMemo } from 'react';
import '../styles/Warehouse3D.css';

// Sample warehouse data: a grid of positions and boxes with sizes (w,h,d in grid units)
const SAMPLE_WAREHOUSE = {
  cols: 8,
  rows: 5,
  cellSize: 64, // px per grid unit
  boxes: [
    { id: 'B1', x: 0, y: 0, z: 0, w: 1, h: 1, d: 1, color: '#EF4444' },
    { id: 'B2', x: 1, y: 0, z: 0, w: 2, h: 1, d: 1, color: '#F59E0B' },
    { id: 'B3', x: 3, y: 0, z: 0, w: 1, h: 2, d: 1, color: '#10B981' },
    { id: 'B4', x: 5, y: 0, z: 0, w: 1, h: 1, d: 2, color: '#3B82F6' },
    { id: 'B5', x: 0, y: 1, z: 0, w: 3, h: 1, d: 1, color: '#8B5CF6' },
    { id: 'B6', x: 4, y: 2, z: 0, w: 2, h: 1, d: 1, color: '#06B6D4' },
    { id: 'PALLET', x: 2, y: 3, z: 0, w: 4, h: 1, d: 1, color: '#F472B6' }
  ]
};

function Warehouse3D({ warehouse = SAMPLE_WAREHOUSE }) {
  const [rotX, setRotX] = useState(30);
  const [rotY, setRotY] = useState(-30);
  const [zoom, setZoom] = useState(0.9);
  const [showGrid, setShowGrid] = useState(true);

  const size = useMemo(() => ({
    width: warehouse.cols * warehouse.cellSize,
    depth: warehouse.rows * warehouse.cellSize
  }), [warehouse]);

  return (
    <div className="warehouse-wrap card">
      <div className="warehouse-header">
        <h3 style={{margin:0}}>Warehouse 3D — Sample Layout</h3>
        <div className="warehouse-controls">
          <label>Rotate X <input aria-label="rotate-x" type="range" min="0" max="70" value={rotX} onChange={e=>setRotX(+e.target.value)} /></label>
          <label>Rotate Y <input aria-label="rotate-y" type="range" min="-180" max="180" value={rotY} onChange={e=>setRotY(+e.target.value)} /></label>
          <label>Zoom <input aria-label="zoom" type="range" min="0.5" max="1.6" step="0.05" value={zoom} onChange={e=>setZoom(+e.target.value)} /></label>
          <label style={{display:'inline-flex',alignItems:'center',gap:8}}><input type="checkbox" checked={showGrid} onChange={e=>setShowGrid(e.target.checked)} /> Grid</label>
        </div>
      </div>

      <div className="warehouse-stage" style={{ perspective: 1200 }}>
        <div
          className="warehouse-scene"
          style={{
            width: size.width + 120,
            height: size.depth + 120,
            transform: `scale(${zoom}) rotateX(${rotX}deg) rotateY(${rotY}deg)`
          }}
        >
          <div
            className={`warehouse-floor ${showGrid ? 'with-grid' : ''}`}
            style={{ width: size.width, height: size.depth }}
          >
            {/* render grid cells (background only) */}
            {showGrid && (
              <div
                className="warehouse-grid"
                style={{
                  backgroundSize: `${warehouse.cellSize}px ${warehouse.cellSize}px`
                }}
              />
            )}

            {/* Render boxes as 3D-styled divs */}
            {warehouse.boxes.map(box => {
              const left = box.x * warehouse.cellSize;
              const top = box.y * warehouse.cellSize;
              const width = box.w * warehouse.cellSize;
              const height = box.d * warehouse.cellSize; // using depth as visual height on floor

              return (
                <div
                  key={box.id}
                  className="warehouse-box"
                  style={{
                    left: left + 20,
                    top: top + 20,
                    width,
                    height,
                    transform: `translateZ(${box.h * 8}px)`,
                  }}
                >
                  <div className="box-face front" style={{ background: `linear-gradient(180deg, ${box.color}, rgba(0,0,0,0.08))` }}>{box.id}</div>
                  <div className="box-face top" style={{ background: `linear-gradient(180deg, ${shade(box.color, 14)}, rgba(255,255,255,0.02))` }} />
                  <div className="box-face side" style={{ background: `linear-gradient(180deg, ${shade(box.color, -10)}, rgba(0,0,0,0.06))` }} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="warehouse-legend">
        <strong>Legend:</strong>
        {warehouse.boxes.map(b=> (
          <span key={b.id} className="legend-item"><span className="legend-swatch" style={{background:b.color}}/> {b.id}</span>
        ))}
      </div>
    </div>
  );
}

// Small color helper to slightly lighten/darken colors
function shade(hex, percent) {
  try {
    const h = hex.replace('#','');
    const num = parseInt(h,16);
    let r = (num >> 16) + percent;
    let g = ((num >> 8) & 0x00FF) + percent;
    let b = (num & 0x0000FF) + percent;
    r = Math.max(Math.min(255, r), 0);
    g = Math.max(Math.min(255, g), 0);
    b = Math.max(Math.min(255, b), 0);
    return `rgb(${r}, ${g}, ${b})`;
  } catch (e) {
    return hex;
  }
}

export default Warehouse3D;
