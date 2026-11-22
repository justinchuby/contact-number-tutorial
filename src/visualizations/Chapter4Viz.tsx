import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';
import { VIZ_CLASSES, VIZ_COLORS } from './theme';
import { ELLIPSOID_AXES, sampleEllipsoidCurves } from './ellipsoidCurves';

// Geodesic curve (great circle) on sphere
function GeodesicCurve({
  center,
  direction,
  color = VIZ_COLORS.geodesic,
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

  const colors = [
    VIZ_COLORS.geodesic,
    VIZ_COLORS.normalSection,
    VIZ_COLORS.tangent,
    VIZ_COLORS.normal,
    VIZ_COLORS.comparison,
    VIZ_COLORS.accentBlue,
  ];

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      {/* Sphere */}
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial color={VIZ_COLORS.surface} transparent opacity={0.32} roughness={0.78} metalness={0.02} />
      </Sphere>
      <Sphere args={[1.001, 16, 16]}>
        <meshBasicMaterial color={VIZ_COLORS.surfaceWire} wireframe transparent opacity={0.52} />
      </Sphere>

      {/* Point p */}
      <mesh position={point}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color={VIZ_COLORS.point} emissive={VIZ_COLORS.point} emissiveIntensity={0.42} />
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
  const point = useMemo(() => new THREE.Vector3(0, 0, 1), []);
  const direction = useMemo(() => new THREE.Vector3(1, 0, 0), []);

  // For sphere, geodesic and normal section are identical (both great circles)
  const geodesicPoint = useMemo(() => {
    const n = point.clone().normalize();
    const u = direction.clone().normalize();
    return n.clone().multiplyScalar(Math.cos(t)).add(u.clone().multiplyScalar(Math.sin(t)));
  }, [direction, point, t]);

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      {/* Sphere */}
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial color={VIZ_COLORS.surface} transparent opacity={0.32} roughness={0.78} metalness={0.02} />
      </Sphere>

      {/* Great circle (both geodesic and normal section) */}
      <GeodesicCurve center={point} direction={direction} color={VIZ_COLORS.geodesic} />

      {/* Starting point p */}
      <mesh position={point}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color={VIZ_COLORS.point} emissive={VIZ_COLORS.point} emissiveIntensity={0.42} />
      </mesh>
      <Html position={point.clone().add(new THREE.Vector3(0.1, 0.1, 0))} style={{ pointerEvents: 'none' }}>
        <div className="rounded-md border border-stone-300 bg-[#fffaf1]/95 px-1.5 py-0.5 text-xs font-semibold text-stone-800 shadow-sm">p</div>
      </Html>

      {/* Moving point */}
      <mesh position={geodesicPoint}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color={VIZ_COLORS.tangent} emissive={VIZ_COLORS.tangent} emissiveIntensity={0.24} />
      </mesh>

      {/* Direction u */}
      <Line
        points={[point, point.clone().add(direction.clone().multiplyScalar(0.4))]}
        color={VIZ_COLORS.normal}
        lineWidth={4}
      />
      <Html position={point.clone().add(direction.clone().multiplyScalar(0.45))} style={{ pointerEvents: 'none' }}>
        <div className="rounded-md border border-amber-700/30 bg-[#fffaf1]/95 px-1.5 py-0.5 text-xs font-semibold text-amber-800 shadow-sm">u</div>
      </Html>

      <OrbitControls enableZoom={true} enablePan={false} />
    </>
  );
}

