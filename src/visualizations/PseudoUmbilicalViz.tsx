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
const PROJECTIONS: { name_zh: string; name_en: string; desc_zh: string; matrix: number[][] }[] = [
  {
    name_zh: '投影 1: (x₁, x₂, x₃)',
    name_en: 'Projection 1: (x₁, x₂, x₃)',
    desc_zh: '只看前3个坐标——相当于从6维空间"正面"看过去，看到环面的cos/sin对称结构。',
    matrix: [[1,0,0,0,0,0],[0,1,0,0,0,0],[0,0,1,0,0,0]]
  },
  {
    name_zh: '投影 2: (x₁, x₄, x₃)',
    name_en: 'Projection 2: (x₁, x₄, x₃)',
    desc_zh: '混合前半和后半坐标——揭示cos与sin分量之间的关联，展现环面的"扭转"特征。',
    matrix: [[1,0,0,0,0,0],[0,0,0,1,0,0],[0,0,1,0,0,0]]
  },
  {
    name_zh: '投影 3: (x₁+x₄, x₂+x₅, x₃+x₆)',
    name_en: 'Projection 3: (x₁+x₄, x₂+x₅, x₃+x₆)',
    desc_zh: '把对应的cos和sin分量叠加——看到两组三维子空间如何"协作"构成完整的环面。',
    matrix: [[1,0,0,1,0,0],[0,1,0,0,1,0],[0,0,1,0,0,1]]
  },
  {
    name_zh: '投影 4: 对角投影',
    name_en: 'Projection 4: Diagonal',
    desc_zh: '用一组斜角系数混合所有6个坐标——像从"对角线"方向观察，展现整体形态。',
    matrix: [
      [0.7, 0.3, 0, -0.3, 0.5, 0],
      [0, 0.5, 0.5, 0.3, 0, -0.4],
      [0.3, 0, -0.5, 0, 0.3, 0.7]
    ]
  },
];

