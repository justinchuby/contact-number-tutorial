import { useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';
import * as THREE from 'three';

// Curve embedded vs immersed
function EmbeddedCurve({ color = '#00ffff' }: { color?: string }) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 100; i++) {
      const t = (i / 100) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(t), Math.sin(t), 0));
    }
    return pts;
  }, []);
  
  return <Line points={points} color={color} lineWidth={4} />;
}

// Figure-8 curve (immersed but not embedded - has self-intersection)
function ImmersedCurve({ color = '#ff6600' }: { color?: string }) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 100; i++) {
      const t = (i / 100) * Math.PI * 2;
      // Figure-8 (lemniscate)
      const scale = 0.8;
      pts.push(new THREE.Vector3(
        scale * Math.sin(t),
        scale * Math.sin(t) * Math.cos(t),
        0
      ));
    }
    return pts;
  }, []);
  
  return <Line points={points} color={color} lineWidth={4} />;
}

// Self-intersection point marker
function IntersectionMarker() {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.5} />
    </mesh>
  );
}

function EmbeddingScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {/* Embedded circle (left) */}
      <group position={[-1.5, 0, 0]}>
        <EmbeddedCurve />
      </group>
      
      {/* Immersed figure-8 (right) */}
      <group position={[1.5, 0, 0]}>
        <ImmersedCurve />
        <IntersectionMarker />
      </group>
      
      <OrbitControls enableZoom={true} enablePan={false} />
    </>
  );
}

export function EmbeddingViz() {
  return (
    <div className="w-full h-64 bg-slate-900 rounded-xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <EmbeddingScene />
      </Canvas>
    </div>
  );
}

export function EmbeddingVizWithLabels() {
  return (
    <div className="space-y-4">
      <EmbeddingViz />
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-slate-800 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-1 bg-cyan-400 rounded"></div>
            <span className="text-cyan-400 font-semibold">嵌入 (Embedding)</span>
          </div>
          <p className="text-slate-400 text-xs">没有自相交，是真正的"子流形"</p>
        </div>
        <div className="bg-slate-800 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-1 bg-orange-500 rounded"></div>
            <span className="text-orange-400 font-semibold">浸入 (Immersion)</span>
          </div>
          <p className="text-slate-400 text-xs">允许自相交（红点），局部是"好的"</p>
        </div>
      </div>
    </div>
  );
}

// Second Fundamental Form visualization
function SecondFundamentalFormScene() {
  const [curvature, setCurvature] = useState(1);
  
  useFrame(({ clock }) => {
    setCurvature(1 + 0.5 * Math.sin(clock.getElapsedTime() * 0.5));
  });

  // Surface with varying curvature
  const surfacePoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 20; i++) {
      const u = (i / 20 - 0.5) * 2;
      for (let j = 0; j <= 20; j++) {
        const v = (j / 20 - 0.5) * 2;
        // Paraboloid with adjustable curvature
        const z = -curvature * (u * u + v * v) * 0.3;
        points.push(new THREE.Vector3(u, v, z));
      }
    }
    return points;
  }, [curvature]);

  // Create line strips for wireframe
  const lines = useMemo(() => {
    const result: THREE.Vector3[][] = [];
    const gridSize = 21;
    
    // Horizontal lines
    for (let i = 0; i < gridSize; i++) {
      const line: THREE.Vector3[] = [];
      for (let j = 0; j < gridSize; j++) {
        line.push(surfacePoints[i * gridSize + j]);
      }
      result.push(line);
    }
    
    // Vertical lines
    for (let j = 0; j < gridSize; j++) {
      const line: THREE.Vector3[] = [];
      for (let i = 0; i < gridSize; i++) {
        line.push(surfacePoints[i * gridSize + j]);
      }
      result.push(line);
    }
    
    return result;
  }, [surfacePoints]);

  // Normal vector at center
  

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 10]} intensity={1} />
      
      {/* Surface wireframe */}
      {lines.map((line, idx) => (
        <Line key={idx} points={line} color="#4488ff" lineWidth={1} />
      ))}
      
      {/* Center point */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Normal vector */}
      <Line 
        points={[new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0.6)]} 
        color="#ff4444" 
        lineWidth={3} 
      />
      
      {/* h(u,u) arrow showing curvature direction */}
      <Line 
        points={[
          new THREE.Vector3(0, 0, 0), 
          new THREE.Vector3(0, 0, -0.4 * curvature)
        ]} 
        color="#00ff00" 
        lineWidth={4} 
      />
      
      <OrbitControls enableZoom={true} enablePan={false} />
    </>
  );
}

export function SecondFundamentalFormViz() {
  return (
    <div className="w-full h-64 bg-slate-900 rounded-xl overflow-hidden">
      <Canvas camera={{ position: [3, 3, 3], fov: 45 }}>
        <SecondFundamentalFormScene />
      </Canvas>
    </div>
  );
}

export function SecondFundamentalFormVizWithLabels() {
  return (
    <div className="space-y-4">
      <SecondFundamentalFormViz />
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-blue-400 rounded"></div>
          <span className="text-slate-300">曲面 M</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-red-500 rounded"></div>
          <span className="text-slate-300">法向量 n</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-green-500 rounded"></div>
          <span className="text-slate-300">h(u,u) 弯曲方向</span>
        </div>
      </div>
      <p className="text-slate-400 text-xs">
        观察：曲率变化时，h(u,u) 的长度也随之变化。第二基本形式测量曲面的"弯曲程度"。
      </p>
    </div>
  );
}
