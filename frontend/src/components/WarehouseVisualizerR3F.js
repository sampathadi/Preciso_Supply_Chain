import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';

function BoxMesh({ box }) {
  const { l, w, h, x, y, z, color, name } = box;
  // convert floor coords (meters) to 3D positions: x-right, z-forward, y-up
  const posX = x - 0; // center reference
  const posZ = y - 0;
  const posY = h / 2 + z; // stack height

  return (
    <mesh position={[posX, posY, posZ]}>
      <boxGeometry args={[l, h, w]} />
      <meshStandardMaterial color={color} />
      <Html position={[0, h/2 + 0.03, 0]} center>
        <div style={{background:'rgba(255,255,255,0.85)', padding:'2px 6px', borderRadius:4, fontSize:11}}>{name}</div>
      </Html>
    </mesh>
  );
}

export default function WarehouseVisualizerR3F({ length=10, breadth=6, height=3, boxes=[] }) {
  // center boxes so scene is centered
  const centeredBoxes = useMemo(() => boxes.map(b => ({ ...b, x: b.x - length/2, y: b.y - breadth/2 })), [boxes, length, breadth]);

  return (
    <Canvas camera={{ position: [0, Math.max(length,breadth), Math.max(length,breadth)], fov: 45 }} style={{ background: '#f8fafc', borderRadius:8 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 20, 10]} intensity={0.8} />
      <Suspense fallback={null}>
        {/* floor */}
        <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[length, breadth]} />
          <meshStandardMaterial color={'#eef2ff'} />
        </mesh>

        {/* boundary box wireframe */}
        <mesh position={[0, height/2, 0]}>
          <boxGeometry args={[length, height, breadth]} />
          <meshBasicMaterial color={'#0f172a'} wireframe opacity={0.08} transparent />
        </mesh>

        {centeredBoxes.map(b => (
          <BoxMesh key={b.id} box={b} />
        ))}

        <gridHelper args={[Math.max(length,breadth), 10, '#c7d2fe', '#e2e8f0']} position={[0, 0.001, 0]} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}
