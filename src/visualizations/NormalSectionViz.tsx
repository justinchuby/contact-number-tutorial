import { useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// The cutting plane visualization - plane containing tangent u and normal space
function CuttingPlane({ 
  tangent, 
  surfaceNormal, 
  show 
}: { 
  tangent: THREE.Vector3;
  surfaceNormal: THREE.Vector3;
  show: boolean;
}) {
  if (!show) return null;
  
  // The cutting plane E(p,u) contains: the tangent direction u and the normal space
  // For a surface in E³, normal space is 1D (just the surface normal)
  // So E(p,u) is spanned by u and the surface normal n
  // For a unit sphere, this plane passes through the origin
  
  const geometry = useMemo(() => {
    const u = tangent.clone().normalize();
    const n = surfaceNormal.clone().normalize();
    
    // Create a quad in the plane spanned by u and n, centered at origin
    const size = 1.5;
    const center = new THREE.Vector3(0, 0, 0);
    const vertices = new Float32Array([
      // Four corners of the plane
      ...center.clone().add(u.clone().multiplyScalar(size)).add(n.clone().multiplyScalar(size)).toArray(),
      ...center.clone().add(u.clone().multiplyScalar(-size)).add(n.clone().multiplyScalar(size)).toArray(),
      ...center.clone().add(u.clone().multiplyScalar(-size)).add(n.clone().multiplyScalar(-size)).toArray(),
      ...center.clone().add(u.clone().multiplyScalar(size)).add(n.clone().multiplyScalar(-size)).toArray(),
    ]);
    
    const indices = new Uint16Array([0, 1, 2, 0, 2, 3]);
    
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geom.setIndex(new THREE.BufferAttribute(indices, 1));
    geom.computeVertexNormals();
    
    return geom;
  }, [tangent, surfaceNormal]);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial 
        color="#ff99ff" 
        emissive="#aa44ff"
        emissiveIntensity={0.3}
        transparent 
        opacity={0.5} 
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// The intersection curve (normal section)
function NormalSectionCurve({ 
  point,
  tangent, 
  surfaceNormal,
  color = '#ff00ff' 
}: { 
  point: THREE.Vector3;
  tangent: THREE.Vector3;
  surfaceNormal: THREE.Vector3;
  color?: string;
}) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    // The normal section is the intersection of sphere with the plane E(p,u)
    // E(p,u) is spanned by tangent direction u and surface normal n
    // For a unit sphere centered at origin, this plane passes through origin
    // So the intersection is a great circle
    
    // The great circle lies in the plane spanned by u and n
    // We can parameterize it as: cos(θ)*u + sin(θ)*n
    const u = tangent.clone().normalize();
    const n = surfaceNormal.clone().normalize();
    
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      const p = u.clone().multiplyScalar(Math.cos(theta))
                 .add(n.clone().multiplyScalar(Math.sin(theta)));
      pts.push(p);
    }
    return pts;
  }, [point, tangent, surfaceNormal]);

  return <Line points={points} color={color} lineWidth={3} />;
}

// Tangent vector visualization
function TangentVector({ position, direction, color = '#00ff00', length = 0.5 }: { 
  position: THREE.Vector3; 
  direction: THREE.Vector3; 
  color?: string;
  length?: number;
}) {
  const end = position.clone().add(direction.clone().normalize().multiplyScalar(length));
  
  return (
    <>
      <Line 
        points={[position, end]} 
        color={color} 
        lineWidth={4}
      />
      {/* Arrow head */}
      <mesh position={end}>
        <coneGeometry args={[0.03, 0.08, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </>
  );
}

// Normal vector
function NormalVector({ position, color = '#ff0000' }: { position: THREE.Vector3; color?: string }) {
  const normal = position.clone().normalize();
  const end = position.clone().add(normal.multiplyScalar(0.4));
  
  return (
    <>
      <Line 
        points={[position, end]} 
        color={color} 
        lineWidth={3}
      />
      <mesh position={end}>
        <coneGeometry args={[0.025, 0.06, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </>
  );
}

function NormalSectionScene() {
  const [showPlane] = useState(true);
  const [time, setTime] = useState(0);
  
  useFrame(({ clock }) => {
    setTime(clock.getElapsedTime());
  });

  // Point on sphere
  const phi = Math.PI / 4;
  const theta = time * 0.3;
  const point = new THREE.Vector3(
    Math.sin(phi) * Math.cos(theta),
    Math.sin(phi) * Math.sin(theta),
    Math.cos(phi)
  );
  
  // Tangent direction (along longitude)
  const tangent = new THREE.Vector3(
    -Math.sin(theta),
    Math.cos(theta),
    0
  ).normalize();
  
  // Normal is just the position for a unit sphere
  const normal = point.clone().normalize();

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {/* Sphere */}
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial 
          color="#1a3a5c" 
          transparent 
          opacity={0.4}
        />
      </Sphere>
      
      {/* Wireframe */}
      <Sphere args={[1.001, 16, 16]}>
        <meshBasicMaterial color="#334455" wireframe />
      </Sphere>
      
      {/* The cutting plane E(p,u) - contains tangent u and surface normal */}
      <CuttingPlane 
        tangent={tangent} 
        surfaceNormal={normal} 
        show={showPlane} 
      />
      
      {/* Normal section curve */}
      <NormalSectionCurve point={point} tangent={tangent} surfaceNormal={normal} color="#ff00ff" />
      
      {/* Point on surface */}
      <mesh position={point}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Tangent vector */}
      <TangentVector position={point} direction={tangent} color="#00ff00" />
      
      {/* Normal vector */}
      <NormalVector position={point} color="#ff4444" />
      
      <OrbitControls enableZoom={true} enablePan={false} />
    </>
  );
}

export default function NormalSectionViz() {
  return (
    <div className="w-full h-80 bg-slate-900 rounded-xl overflow-hidden">
      <Canvas camera={{ position: [2.5, 2, 2.5], fov: 45 }}>
        <NormalSectionScene />
      </Canvas>
    </div>
  );
}

export function NormalSectionVizWithLabels() {
  return (
    <div className="space-y-4">
      <NormalSectionViz />
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-fuchsia-500 rounded"></div>
          <span className="text-slate-300">法截面 (Normal Section)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-green-500 rounded"></div>
          <span className="text-slate-300">切向量 u (Tangent)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-red-500 rounded"></div>
          <span className="text-slate-300">法向量 (Normal)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-500/30 rounded border border-purple-500"></div>
          <span className="text-slate-300">切割平面 E(p,u)</span>
        </div>
      </div>
    </div>
  );
}
