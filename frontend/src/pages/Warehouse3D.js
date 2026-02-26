import React, { useState, useMemo } from 'react';
import Warehouse3DVisualizer from '../components/Warehouse3DVisualizer';

export default function Warehouse3D() {
  const [length, setLength] = useState(20);
  const [breadth, setBreadth] = useState(12);
  const [height, setHeight] = useState(4);
  const [boxL, setBoxL] = useState(0.5);
  const [boxW, setBoxW] = useState(0.4);
  const [boxH, setBoxH] = useState(0.3);
  const [qty, setQty] = useState(20);

  const boxes = useMemo(() => {
    const arr = [];
    for (let i = 0; i < qty; i++) {
      // simple grid placement for preview
      const cols = Math.max(1, Math.floor(length / boxL));
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = (boxL / 2) + col * boxL;
      const y = (boxW / 2) + row * boxW;
      const z = 0;
      arr.push({ id: `b${i}`, l: boxL, w: boxW, h: boxH, x, y, z, color: '#3b82f6' });
    }
    return arr;
  }, [qty, boxL, boxW, boxH, length]);

  return (
    <div style={{ padding: 16 }}>
      <h2>Warehouse 3D — Manual Layout</h2>
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ width: 340 }}>
          <h4>Warehouse Size (m)</h4>
          <label style={{display:'block',marginBottom:8}}>Length: <input type="number" value={length} onChange={e=>setLength(parseFloat(e.target.value)||0)} /></label>
          <label style={{display:'block',marginBottom:8}}>Breadth: <input type="number" value={breadth} onChange={e=>setBreadth(parseFloat(e.target.value)||0)} /></label>
          <label style={{display:'block',marginBottom:8}}>Height: <input type="number" value={height} onChange={e=>setHeight(parseFloat(e.target.value)||0)} /></label>

          <h4 style={{marginTop:12}}>Box Type</h4>
          <label style={{display:'block',marginBottom:8}}>L: <input type="number" step="0.1" value={boxL} onChange={e=>setBoxL(parseFloat(e.target.value)||0)} /></label>
          <label style={{display:'block',marginBottom:8}}>W: <input type="number" step="0.1" value={boxW} onChange={e=>setBoxW(parseFloat(e.target.value)||0)} /></label>
          <label style={{display:'block',marginBottom:8}}>H: <input type="number" step="0.1" value={boxH} onChange={e=>setBoxH(parseFloat(e.target.value)||0)} /></label>
          <label style={{display:'block',marginBottom:8}}>Quantity: <input type="number" value={qty} onChange={e=>setQty(parseInt(e.target.value)||0)} /></label>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ height: 520, borderRadius: 8, overflow: 'hidden', background: '#fff' }}>
            <Warehouse3DVisualizer length={length} breadth={breadth} height={height} boxes={boxes} />
          </div>
        </div>
      </div>
    </div>
  );
}
