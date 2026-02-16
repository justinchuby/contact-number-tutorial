import { useMemo, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Html } from '@react-three/drei';
import * as THREE from 'three';

type DirectionMode = 'axial' | 'circumferential' | 'diagonal';

// Cylinder surface mesh
function CylinderSurface({ radius = 1, height = 3 }: { radius?: number; height?: number }) {
  const geo = useMemo(() => {
    return new THREE.CylinderGeometry(radius, radius, height, 48, 1, true);
  }, [radius, height]);
  
  return (
    <group>
      <mesh geometry={geo}>
        <meshStandardMaterial color="#1a3a5c" transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>
      <mesh geometry={geo}>
        <meshBasicMaterial color="#334455" wireframe transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

// Point marker with label
function PointMarker({ position, color = '#ffffff', label }: { 
  position: [number, number, number]; 
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
        <Html position={[0.1, 0.1, 0]} style={{ pointerEvents: 'none' }}>
          <div className="text-white text-xs bg-slate-900/80 px-1.5 py-0.5 rounded whitespace-nowrap">{label}</div>
        </Html>
      )}
    </group>
  );
}

// Cutting plane visualization
function CuttingPlane({ position, normal, tangent, color = '#ff00ff', size = 1.2 }: {
  position: [number, number, number];
  normal: THREE.Vector3;
  tangent: THREE.Vector3;
  color?: string;
  size?: number;
}) {
  const geo = useMemo(() => {
    const n = normal.clone().normalize();
    // plane spanned by tangent and normal (to surface)
    const g = new THREE.BufferGeometry();
    const s = size;
    const v0 = new THREE.Vector3().addVectors(tangent.clone().multiplyScalar(-s), n.clone().multiplyScalar(-s));
    const v1 = new THREE.Vector3().addVectors(tangent.clone().multiplyScalar(s), n.clone().multiplyScalar(-s));
    const v2 = new THREE.Vector3().addVectors(tangent.clone().multiplyScalar(s), n.clone().multiplyScalar(s));
    const v3 = new THREE.Vector3().addVectors(tangent.clone().multiplyScalar(-s), n.clone().multiplyScalar(s));
    
    const pos = new Float32Array([
      v0.x, v0.y, v0.z, v1.x, v1.y, v1.z, v2.x, v2.y, v2.z,
      v0.x, v0.y, v0.z, v2.x, v2.y, v2.z, v3.x, v3.y, v3.z,
    ]);
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return g;
  }, [normal, tangent, size]);

  return (
    <mesh geometry={geo} position={position}>
      <meshBasicMaterial color={color} transparent opacity={0.12} side={THREE.DoubleSide} />
    </mesh>
  );
}