// Show what happens when geodesic ≠ normal section (non-sphere case)
function DifferentCurvesScene() {
  const geodesicMarker = useRef<THREE.Mesh>(null);
  const sectionMarker = useRef<THREE.Mesh>(null);
  const { point, geodesicPoints, normalSectionPoints } = useMemo(() => sampleEllipsoidCurves(), []);

  useFrame(({ clock }) => {
    const sample = (Math.sin(clock.getElapsedTime() * 0.65) + 1) / 2 * (geodesicPoints.length - 1);
    const index = Math.min(Math.floor(sample), geodesicPoints.length - 2);
    const fraction = sample - index;
    geodesicMarker.current?.position.lerpVectors(geodesicPoints[index], geodesicPoints[index + 1], fraction);
    sectionMarker.current?.position.lerpVectors(normalSectionPoints[index], normalSectionPoints[index + 1], fraction);
  });

  const ellipsoidLines = useMemo(() => {
    const [a, b, c] = ELLIPSOID_AXES;
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

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      {/* Ellipsoid wireframe */}
      {ellipsoidLines.map((line, idx) => (
        <Line key={idx} points={line} color={VIZ_COLORS.surfaceWire} lineWidth={1} transparent opacity={0.68} />
      ))}

      {/* Geodesic */}
      <Line points={geodesicPoints} color={VIZ_COLORS.geodesic} lineWidth={3} />

      {/* Normal section */}
      <Line points={normalSectionPoints} color={VIZ_COLORS.normalSection} lineWidth={3} dashed dashScale={15} />

      {/* Starting point */}
      <mesh position={point}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color={VIZ_COLORS.point} emissive={VIZ_COLORS.point} emissiveIntensity={0.42} />
      </mesh>

      {/* Moving points showing difference */}
      <mesh ref={geodesicMarker} position={point}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial color={VIZ_COLORS.geodesic} emissive={VIZ_COLORS.geodesic} emissiveIntensity={0.24} />
      </mesh>
      <mesh ref={sectionMarker} position={point}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial color={VIZ_COLORS.normalSection} emissive={VIZ_COLORS.normalSection} emissiveIntensity={0.24} />
      </mesh>

      <OrbitControls enableZoom={true} enablePan={false} />
    </>
  );
}

export function MultiDirectionViz() {
  return (
    <div className={`w-full h-64 ${VIZ_CLASSES.canvas}`}>
      <Canvas camera={{ position: [2, 2, 2.5], fov: 45 }}>
        <MultiDirectionScene />
      </Canvas>
    </div>
  );
}

export function GeodesicNormalComparisonViz() {
  return (
    <div className={`w-full h-64 ${VIZ_CLASSES.canvas}`}>
      <Canvas camera={{ position: [2, 1.5, 2], fov: 45 }}>
        <ComparisonScene />
      </Canvas>
    </div>
  );
}

export function DifferentCurvesViz() {
  return (
    <div className={`w-full h-64 ${VIZ_CLASSES.canvas}`}>
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
        <p className="text-teal-800 font-semibold mb-2">
           不同方向的法截线 / Normal Sections in Different Directions
        </p>
        <MultiDirectionViz />
        <p className="text-stone-600 text-xs mt-2">
          从同一点p出发，不同方向u产生不同的法截线（大圆）。每种颜色代表一个方向。
        </p>
      </div>

      {/* Sphere case: geodesic = normal section */}
      <div>
        <p className="text-emerald-800 font-semibold mb-2">
          ✓ 球面：测地线 = 法截线 / Sphere: Geodesic = Normal Section
        </p>
        <GeodesicNormalComparisonViz />
        <p className="text-stone-600 text-xs mt-2">
          球面上，测地线和法截线都是大圆——完全重合！这就是为什么球面的接触数 c# = ∞
        </p>
      </div>

      {/* Non-sphere case: geodesic ≠ normal section */}
      <div>
        <p className="text-amber-800 font-semibold mb-2">
           椭球面：测地线 ≠ 法截线 / Ellipsoid: Geodesic ≠ Normal Section
        </p>
        <DifferentCurvesViz />
        <div className="flex gap-4 mt-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 rounded bg-[#1f6f78]"></div>
            <span className="text-stone-700">测地线 γ_u</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 rounded bg-[#c75f52] border-dashed"></div>
            <span className="text-stone-700">法截线 β_u</span>
          </div>
        </div>
        <p className="text-stone-600 text-xs mt-2">
          椭球上，两条曲线从同一点沿同一方向出发，初始弯曲相同，之后逐渐分开。
          / On the ellipsoid, the curves start at the same point with the same tangent and acceleration, then separate.
        </p>
      </div>
    </div>
  );
}
