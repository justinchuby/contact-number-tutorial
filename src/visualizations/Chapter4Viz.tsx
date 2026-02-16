import { useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';

// Geodesic curve (great circle) on sphere
function GeodesicCurve({ 
  center,
  direction, 
  color = '#00ffff',
  radius = 1
}: { 
  center: THREE.Vector3;
  direction: THREE.Vector3; 
  color?: string;
  radius?: number;
}) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const n = center.clone().normalize();
    const u = direction.clone().sub(n.clone().multiplyScalar(direction.dot(n))).normalize();
    
    for (let i = 0; i <= 64; i++) {
      const t = (i / 64) * Math.PI * 2;
      const p = n.clone().multiplyScalar(Math.cos(t) * radius).add(u.clone().multiplyScalar(Math.sin(t) * radius));
      pts.push(p);
    }
    return pts;
  }, [center, direction, radius]);

  return <Line points={points} color={color} lineWidth={4} />;
}

// Show multiple cutting directions from same point
function MultiDirectionScene() {
  const [time, setTime] = useState(0);
  
  useFrame(({ clock }) => {
    setTime(clock.getElapsedTime());
  });

  const point = new THREE.Vector3(0, 0, 1);
  
  // Multiple directions in tangent plane
  const directions = useMemo(() => {
    const dirs: THREE.Vector3[] = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2 + time * 0.1;
      dirs.push(new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0));
    }
    return dirs;
  }, [time]);

  const colors = ['#ff0000', '#ff8800', '#ffff00', '#00ff00', '#0088ff', '#8800ff'];

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
      
      {/* Point p */}
      <mesh position={point}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Multiple great circles for different directions */}
      {directions.map((dir, idx) => (
        <GeodesicCurve key={idx} center={point} direction={dir} color={colors[idx]} />
      ))}
      
      {/* Direction arrows */}
      {directions.map((dir, idx) => (
        <Line 
          key={`arrow-${idx}`}
          points={[point, point.clone().add(dir.clone().multiplyScalar(0.3))]}
          color={colors[idx]}
          lineWidth={3}
        />
      ))}
      
      <OrbitControls enableZoom={true} enablePan={false} />
    </>
  );
}

// Geodesic vs Normal Section side by side
function ComparisonScene() {
  const [time, setTime] = useState(0);
  
  useFrame(({ clock }) => {
    setTime(clock.getElapsedTime());
  });

  // Animated point along the curves
  const t = time * 0.5;
  const point = new THREE.Vector3(0, 0, 1);
  const direction = new THREE.Vector3(1, 0, 0);
  
  // For sphere, geodesic and normal section are identical (both great circles)
  const geodesicPoint = useMemo(() => {
    const n = point.clone().normalize();
    const u = direction.clone().normalize();
    return n.clone().multiplyScalar(Math.cos(t)).add(u.clone().multiplyScalar(Math.sin(t)));
  }, [t]);

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {/* Sphere */}
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial color="#1a3a5c" transparent opacity={0.4} />
      </Sphere>
      
      {/* Great circle (both geodesic and normal section) */}
      <GeodesicCurve center={point} direction={direction} color="#00ffff" />
      
      {/* Starting point p */}
      <mesh position={point}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#ffff00" emissive="#ffff00" emissiveIntensity={0.5} />
      </mesh>
      <Html position={point.clone().add(new THREE.Vector3(0.1, 0.1, 0))} style={{ pointerEvents: 'none' }}>
        <div className="text-yellow-400 text-sm font-bold">p</div>
      </Html>
      
      {/* Moving point */}
      <mesh position={geodesicPoint}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Direction u */}
      <Line 
        points={[point, point.clone().add(direction.clone().multiplyScalar(0.4))]}
        color="#ff6600"
        lineWidth={4}
      />
      <Html position={point.clone().add(direction.clone().multiplyScalar(0.45))} style={{ pointerEvents: 'none' }}>
        <div className="text-orange-400 text-sm font-bold">u</div>
      </Html>
      
      <OrbitControls enableZoom={true} enablePan={false} />
    </>
  );
}

