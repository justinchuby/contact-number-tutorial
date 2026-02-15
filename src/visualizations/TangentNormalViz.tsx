import { useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Tangent plane at a point on sphere
function TangentPlane({ point, size = 0.8 }: { point: THREE.Vector3; size?: number }) {
  const geometry = useMemo(() => {
    const n = point.clone().normalize();
    
    // Find two perpendicular vectors in the tangent plane
    let u = new THREE.Vector3(1, 0, 0);
    if (Math.abs(n.dot(u)) > 0.9) {
      u = new THREE.Vector3(0, 1, 0);
    }
    u.sub(n.clone().multiplyScalar(n.dot(u))).normalize();
    const v = new THREE.Vector3().crossVectors(n, u);
    
    const p = point.clone().multiplyScalar(1.01); // Slightly above surface
    
    const vertices = new Float32Array([
      ...p.clone().add(u.clone().multiplyScalar(size)).add(v.clone().multiplyScalar(size)).toArray(),
      ...p.clone().add(u.clone().multiplyScalar(-size)).add(v.clone().multiplyScalar(size)).toArray(),
      ...p.clone().add(u.clone().multiplyScalar(-size)).add(v.clone().multiplyScalar(-size)).toArray(),
      ...p.clone().add(u.clone().multiplyScalar(size)).add(v.clone().multiplyScalar(-size)).toArray(),
    ]);
    
    const indices = new Uint16Array([0, 1, 2, 0, 2, 3]);
    
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geom.setIndex(new THREE.BufferAttribute(indices, 1));
    
    return geom;
  }, [point, size]);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial 
        color="#00ff88" 
        emissive="#00aa44"
        emissiveIntensity={0.3}
        transparent 
        opacity={0.4} 
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Normal vector arrow
function NormalArrow({ point, length = 0.5, color = '#ff4444' }: { point: THREE.Vector3; length?: number; color?: string }) {
  const n = point.clone().normalize();
  const start = point.clone().multiplyScalar(1.01);
  const end = start.clone().add(n.clone().multiplyScalar(length));
  
  return (
    <>
      <Line points={[start, end]} color={color} lineWidth={4} />
      <mesh position={end} rotation={[0, 0, Math.atan2(n.y, n.x)]}>
        <coneGeometry args={[0.04, 0.1, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
      </mesh>
    </>
  );
}

// Tangent vectors
function TangentVectors({ point }: { point: THREE.Vector3 }) {
  const { u, v } = useMemo(() => {
    const n = point.clone().normalize();
    let u = new THREE.Vector3(1, 0, 0);
    if (Math.abs(n.dot(u)) > 0.9) u = new THREE.Vector3(0, 1, 0);
    u.sub(n.clone().multiplyScalar(n.dot(u))).normalize();
    const v = new THREE.Vector3().crossVectors(n, u);
    return { u, v };
  }, [point]);

  const start = point.clone().multiplyScalar(1.01);
  const endU = start.clone().add(u.clone().multiplyScalar(0.4));
  const endV = start.clone().add(v.clone().multiplyScalar(0.4));

  return (
    <>
      <Line points={[start, endU]} color="#00ffff" lineWidth={3} />
      <Line points={[start, endV]} color="#ffff00" lineWidth={3} />
    </>
  );
}

function TangentNormalScene() {
  const [time, setTime] = useState(0);
  
  
  useFrame(({ clock }) => {
    setTime(clock.getElapsedTime());
  });

  // Moving point on sphere
  const theta = time * 0.3;
  const phi = Math.PI / 3 + Math.sin(time * 0.2) * 0.3;
  const point = new THREE.Vector3(
    Math.sin(phi) * Math.cos(theta),
    Math.sin(phi) * Math.sin(theta),
    Math.cos(phi)
  );

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {/* Sphere */}
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial color="#1a3a5c" transparent opacity={0.5} />
      </Sphere>
      <Sphere args={[1.001, 16, 16]}>
        <meshBasicMaterial color="#334455" wireframe />
      </Sphere>
      
      {/* Point on surface */}
      <mesh position={point}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Tangent plane */}
      <TangentPlane point={point} />
      
      {/* Normal vector */}
      <NormalArrow point={point} />
      
      {/* Tangent vectors */}
      <TangentVectors point={point} />
      
      <OrbitControls enableZoom={true} enablePan={false} />
    </>
  );
}

export default function TangentNormalViz() {
  return (
    <div className="w-full h-80 bg-slate-900 rounded-xl overflow-hidden">
      <Canvas camera={{ position: [2.5, 2, 2.5], fov: 45 }}>
        <TangentNormalScene />
      </Canvas>
    </div>
  );
}

export function TangentNormalVizWithLabels() {
  return (
    <div className="space-y-4">
      <TangentNormalViz />
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-400/50 rounded border border-green-400"></div>
          <span className="text-slate-300">切平面 T_pM (Tangent Plane)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-red-500 rounded"></div>
          <span className="text-slate-300">法向量 (Normal)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-cyan-400 rounded"></div>
          <div className="w-4 h-1 bg-yellow-400 rounded"></div>
          <span className="text-slate-300">切向量 (Tangent vectors)</span>
        </div>
      </div>
    </div>
  );
}
