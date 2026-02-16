import { useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';
import * as THREE from 'three';

// Example 6.6 from Chen-Li (2004): flat torus τ_a in E⁶ with c# = 4
// τ_a(u,v) = (2/√6a)(cos(au/√2)cos(√3av/√2), cos(au/√2)sin(√3av/√2),
//   cos(√2au)/√2, sin(au/√2)cos(√3av/√2), sin(au/√2)sin(√3av/√2), sin(√2au)/√2)
function torusE6(u: number, v: number, a: number): number[] {
  const s6a = 2 / (Math.sqrt(6) * a);
  const au_s2 = a * u / Math.sqrt(2);
  const av_s32 = Math.sqrt(3) * a * v / Math.sqrt(2);
  const a2u = Math.sqrt(2) * a * u;
  return [
    s6a * Math.cos(au_s2) * Math.cos(av_s32),
    s6a * Math.cos(au_s2) * Math.sin(av_s32),
    s6a * Math.cos(a2u) / Math.sqrt(2),
    s6a * Math.sin(au_s2) * Math.cos(av_s32),
    s6a * Math.sin(au_s2) * Math.sin(av_s32),
    s6a * Math.sin(a2u) / Math.sqrt(2),
  ];
}

// Project 6D point to 3D using a projection matrix
function project6Dto3D(p6: number[], proj: number[][]): THREE.Vector3 {
  return new THREE.Vector3(
    proj[0][0]*p6[0] + proj[0][1]*p6[1] + proj[0][2]*p6[2] + proj[0][3]*p6[3] + proj[0][4]*p6[4] + proj[0][5]*p6[5],
    proj[1][0]*p6[0] + proj[1][1]*p6[1] + proj[1][2]*p6[2] + proj[1][3]*p6[3] + proj[1][4]*p6[4] + proj[1][5]*p6[5],
    proj[2][0]*p6[0] + proj[2][1]*p6[1] + proj[2][2]*p6[2] + proj[2][3]*p6[3] + proj[2][4]*p6[4] + proj[2][5]*p6[5],
  );
}

// Predefined projections
const PROJECTIONS: { name_zh: string; name_en: string; matrix: number[][] }[] = [
  {
    name_zh: '投影 1: (x₁, x₂, x₃)',
    name_en: 'Projection 1: (x₁, x₂, x₃)',
    matrix: [[1,0,0,0,0,0],[0,1,0,0,0,0],[0,0,1,0,0,0]]
  },
  {
    name_zh: '投影 2: (x₁, x₄, x₃)',
    name_en: 'Projection 2: (x₁, x₄, x₃)',
    matrix: [[1,0,0,0,0,0],[0,0,0,1,0,0],[0,0,1,0,0,0]]
  },
  {
    name_zh: '投影 3: (x₁+x₄, x₂+x₅, x₃+x₆)',
    name_en: 'Projection 3: (x₁+x₄, x₂+x₅, x₃+x₆)',
    matrix: [[1,0,0,1,0,0],[0,1,0,0,1,0],[0,0,1,0,0,1]]
  },
  {
    name_zh: '投影 4: 对角投影',
    name_en: 'Projection 4: Diagonal',
    matrix: [
      [0.7, 0.3, 0, -0.3, 0.5, 0],
      [0, 0.5, 0.5, 0.3, 0, -0.4],
      [0.3, 0, -0.5, 0, 0.3, 0.7]
    ]
  },
];

function PseudoUmbilicalScene({ projIndex }: { projIndex: number }) {
  const [time, setTime] = useState(0);
  useFrame(({ clock }) => setTime(clock.getElapsedTime()));

  const a = 1;
  const proj = PROJECTIONS[projIndex].matrix;

  // Generate surface mesh lines
  const { uLines, vLines } = useMemo(() => {
    const uPeriod = 2 * Math.PI * Math.sqrt(2) / a;
    const vPeriod = 2 * Math.PI * Math.sqrt(2) / (Math.sqrt(3) * a);
    const uSteps = 80;
    const vSteps = 80;
    const uL: THREE.Vector3[][] = [];
    const vL: THREE.Vector3[][] = [];

    // u-lines (constant v)
    for (let j = 0; j <= 20; j++) {
      const v = (j / 20) * vPeriod;
      const line: THREE.Vector3[] = [];
      for (let i = 0; i <= uSteps; i++) {
        const u = (i / uSteps) * uPeriod;
        line.push(project6Dto3D(torusE6(u, v, a), proj));
      }
      uL.push(line);
    }
    // v-lines (constant u)
    for (let i = 0; i <= 20; i++) {
      const u = (i / 20) * uPeriod;
      const line: THREE.Vector3[] = [];
      for (let j = 0; j <= vSteps; j++) {
        const v = (j / vSteps) * vPeriod;
        line.push(project6Dto3D(torusE6(u, v, a), proj));
      }
      vL.push(line);
    }
    return { uLines: uL, vLines: vL };
  }, [proj]);

  // Highlight one geodesic (u-parameter curve, which is a geodesic on the flat torus)
  const geodesic = useMemo(() => {
    const uPeriod = 2 * Math.PI * Math.sqrt(2) / a;
    const pts: THREE.Vector3[] = [];
    const v0 = 0;
    for (let i = 0; i <= 200; i++) {
      const u = (i / 200) * uPeriod;
      pts.push(project6Dto3D(torusE6(u, v0, a), proj));
    }
    return pts;
  }, [proj]);

  // Animated point on the geodesic
  const animIdx = Math.floor(((Math.sin(time * 0.4) + 1) / 2) * 199);
  const animPt = geodesic[animIdx];

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={0.8} />
      {/* Surface wireframe */}
      {uLines.map((line, i) => (
        <Line key={`u${i}`} points={line} color="#6d28d9" lineWidth={1} opacity={0.4} transparent />
      ))}
      {vLines.map((line, i) => (
        <Line key={`v${i}`} points={line} color="#7c3aed" lineWidth={1} opacity={0.3} transparent />
      ))}
      {/* Highlighted geodesic */}
      <Line points={geodesic} color="#22d3ee" lineWidth={3} />
      {/* Animated point */}
      {animPt && (
        <mesh position={animPt}>
          <sphereGeometry args={[0.02, 12, 12]} />
          <meshStandardMaterial color="#facc15" emissive="#facc15" emissiveIntensity={0.8} />
        </mesh>
      )}
      <OrbitControls enableZoom enablePan={false} />
    </>
  );
}

