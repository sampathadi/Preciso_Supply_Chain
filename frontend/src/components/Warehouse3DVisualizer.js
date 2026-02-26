import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';

function BoxMesh({ b }) {
  // position: x (right), z (forward), y (up)
  const posX = b.x - 0; // centered in scene handled by camera
  const posZ = b.y - 0;
  const posY = b.h / 2 + b.z;
  return (
    <mesh position={[posX, posY, posZ]}>
      <boxGeometry args={[b.l, b.h, b.w]} />
      <meshStandardMaterial color={b.color || '#60a5fa'} />
      <Html position={[0, b.h/2 + 0.02, 0]} center>
        <div style={{ background:'rgba(255,255,255,0.9)', padding:'2px 6px', borderRadius:4, fontSize:11 }}>{b.id}</div>
      </Html>
    </mesh>
  );
}

export default function Warehouse3DVisualizer({ length=10, breadth=6, height=3, boxes=[] }) {
  const centered = useMemo(() => boxes.map(b => ({ ...b, x: b.x - length/2, y: b.y - breadth/2 })), [boxes, length, breadth]);

  return (
    <Canvas camera={{ position: [length, Math.max(length,breadth), breadth], fov: 45 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 20, 10]} intensity={0.8} />
      <Suspense fallback={null}>
        <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[length, breadth]} />
          <meshStandardMaterial color={'#eef2ff'} />
        </mesh>

        <mesh position={[0, height/2, 0]}> 
          <boxGeometry args={[length, height, breadth]} />
          <meshBasicMaterial color={'#0f172a'} wireframe opacity={0.08} transparent />
        </mesh>

        {centered.map(b => <BoxMesh key={b.id} b={b} />)}

        <gridHelper args={[Math.max(length,breadth), 10, '#c7d2fe', '#e2e8f0']} position={[0, 0.001, 0]} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}