// Show what happens when geodesic ≠ normal section (non-sphere case)
function DifferentCurvesScene() {
  const [time, setTime] = useState(0);
  
  useFrame(({ clock }) => {
    setTime(clock.getElapsedTime());
  });

  // Create an ellipsoid-like surface where curves differ
  // Ellipsoid: (x/a)^2 + (y/b)^2 + (z/c)^2 = 1, a=0.8, b=1.0, c=0.6
  const a = 0.8, b = 1.0, c = 0.6;
  const ellipsoidLines = useMemo(() => {
    const lines: THREE.Vector3[][] = [];
    // Latitude lines
    for (let lat = -80; lat <= 80; lat += 20) {
      const line: THREE.Vector3[] = [];
      const phi = (lat * Math.PI) / 180;
      for (let lon = 0; lon <= 360; lon += 10) {
        const theta = (lon * Math.PI) / 180;
        line.push(new THREE.Vector3(
          a * Math.cos(phi) * Math.cos(theta),
          b * Math.cos(phi) * Math.sin(theta),
          c * Math.sin(phi)
        ));
      }
      lines.push(line);
    }
    // Longitude lines
    for (let lon = 0; lon < 360; lon += 30) {
      const line: THREE.Vector3[] = [];
      const theta = (lon * Math.PI) / 180;
      for (let lat = -90; lat <= 90; lat += 5) {
        const phi = (lat * Math.PI) / 180;
        line.push(new THREE.Vector3(
          a * Math.cos(phi) * Math.cos(theta),
          b * Math.cos(phi) * Math.sin(theta),
          c * Math.sin(phi)
        ));
      }
      lines.push(line);
    }
    return lines;
  }, []);

  // Start at equator-side point where difference is visible
  // Point on ellipsoid at phi=0, theta=45°
  const startTheta = Math.PI / 4;
  const startPhi = 0;
  const point = new THREE.Vector3(
    a * Math.cos(startPhi) * Math.cos(startTheta),
    b * Math.cos(startPhi) * Math.sin(startTheta),
    c * Math.sin(startPhi)
  );

  // Normal section: intersection of ellipsoid with a plane through the point
  // containing the normal and a tangent direction.
  // At phi=0, theta=45°, a tangent direction tilted toward the pole traces a planar ellipse.
  const normalSectionPoints = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    // Parametric plane cut through point in xz-like direction (tilted toward pole)
    for (let i = 0; i <= 60; i++) {
      const t = ((i / 60) - 0.5) * 2.2;
      // Move along the meridian direction from starting point
      const phi = t * 0.9;
      const x = a * Math.cos(phi) * Math.cos(startTheta);
      const y = b * Math.cos(phi) * Math.sin(startTheta);
      const z = c * Math.sin(phi);
      pts.push(new THREE.Vector3(x, y, z));
    }
    return pts;
  }, []);

  // Geodesic: on an ellipsoid, geodesics generally don't stay in a plane.
  // Approximate by slightly drifting theta as phi changes (Clairaut's relation).
  const geodesicPoints = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 60; i++) {
      const t = ((i / 60) - 0.5) * 2.2;
      const phi = t * 0.9;
      // Geodesic drifts in theta due to ellipsoid shape (Clairaut effect)
      const drift = 0.15 * Math.sin(phi * 1.5);
      const theta = startTheta + drift;
      const x = a * Math.cos(phi) * Math.cos(theta);
      const y = b * Math.cos(phi) * Math.sin(theta);
      const z = c * Math.sin(phi);
      pts.push(new THREE.Vector3(x, y, z));
    }
    return pts;
  }, []);

  // Animated comparison
  const paramT = (Math.sin(time * 0.5) + 1) / 2;
  const geodesicPos = geodesicPoints[Math.floor(paramT * 59)];
  const normalPos = normalSectionPoints[Math.floor(paramT * 59)];

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {/* Ellipsoid wireframe */}
      {ellipsoidLines.map((line, idx) => (
        <Line key={idx} points={line} color="#334455" lineWidth={1} />
      ))}
      
      {/* Geodesic */}
      <Line points={geodesicPoints} color="#00ffff" lineWidth={3} />
      
      {/* Normal section */}
      <Line points={normalSectionPoints} color="#ff00ff" lineWidth={3} dashed dashScale={15} />
      
      {/* Starting point */}
      <mesh position={point}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Moving points showing difference */}
      {geodesicPos && (
        <mesh position={geodesicPos}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
        </mesh>
      )}
      {normalPos && (
        <mesh position={normalPos}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.5} />
        </mesh>
      )}
      
      <OrbitControls enableZoom={true} enablePan={false} />
    </>
  );
}

export function MultiDirectionViz() {
  return (
    <div className="w-full h-64 bg-slate-900 rounded-xl overflow-hidden">
      <Canvas camera={{ position: [2, 2, 2.5], fov: 45 }}>
        <MultiDirectionScene />
      </Canvas>
    </div>
  );
}

export function GeodesicNormalComparisonViz() {
  return (
    <div className="w-full h-64 bg-slate-900 rounded-xl overflow-hidden">
      <Canvas camera={{ position: [2, 1.5, 2], fov: 45 }}>
        <ComparisonScene />
      </Canvas>
    </div>
  );
}

export function DifferentCurvesViz() {
  return (
    <div className="w-full h-64 bg-slate-900 rounded-xl overflow-hidden">
      <Canvas camera={{ position: [2, 1, 2], fov: 45 }}>
        <DifferentCurvesScene />
      </Canvas>
    </div>
  );
}

export function Chapter4VizCollection() {
  return (
    <div className="space-y-6">
      {/* Multi-direction visualization */}
      <div>
        <p className="text-cyan-400 font-semibold mb-2">
          🌈 不同方向的法截线 / Normal Sections in Different Directions
        </p>
        <MultiDirectionViz />
        <p className="text-slate-400 text-xs mt-2">
          从同一点p出发，不同方向u产生不同的法截线（大圆）。每种颜色代表一个方向。
        </p>
      </div>

      {/* Sphere case: geodesic = normal section */}
      <div>
        <p className="text-green-400 font-semibold mb-2">
          ✅ 球面：测地线 = 法截线 / Sphere: Geodesic = Normal Section
        </p>
        <GeodesicNormalComparisonViz />
        <p className="text-slate-400 text-xs mt-2">
          球面上，测地线和法截线都是大圆——完全重合！这就是为什么球面的接触数 c# = ∞
        </p>
      </div>

      {/* Non-sphere case: geodesic ≠ normal section */}
      <div>
        <p className="text-orange-400 font-semibold mb-2">
          ⚠️ 椭球面：测地线 ≠ 法截线 / Ellipsoid: Geodesic ≠ Normal Section
        </p>
        <DifferentCurvesViz />
        <div className="flex gap-4 mt-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-cyan-400 rounded"></div>
            <span className="text-slate-300">测地线 γ_u</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-fuchsia-500 rounded border-dashed"></div>
            <span className="text-slate-300">法截线 β_u</span>
          </div>
        </div>
        <p className="text-slate-400 text-xs mt-2">
          椭球上，两条曲线从同一点出发、同一方向，但随后分开。它们的"接触阶数"有限。
        </p>
      </div>
    </div>
  );
}