function CylinderContactScene({ direction }: { direction: DirectionMode }) {
  const groupRef = useRef<THREE.Group>(null);
  const R = 1; // cylinder radius
  // Point p on cylinder: at angle 0, height 0 → (R, 0, 0)
  const p: [number, number, number] = [R, 0, 0];
  const surfaceNormal = new THREE.Vector3(1, 0, 0); // outward normal at p

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  // Compute geodesic and normal section curves for the chosen direction
  const { geodesicPts, normalSectionPts, tangentDir, contactOrder, geodesicLabel, normalLabel } = useMemo(() => {
    const gPts: [number, number, number][] = [];
    const nPts: [number, number, number][] = [];
    const N = 200;
    let tDir: THREE.Vector3;
    let cOrder: string;
    let gLabel: string;
    let nLabel: string;
    
    if (direction === 'axial') {
      // Tangent direction: along cylinder axis (y-axis)
      tDir = new THREE.Vector3(0, 1, 0);
      cOrder = '∞';
      gLabel = 'γ = β (直线 / line)';
      nLabel = '';
      
      for (let i = 0; i <= N; i++) {
        const t = (i / N) * 2.4 - 1.2;
        // Geodesic: straight line along y
        gPts.push([R, t, 0]);
        // Normal section: plane {u, n} = {(0,1,0), (1,0,0)} → x-y plane at z=0
        // Intersection with cylinder at z=0: x²+z²=R², z=0 → x=±R, so it's just the line x=R
        nPts.push([R, t, 0]);
      }
    } else if (direction === 'circumferential') {
      // Tangent direction: circumferential (z-axis at this point, since p=(R,0,0))
      tDir = new THREE.Vector3(0, 0, 1);
      cOrder = '∞';
      gLabel = 'γ = β (圆 / circle)';
      nLabel = '';
      
      for (let i = 0; i <= N; i++) {
        const theta = (i / N) * Math.PI * 1.2 - Math.PI * 0.6;
        // Geodesic: circle in xz-plane at y=0
        gPts.push([R * Math.cos(theta), 0, R * Math.sin(theta)]);
        // Normal section: plane {(0,0,1), (1,0,0)} = x-z plane → circle in x-z plane
        nPts.push([R * Math.cos(theta), 0, R * Math.sin(theta)]);
      }
    } else {
      // Diagonal: 45° between axial and circumferential
      tDir = new THREE.Vector3(0, 1, 1).normalize();
      cOrder = '2';
      gLabel = 'γ (螺旋线 / helix)';
      nLabel = 'β (椭圆 / ellipse)';
      
      // Geodesic on cylinder: helix
      // At p=(R,0,0), tangent (0,1,1)/√2 → helix: (R cos(t/√2), t/√2, R sin(t/√2))
      // Speed: angular speed ω = 1/(R√2), vertical speed v = 1/√2
      const omega = 1 / (R * Math.SQRT2);
      const vy = 1 / Math.SQRT2;
      for (let i = 0; i <= N; i++) {
        const t = (i / N) * 3.0 - 1.5;
        gPts.push([
          R * Math.cos(omega * t),
          vy * t,
          R * Math.sin(omega * t)
        ]);
      }
      
      // Normal section: plane spanned by tangent (0,1,1)/√2 and normal (1,0,0)
      // This plane: x can be anything, y=z (since tangent direction is (0,1,1))
      // Intersection with cylinder x²+z²=R²:
      // Parameterize by z: x = ±√(R²-z²), y=z
      // Near p=(R,0,0): x = √(R²-z²), y=z → ellipse in 3D
      for (let i = 0; i <= N; i++) {
        const z = (i / N) * 1.8 - 0.9;
        if (R * R - z * z < 0) continue;
        const x = Math.sqrt(R * R - z * z);
        nPts.push([x, z, z]);
      }
    }
    
    return { geodesicPts: gPts, normalSectionPts: nPts, tangentDir: tDir, contactOrder: cOrder, geodesicLabel: gLabel, normalLabel: nLabel };
  }, [direction, R]);

  const showBothCurves = direction === 'diagonal';

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      <CylinderSurface radius={R} height={3} />
      
      {/* Point p */}
      <PointMarker position={p} color="#ffffff" label="p" />
      
      {/* Tangent direction arrow */}
      <Line 
        points={[p, [p[0] + tangentDir.x * 0.5, p[1] + tangentDir.y * 0.5, p[2] + tangentDir.z * 0.5]]} 
        color="#00ff00" 
        lineWidth={3} 
      />
      <PointMarker 
        position={[p[0] + tangentDir.x * 0.55, p[1] + tangentDir.y * 0.55, p[2] + tangentDir.z * 0.55]} 
        color="#00ff00" 
        label="u" 
      />

      {/* Normal direction arrow */}
      <Line 
        points={[p, [p[0] + surfaceNormal.x * 0.4, p[1], p[2]]]} 
        color="#ff8800" 
        lineWidth={2} 
      />

      {/* Cutting plane (always show for context) */}
      <CuttingPlane position={p} normal={surfaceNormal} tangent={tangentDir} color="#ff00ff" size={1.0} />
      
      {/* Geodesic curve */}
      {geodesicPts.length > 1 && (
        <Line points={geodesicPts} color="#00ffff" lineWidth={4} />
      )}
      
      {/* Normal section curve */}
      {showBothCurves && normalSectionPts.length > 1 && (
        <Line points={normalSectionPts} color="#ff00ff" lineWidth={3} />
      )}

      {/* Labels */}
      {geodesicPts.length > 1 && (
        <Html position={geodesicPts[Math.floor(geodesicPts.length * 0.85)]} style={{ pointerEvents: 'none' }}>
          <div className="text-cyan-400 text-xs bg-slate-900/90 px-1.5 py-0.5 rounded whitespace-nowrap">
            {geodesicLabel}
          </div>
        </Html>
      )}
      {showBothCurves && normalSectionPts.length > 1 && (
        <Html position={normalSectionPts[Math.floor(normalSectionPts.length * 0.85)]} style={{ pointerEvents: 'none' }}>
          <div className="text-fuchsia-400 text-xs bg-slate-900/90 px-1.5 py-0.5 rounded whitespace-nowrap">
            {normalLabel}
          </div>
        </Html>
      )}
      
      {/* Contact order label */}
      <Html position={[0, 1.8, 0]} style={{ pointerEvents: 'none' }}>
        <div className="text-yellow-400 text-sm bg-slate-900/90 px-2 py-1 rounded text-center whitespace-nowrap">
          {direction === 'diagonal' 
            ? `接触阶 / Contact order: ${contactOrder}  →  γ ≠ β`
            : `接触阶 / Contact order: ${contactOrder}  →  γ = β`
          }
        </div>
      </Html>

      <OrbitControls enableZoom={true} enablePan={false} />
    </group>
  );
}