function PseudoUmbilicalScene({ projIndex, highlightU }: { projIndex: number; highlightU: number }) {
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

    for (let j = 0; j <= 20; j++) {
      const v = (j / 20) * vPeriod;
      const line: THREE.Vector3[] = [];
      for (let i = 0; i <= uSteps; i++) {
        const u = (i / uSteps) * uPeriod;
        line.push(project6Dto3D(torusE6(u, v, a), proj));
      }
      uL.push(line);
    }
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

  // Highlighted u-parameter curve
  const highlightCurve = useMemo(() => {
    const uPeriod = 2 * Math.PI * Math.sqrt(2) / a;
    const vPeriod = 2 * Math.PI * Math.sqrt(2) / (Math.sqrt(3) * a);
    const v0 = ((highlightU + 1) / 2) * vPeriod; // map [-1,1] to [0, vPeriod]
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 200; i++) {
      const u = (i / 200) * uPeriod;
      pts.push(project6Dto3D(torusE6(u, v0, a), proj));
    }
    return pts;
  }, [proj, highlightU]);

  const animIdx = Math.floor(((Math.sin(time * 0.4) + 1) / 2) * 199);
  const animPt = highlightCurve[animIdx];

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={0.8} />
      {uLines.map((line, i) => (
        <Line key={`u${i}`} points={line} color="#6d28d9" lineWidth={1} opacity={0.4} transparent />
      ))}
      {vLines.map((line, i) => (
        <Line key={`v${i}`} points={line} color="#7c3aed" lineWidth={1} opacity={0.3} transparent />
      ))}
      <Line points={highlightCurve} color="#22d3ee" lineWidth={3} />
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
  const [highlightU, setHighlightU] = useState(-1); // normalized: -1 = v=0

  return (
    <div>
      <div className="h-72 bg-slate-950 rounded-lg overflow-hidden mb-3">
        <Canvas camera={{ position: [1.5, 1, 1.2], fov: 50 }}>
          <PseudoUmbilicalScene projIndex={projIndex} highlightU={highlightU} />
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
      <p className="text-slate-500 text-xs mb-2 italic">{PROJECTIONS[projIndex].desc_zh}</p>
      <div className="flex items-center gap-3 text-xs text-slate-400">
        <span className="text-cyan-400 font-mono whitespace-nowrap">
          v = {((highlightU + 1) / 2 * 100).toFixed(0)}% · T<sub>v</sub>
        </span>
        <input
          type="range"
          min={-100}
          max={100}
          value={Math.round(highlightU * 100)}
          onChange={e => setHighlightU(Number(e.target.value) / 100)}
          className="flex-1 accent-cyan-500"
        />
        <button
          onClick={() => setHighlightU(-1)}
          className="px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-slate-300"
        >
          v=0
        </button>
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

const NS_PROJECTIONS: { name_zh: string; name_en: string; desc_zh: string; matrix: number[][] }[] = [
  {
    name_zh: '(x₁, x₂, x₃)',
    name_en: '(x₁, x₂, x₃)',
    desc_zh: '前两个分量是旋转面(cos·tan, sin·tan)——展示曲面如何从赤道向两极"张开"。第三分量是高维振荡项。',
    matrix: [[1,0,0,0,0,0],[0,1,0,0,0,0],[0,0,1,0,0,0]]
  },
  {
    name_zh: '(x₁, x₂, x₅)',
    name_en: '(x₁, x₂, x₅)',
    desc_zh: '旋转面分量 + 第五分量(cos组合)——看到非球面性质：不同纬度的曲线半径不再均匀。',
    matrix: [[1,0,0,0,0,0],[0,1,0,0,0,0],[0,0,0,0,1,0]]
  },
  {
    name_zh: '(x₃, x₄, x₅)',
    name_en: '(x₃, x₄, x₅)',
    desc_zh: '只看高维振荡分量——这些是球面上看不到的"隐藏维度"，它们携带了非球面的关键信息。',
    matrix: [[0,0,1,0,0,0],[0,0,0,1,0,0],[0,0,0,0,1,0]]
  },
  {
    name_zh: '混合投影',
    name_en: 'Mixed',
    desc_zh: '以斜角混合全部6个坐标——从"对角线"方向观察，综合展现曲面的整体几何形态。',
    matrix: [
      [0.6, 0.3, 0, -0.3, 0.5, 0],
      [0, 0.5, 0.4, 0.3, 0, -0.3],
      [0.3, 0, -0.4, 0, 0.3, 0.6]
    ]
  },
];

function NonSphericalScene({ projIndex, highlightU }: { projIndex: number; highlightU: number }) {
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

  // Highlighted u-curve
  const highlightCurve = useMemo(() => {
    const vMax = 2 * Math.PI * Math.sqrt(3) / a;
    const uVal = highlightU * uMax;
    const pts: THREE.Vector3[] = [];
    for (let j = 0; j <= 200; j++) {
      const v = (j / 200) * vMax;
      const p6 = nonSphericalPU(uVal, v, a, c);
      if (p6.every(x => isFinite(x))) pts.push(project6Dto3D(p6, proj));
    }
    return pts;
  }, [proj, highlightU]);

  const animIdx = Math.floor(((Math.sin(time * 0.3) + 1) / 2) * (highlightCurve.length - 1));
  const animPt = highlightCurve[animIdx];

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
      {highlightCurve.length > 2 && (
        <Line points={highlightCurve} color="#4ade80" lineWidth={3} />
      )}
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
  const [highlightU, setHighlightU] = useState(0); // normalized: -1 to 1

  return (
    <div>
      <div className="h-72 bg-slate-950 rounded-lg overflow-hidden mb-3">
        <Canvas camera={{ position: [2, 1.5, 1.5], fov: 50 }}>
          <NonSphericalScene projIndex={projIndex} highlightU={highlightU} />
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
      <p className="text-slate-500 text-xs mb-2 italic">{NS_PROJECTIONS[projIndex].desc_zh}</p>
      <div className="flex items-center gap-3 text-xs text-slate-400">
        <span className="text-green-400 font-mono whitespace-nowrap">
          u = {highlightU === 0 ? '0' : (highlightU > 0 ? '+' : '') + (highlightU * 0.92).toFixed(2)} · u<sub>max</sub>
        </span>
        <input
          type="range"
          min={-100}
          max={100}
          value={Math.round(highlightU * 100)}
          onChange={e => setHighlightU(Number(e.target.value) / 100)}
          className="flex-1 accent-green-500"
        />
        <button
          onClick={() => setHighlightU(0)}
          className="px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-slate-300"
        >
          赤道
        </button>
      </div>
    </div>
  );
}
