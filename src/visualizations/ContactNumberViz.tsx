import { useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';

// Geodesic curve on sphere
function GeodesicCurve({ 
  start, 
  direction, 
  color = '#00ffff', 
  segments = 100 
}: { 
  start: THREE.Vector3; 
  direction: THREE.Vector3; 
  color?: string;
  segments?: number;
}) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const n = start.clone().normalize();
    const u = direction.clone().sub(n.clone().multiplyScalar(direction.dot(n))).normalize();
    
    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * Math.PI * 0.4 - Math.PI * 0.2; // -36° to +36°
      const p = n.clone().multiplyScalar(Math.cos(t)).add(u.clone().multiplyScalar(Math.sin(t)));
      pts.push(p);
    }
    return pts;
  }, [start, direction, segments]);

  return <Line points={points} color={color} lineWidth={4} />;
}

// Normal section curve (for sphere, identical to geodesic)
function NormalSectionCurve({ 
  start, 
  direction, 
  color = '#ff00ff',
  offset = 0,
  segments = 100 
}: { 
  start: THREE.Vector3; 
  direction: THREE.Vector3; 
  color?: string;
  offset?: number;
  segments?: number;
}) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const n = start.clone().normalize();
    const u = direction.clone().sub(n.clone().multiplyScalar(direction.dot(n))).normalize();
    
    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * Math.PI * 0.4 - Math.PI * 0.2;
      // Add small offset to show difference (for non-sphere cases)
      const p = n.clone().multiplyScalar(Math.cos(t) + offset * Math.sin(t) * Math.sin(t))
        .add(u.clone().multiplyScalar(Math.sin(t)));
      p.normalize(); // Project back to sphere
      pts.push(p);
    }
    return pts;
  }, [start, direction, offset, segments]);

  return <Line points={points} color={color} lineWidth={3} dashed={offset !== 0} dashScale={30} />;
}

// Point marker
function PointMarker({ position, color = '#ffffff', label }: { 
  position: THREE.Vector3; 
  color?: string;
  label?: string;
}) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
      {label && (
        <Html position={[0.08, 0.08, 0]} style={{ pointerEvents: 'none' }}>
          <div className="text-white text-xs bg-slate-900/80 px-1 rounded">{label}</div>
        </Html>
      )}
    </group>
  );
}

function ContactNumberScene({ contactNumber }: { contactNumber: number }) {
  const [time, setTime] = useState(0);
  
  useFrame(({ clock }) => {
    setTime(clock.getElapsedTime());
  });

  const point = new THREE.Vector3(0, 0, 1);
  const direction = new THREE.Vector3(1, 0, 0);
  
  // For demonstration, we show how contact number affects curve difference
  const offset = contactNumber >= 3 ? 0 : 0.05 * Math.sin(time);

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {/* Sphere */}
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial color="#1a3a5c" transparent opacity={0.3} />
      </Sphere>
      <Sphere args={[1.001, 16, 16]}>
        <meshBasicMaterial color="#334455" wireframe />
      </Sphere>
      
      {/* Geodesic γ_u */}
      <GeodesicCurve start={point} direction={direction} color="#00ffff" />
      
      {/* Normal section β_u */}
      <NormalSectionCurve start={point} direction={direction} color="#ff00ff" offset={offset} />
      
      {/* Point p */}
      <PointMarker position={point} color="#ffffff" label="p" />
      
      {/* Direction u */}
      <Line 
        points={[point, point.clone().add(direction.clone().normalize().multiplyScalar(0.3))]} 
        color="#00ff00" 
        lineWidth={3} 
      />
      
      <OrbitControls enableZoom={true} enablePan={false} />
    </>
  );
}

export default function ContactNumberViz({ contactNumber = 2 }: { contactNumber?: number }) {
  return (
    <div className="w-full h-80 bg-slate-900 rounded-xl overflow-hidden">
      <Canvas camera={{ position: [1.5, 1.5, 2], fov: 45 }}>
        <ContactNumberScene contactNumber={contactNumber} />
      </Canvas>
    </div>
  );
}

export function ContactNumberVizWithControls() {
  const [contactNumber, setContactNumber] = useState(3);
  
  return (
    <div className="space-y-4">
      <ContactNumberViz contactNumber={contactNumber} />
      
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-cyan-400 rounded"></div>
          <span className="text-slate-300">测地线 γ_u (Geodesic)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-fuchsia-500 rounded"></div>
          <span className="text-slate-300">法截面 β_u (Normal Section)</span>
        </div>
      </div>
      
      <div className="bg-slate-800 rounded-lg p-4">
        <p className="text-slate-300 mb-2">接触阶数检验 / Contact Order Check:</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[0, 1, 2, 3].map((order) => (
            <div key={order} className="flex items-center gap-2">
              <span className="text-cyan-400 font-mono">{order}阶:</span>
              <span className={order <= contactNumber ? 'text-green-400' : 'text-red-400'}>
                {order <= contactNumber ? '✓ 相同' : '✗ 不同'}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <span className="text-slate-400">模拟接触数:</span>
        <input 
          type="range" 
          min="2" 
          max="4" 
          value={contactNumber}
          onChange={(e) => setContactNumber(parseInt(e.target.value))}
          className="flex-1"
        />
        <span className="text-cyan-400 font-bold">c# = {contactNumber === 4 ? '∞' : contactNumber}</span>
      </div>
      
      <p className="text-slate-400 text-sm">
        球面的接触数为∞（所有阶导数相同）。滑动查看不同接触数的效果。
      </p>
    </div>
  );
}