export default function ContactNumberViz({ contactNumber = 2 }: { contactNumber?: number }) {
  return (
    <div className="w-full h-80 bg-slate-900 rounded-xl overflow-hidden">
      <Canvas camera={{ position: [2, 1.5, 2.5], fov: 45 }}>
        <CylinderContactScene direction={contactNumber >= 3 ? 'axial' : 'diagonal'} />
      </Canvas>
    </div>
  );
}

export function ContactNumberVizWithControls() {
  const [direction, setDirection] = useState<DirectionMode>('axial');
  
  const directionInfo: Record<DirectionMode, { zh: string; en: string; desc_zh: string; desc_en: string; order: string }> = {
    axial: { 
      zh: '轴向', en: 'Axial', 
      desc_zh: '测地线 = 法截线 = 直线。两条曲线完全重合！', 
      desc_en: 'Geodesic = Normal section = straight line. The two curves coincide completely!',
      order: '∞'
    },
    circumferential: { 
      zh: '环向', en: 'Circumferential', 
      desc_zh: '测地线 = 法截线 = 圆。两条曲线也完全重合！', 
      desc_en: 'Geodesic = Normal section = circle. The two curves also coincide completely!',
      order: '∞'
    },
    diagonal: { 
      zh: '斜向 (45°)', en: 'Diagonal (45°)', 
      desc_zh: '测地线 = 螺旋线，法截线 = 椭圆。两条曲线从第3阶导数开始不同！', 
      desc_en: 'Geodesic = helix, Normal section = ellipse. The two curves diverge from the 3rd derivative!',
      order: '2'
    },
  };

  return (
    <div className="space-y-4">
      <div className="w-full h-80 bg-slate-900 rounded-xl overflow-hidden">
        <Canvas camera={{ position: [2.5, 1.2, 2.5], fov: 45 }}>
          <CylinderContactScene direction={direction} />
        </Canvas>
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-cyan-400 rounded"></div>
          <span className="text-slate-300">测地线 γ<sub>u</sub> (Geodesic)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-fuchsia-500 rounded"></div>
          <span className="text-slate-300">法截线 β<sub>u</sub> (Normal Section)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-green-400 rounded"></div>
          <span className="text-slate-300">切方向 u (Tangent)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-fuchsia-500/40 rounded" style={{ width: '16px', height: '16px' }}></div>
          <span className="text-slate-300">切割平面 (Cutting plane)</span>
        </div>
      </div>
      
      {/* Direction selector */}
      <div className="bg-slate-800 rounded-lg p-4">
        <p className="text-slate-300 mb-3 font-semibold">
          🎯 选择切方向 / Choose tangent direction:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {(['axial', 'circumferential', 'diagonal'] as DirectionMode[]).map((d) => (
            <button
              key={d}
              onClick={() => setDirection(d)}
              className={`px-4 py-3 rounded-lg text-left transition-all ${
                direction === d 
                  ? 'bg-cyan-900/50 border-2 border-cyan-400 text-cyan-300' 
                  : 'bg-slate-700/50 border-2 border-slate-600 text-slate-400 hover:border-slate-400'
              }`}
            >
              <div className="font-semibold text-sm">
                {directionInfo[d].zh} / {directionInfo[d].en}
              </div>
              <div className="text-xs mt-1 opacity-80">
                接触阶 c<sup>#</sup> = {directionInfo[d].order}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Explanation for current direction */}
      <div className={`rounded-lg p-4 border ${
        direction === 'diagonal' 
          ? 'bg-red-900/20 border-red-700' 
          : 'bg-green-900/20 border-green-700'
      }`}>
        <p className={`font-semibold mb-1 ${direction === 'diagonal' ? 'text-red-400' : 'text-green-400'}`}>
          {direction === 'diagonal' ? '⚠️' : '✅'} {directionInfo[direction].zh}
        </p>
        <p className="text-slate-300 text-sm">{directionInfo[direction].desc_zh}</p>
        <p className="text-slate-400 text-xs mt-1">{directionInfo[direction].desc_en}</p>
      </div>
      
      {/* Contact number summary */}
      <div className="bg-gradient-to-r from-yellow-900/30 to-amber-900/30 rounded-lg p-4 border border-yellow-600">
        <p className="text-yellow-400 font-semibold mb-2">
          📐 圆柱面的接触数 / Contact Number of Cylinder
        </p>
        <div className="grid grid-cols-3 gap-2 text-sm mb-3">
          <div className={`rounded p-2 text-center ${direction === 'axial' ? 'bg-cyan-900/40 ring-2 ring-cyan-400' : 'bg-slate-800'}`}>
            <div className="text-slate-400">轴向 Axial</div>
            <div className="text-green-400 font-bold">∞</div>
          </div>
          <div className={`rounded p-2 text-center ${direction === 'circumferential' ? 'bg-cyan-900/40 ring-2 ring-cyan-400' : 'bg-slate-800'}`}>
            <div className="text-slate-400">环向 Circ.</div>
            <div className="text-green-400 font-bold">∞</div>
          </div>
          <div className={`rounded p-2 text-center ${direction === 'diagonal' ? 'bg-cyan-900/40 ring-2 ring-cyan-400' : 'bg-slate-800'}`}>
            <div className="text-slate-400">斜向 Diag.</div>
            <div className="text-red-400 font-bold">2</div>
          </div>
        </div>
        <p className="text-slate-300 text-sm">
          c<sup>#</sup>(圆柱面) = min(∞, ∞, 2, ...) = <span className="text-yellow-400 font-bold text-lg">2</span>
        </p>
        <p className="text-slate-400 text-xs mt-1">
          接触数 = 所有方向接触阶的最小值。即使大多数方向完美吻合，只要有一个方向不完美，接触数就由那个方向决定。
        </p>
        <p className="text-slate-500 text-xs">
          Contact number = minimum contact order over all directions. Even if most directions match perfectly, one imperfect direction determines the contact number.
        </p>
      </div>
    </div>
  );
}