export function PseudoUmbilicalViz() {
  const [projIndex, setProjIndex] = useState(0);

  return (
    <div>
      <div className="h-72 bg-slate-950 rounded-lg overflow-hidden mb-3">
        <Canvas camera={{ position: [1.5, 1, 1.2], fov: 50 }}>
          <PseudoUmbilicalScene projIndex={projIndex} />
        </Canvas>
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        {PROJECTIONS.map((p, i) => (
          <button
            key={i}
            onClick={() => setProjIndex(i)}
            className={`px-3 py-1 rounded text-xs transition-colors ${
              i === projIndex
                ? 'bg-purple-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {p.name_zh}
          </button>
        ))}
      </div>
    </div>
  );
}

// Formula (10.20) from Chen-Li: first explicit non-spherical pseudo-umbilical surface
// ψ(u,v) with parameters a > 0, c > 0
// β = 2(a² + 6c²)/3, δ = (2/3)√(a⁴ + 6a²c² + 36c⁴)
function nonSphericalPU(u: number, v: number, a: number, c: number): number[] {
  const s3 = Math.sqrt(3);
  const s2 = Math.sqrt(2);
  const au_s3 = a * u / s3;
  const av_s3 = a * v / s3;
  const cos2 = Math.cos(au_s3) * Math.cos(au_s3);
  const tanAu = Math.tan(au_s3);

  const beta = 2 * (a * a + 6 * c * c) / 3;
  const delta = (2 / 3) * Math.sqrt(a * a * a * a + 6 * a * a * c * c + 36 * c * c * c * c);
  const sqBpD = Math.sqrt(beta + delta);
  const sqBmD = Math.sqrt(Math.abs(beta - delta));
  const sinBmV = Math.sin(sqBmD * v);
  const sinBpV = Math.sin(sqBpD * v);
  const cosBmV = Math.cos(sqBmD * v);
  const cosBpV = Math.cos(sqBpD * v);
  const a2 = a * a;

  const x1 = cos2 * (s3 / a) * tanAu * Math.cos(av_s3);
  const x2 = cos2 * (s3 / a) * tanAu * Math.sin(av_s3);
  const x3 = cos2 * (
    (3 * delta + 3 * beta - 4 * a2) * sinBmV / (6 * delta * sqBmD)
    + (3 * delta - 3 * beta + 4 * a2) * sinBpV / (6 * delta * sqBpD)
  );
  const x4 = cos2 * (
    s2 * a * c * sinBmV / (delta * sqBpD)
    - s2 * a * c * sinBpV / (delta * sqBmD)
  );
  const x5 = cos2 * (
    (2 * a2 - 3 * beta - 3 * delta) * cosBmV / (4 * a * delta)
    - (2 * a2 - 3 * beta + 3 * delta) * cosBpV / (4 * a * delta)
  );
  const x6 = cos2 * (
    (2 * a2 + 3 * beta + 3 * delta) * cosBmV / (4 * s3 * a * delta)
    - (2 * a2 + 3 * beta - 3 * delta) * cosBpV / (4 * s3 * a * delta)
  );
  return [x1, x2, x3, x4, x5, x6];
}

const NS_PROJECTIONS: { name_zh: string; name_en: string; matrix: number[][] }[] = [
  {
    name_zh: '(x₁, x₂, x₃)',
    name_en: '(x₁, x₂, x₃)',
    matrix: [[1,0,0,0,0,0],[0,1,0,0,0,0],[0,0,1,0,0,0]]
  },
  {
    name_zh: '(x₁, x₂, x₅)',
    name_en: '(x₁, x₂, x₅)',
    matrix: [[1,0,0,0,0,0],[0,1,0,0,0,0],[0,0,0,0,1,0]]
  },
  {
    name_zh: '(x₃, x₄, x₅)',
    name_en: '(x₃, x₄, x₅)',
    matrix: [[0,0,1,0,0,0],[0,0,0,1,0,0],[0,0,0,0,1,0]]
  },
  {
    name_zh: '混合投影',
    name_en: 'Mixed',
    matrix: [
      [0.6, 0.3, 0, -0.3, 0.5, 0],
      [0, 0.5, 0.4, 0.3, 0, -0.3],
      [0.3, 0, -0.4, 0, 0.3, 0.6]
    ]
  },
];

function NonSphericalScene({ projIndex }: { projIndex: number }) {
  const [time, setTime] = useState(0);
  useFrame(({ clock }) => setTime(clock.getElapsedTime()));

  const a = 1.0, c = 0.5;
  const proj = NS_PROJECTIONS[projIndex].matrix;
  const uMax = Math.sqrt(3) * Math.PI / (2 * a) * 0.92; // stay away from pole

  const { uLines, vLines } = useMemo(() => {
    const vMax = 2 * Math.PI * Math.sqrt(3) / a;
    const uSteps = 60;
    const vSteps = 80;
    const uL: THREE.Vector3[][] = [];
    const vL: THREE.Vector3[][] = [];

    for (let j = 0; j <= 16; j++) {
      const v = (j / 16) * vMax;
      const line: THREE.Vector3[] = [];
      for (let i = 0; i <= uSteps; i++) {
        const u = -uMax + (i / uSteps) * 2 * uMax;
        const p6 = nonSphericalPU(u, v, a, c);
        if (p6.every(x => isFinite(x))) line.push(project6Dto3D(p6, proj));
      }
      if (line.length > 2) uL.push(line);
    }
    for (let i = 0; i <= 16; i++) {
      const u = -uMax + (i / 16) * 2 * uMax;
      const line: THREE.Vector3[] = [];
      for (let j = 0; j <= vSteps; j++) {
        const v = (j / vSteps) * vMax;
        const p6 = nonSphericalPU(u, v, a, c);
        if (p6.every(x => isFinite(x))) line.push(project6Dto3D(p6, proj));
      }
      if (line.length > 2) vL.push(line);
    }
    return { uLines: uL, vLines: vL };
  }, [proj]);

  // Highlight a curve at u = 0 (equator)
  const equator = useMemo(() => {
    const vMax = 2 * Math.PI * Math.sqrt(3) / a;
    const pts: THREE.Vector3[] = [];
    for (let j = 0; j <= 200; j++) {
      const v = (j / 200) * vMax;
      const p6 = nonSphericalPU(0, v, a, c);
      if (p6.every(x => isFinite(x))) pts.push(project6Dto3D(p6, proj));
    }
    return pts;
  }, [proj]);

  const animIdx = Math.floor(((Math.sin(time * 0.3) + 1) / 2) * (equator.length - 1));
  const animPt = equator[animIdx];

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={0.8} />
      {uLines.map((line, i) => (
        <Line key={`u${i}`} points={line} color="#b45309" lineWidth={1} opacity={0.4} transparent />
      ))}
      {vLines.map((line, i) => (
        <Line key={`v${i}`} points={line} color="#d97706" lineWidth={1} opacity={0.3} transparent />
      ))}
      <Line points={equator} color="#4ade80" lineWidth={3} />
      {animPt && (
        <mesh position={animPt}>
          <sphereGeometry args={[0.015, 12, 12]} />
          <meshStandardMaterial color="#facc15" emissive="#facc15" emissiveIntensity={0.8} />
        </mesh>
      )}
      <OrbitControls enableZoom enablePan={false} />
    </>
  );
}

export function NonSphericalPUViz() {
  const [projIndex, setProjIndex] = useState(0);

  return (
    <div>
      <div className="h-72 bg-slate-950 rounded-lg overflow-hidden mb-3">
        <Canvas camera={{ position: [2, 1.5, 1.5], fov: 50 }}>
          <NonSphericalScene projIndex={projIndex} />
        </Canvas>
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        {NS_PROJECTIONS.map((p, i) => (
          <button
            key={i}
            onClick={() => setProjIndex(i)}
            className={`px-3 py-1 rounded text-xs transition-colors ${
              i === projIndex
                ? 'bg-amber-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {p.name_zh}
          </button>
        ))}
      </div>
    </div>
  );
}
