import { useEffect, useMemo, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Html } from '@react-three/drei';
import * as THREE from 'three';
import { VIZ_CLASSES, VIZ_COLORS } from './theme';

type DirectionMode = 'axial' | 'circumferential' | 'diagonal';

type Point3 = [number, number, number];

const STORY_LOOP_SECONDS = 8;
const EXPERIMENT_CAMERA: { position: Point3; fov: number } = { position: [2.5, 1.2, 2.5], fov: 45 };
const STORY_STAGES = [
  { start: 0, cue: 0, zh: '定点 p', en: 'Mark point p' },
  { start: 1, cue: 1.98, zh: '选择切方向 u', en: 'Choose tangent u' },
  { start: 2, cue: 2.98, zh: '张成切割平面', en: 'Construct the cutting plane' },
  { start: 3, cue: 5.25, zh: '比较 γ 与 β', en: 'Compare γ and β' },
  { start: 5.55, cue: 6.4, zh: '读取接触阶', en: 'Read the contact order' },
] as const;

function storyStage(time: number) {
  const next = STORY_STAGES.findIndex(({ start }) => start > time);
  return next === -1 ? STORY_STAGES.length - 1 : next - 1;
}
const COLORS = {
  geodesic: VIZ_COLORS.geodesic,
  normalSection: VIZ_COLORS.normalSection,
  tangent: VIZ_COLORS.tangent,
  normal: VIZ_COLORS.normal,
  point: VIZ_COLORS.point,
  surface: VIZ_COLORS.surface,
  conclusion: VIZ_COLORS.point,
};

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smoothstep(value: number) {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
}

function stageProgress(time: number, start: number, duration: number) {
  return smoothstep((time - start) / duration);
}

function distanceSq(a: Point3, b: Point3) {
  return (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2;
}

function revealFromPoint(points: Point3[], anchor: Point3, progress: number): Point3[] {
  if (points.length < 2) return points;

  let center = 0;
  let bestDistance = Infinity;
  points.forEach((point, index) => {
    const d = distanceSq(point, anchor);
    if (d < bestDistance) {
      bestDistance = d;
      center = index;
    }
  });

  const maxSpan = Math.max(center, points.length - 1 - center);
  const span = Math.max(1, Math.ceil(maxSpan * clamp01(progress)));
  return points.slice(Math.max(0, center - span), Math.min(points.length, center + span + 1));
}

// Cylinder surface mesh
function CylinderSurface({ radius = 1, height = 3 }: { radius?: number; height?: number }) {
  const geo = useMemo(() => {
    return new THREE.CylinderGeometry(radius, radius, height, 48, 1, true);
  }, [radius, height]);

  return (
    <group>
      <mesh geometry={geo}>
        <meshStandardMaterial
          color={COLORS.surface}
          emissive={VIZ_COLORS.surfaceDeep}
          emissiveIntensity={0.06}
          transparent
          opacity={0.42}
          roughness={0.74}
          metalness={0.02}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh geometry={geo}>
        <meshBasicMaterial color={VIZ_COLORS.surfaceWire} wireframe transparent opacity={0.62} />
      </mesh>
    </group>
  );
}

// Point marker with label
function PointMarker({ position, color = COLORS.point, label, scale = 1 }: {
  position: [number, number, number];
  color?: string;
  label?: string;
  scale?: number;
}) {
  return (
    <group position={position}>
      <mesh scale={scale}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
      {label && (
        <Html position={[0.1, 0.1, 0]} style={{ pointerEvents: 'none' }}>
          <div className="rounded-md border border-stone-300 bg-[#fffaf1]/95 px-1.5 py-0.5 text-xs font-semibold text-stone-800 shadow-sm whitespace-nowrap">{label}</div>
        </Html>
      )}
    </group>
  );
}

// Cutting plane visualization
function CuttingPlane({ position, normal, tangent, color = COLORS.normalSection, size = 1.2, opacity = 0.12 }: {
  position: [number, number, number];
  normal: THREE.Vector3;
  tangent: THREE.Vector3;
  color?: string;
  size?: number;
  opacity?: number;
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
      <meshBasicMaterial color={color} transparent opacity={opacity} side={THREE.DoubleSide} />
    </mesh>
  );
}

function CylinderContactScene({ direction, time }: { direction: DirectionMode; time?: number }) {
  const { i18n } = useTranslation();
  const isZh = i18n.language === 'zh';
  const groupRef = useRef<THREE.Group>(null);
  const loopStartRef = useRef(0);
  const lastDirectionRef = useRef(direction);
  const [loopTime, setLoopTime] = useState(0);
  const storyTime = time ?? loopTime;
  const R = 1; // cylinder radius
  // Point p on cylinder: at angle 0, height 0 → (R, 0, 0)
  const p: [number, number, number] = [R, 0, 0];
  const surfaceNormal = new THREE.Vector3(1, 0, 0); // outward normal at p

  useFrame(({ clock }) => {
    if (time !== undefined) return;
    const elapsed = clock.getElapsedTime();
    if (lastDirectionRef.current !== direction) {
      lastDirectionRef.current = direction;
      loopStartRef.current = elapsed;
    }
    setLoopTime((elapsed - loopStartRef.current) % STORY_LOOP_SECONDS);
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(elapsed * 0.25) * 0.18;
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
  const pointReveal = stageProgress(storyTime, 0.2, 0.8);
  const vectorReveal = stageProgress(storyTime, 1.0, 1.0);
  const planeReveal = stageProgress(storyTime, 2.0, 1.0);
  const geodesicReveal = stageProgress(storyTime, 3.0, 1.6);
  const normalReveal = stageProgress(storyTime, 4.1, 1.4);
  const conclusionReveal = stageProgress(storyTime, 5.4, 1.0);
  const revealedGeodesicPts = revealFromPoint(geodesicPts, p, geodesicReveal);
  const revealedNormalSectionPts = revealFromPoint(normalSectionPts, p, normalReveal);
  const tangentEnd: Point3 = [
    p[0] + tangentDir.x * 0.55 * vectorReveal,
    p[1] + tangentDir.y * 0.55 * vectorReveal,
    p[2] + tangentDir.z * 0.55 * vectorReveal,
  ];
  const normalEnd: Point3 = [
    p[0] + surfaceNormal.x * 0.42 * vectorReveal,
    p[1] + surfaceNormal.y * 0.42 * vectorReveal,
    p[2] + surfaceNormal.z * 0.42 * vectorReveal,
  ];
  const stageIndex = storyStage(storyTime);
  const currentStep = STORY_STAGES[stageIndex];

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      <CylinderSurface radius={R} height={3} />

      {/* Point p */}
      <PointMarker position={p} label="p" scale={0.75 + 0.25 * pointReveal} />

      {/* Tangent direction arrow */}
      {vectorReveal > 0.02 && (
        <>
          <Line points={[p, tangentEnd]} color={COLORS.tangent} lineWidth={3} transparent opacity={vectorReveal} />
          <PointMarker position={tangentEnd} color={COLORS.tangent} label="u" />
        </>
      )}

      {/* Normal direction arrow */}
      {vectorReveal > 0.02 && (
        <Line points={[p, normalEnd]} color={COLORS.normal} lineWidth={2} transparent opacity={vectorReveal} />
      )}

      {/* Cutting plane (always show for context) */}
      {planeReveal > 0.02 && (
        <CuttingPlane
          position={p}
          normal={surfaceNormal}
          tangent={tangentDir}
          color={COLORS.normalSection}
          size={1.0 + 0.12 * planeReveal}
          opacity={0.04 + 0.12 * planeReveal}
        />
      )}

      {/* Geodesic curve */}
      {geodesicReveal > 0 && revealedGeodesicPts.length > 1 && (
        <Line points={revealedGeodesicPts} color={COLORS.geodesic} lineWidth={4} transparent opacity={0.35 + 0.65 * geodesicReveal} />
      )}

      {/* Normal section curve */}
      {showBothCurves && normalReveal > 0 && revealedNormalSectionPts.length > 1 && (
        <Line points={revealedNormalSectionPts} color={COLORS.normalSection} lineWidth={3} transparent opacity={0.35 + 0.65 * normalReveal} />
      )}

      {showBothCurves && conclusionReveal > 0.2 && (
        <Html position={[1.05, 0.34, 0.34]} style={{ pointerEvents: 'none' }}>
          <div className="text-[11px] bg-[#fffaf1]/95 border border-amber-700/30 rounded px-2 py-1 text-amber-800 shadow-lg whitespace-nowrap">
            {isZh ? 'p 附近先贴合，随后分开' : 'The curves agree near p, then separate'}
          </div>
        </Html>
      )}

      {/* Labels */}
      {revealedGeodesicPts.length > 1 && geodesicReveal > 0.55 && (
        <Html position={geodesicPts[Math.floor(geodesicPts.length * 0.85)]} style={{ pointerEvents: 'none' }}>
          <div className="text-teal-800 text-xs bg-[#fffaf1]/95 border border-teal-700/20 px-1.5 py-0.5 rounded whitespace-nowrap">
            {geodesicLabel}
          </div>
        </Html>
      )}
      {showBothCurves && revealedNormalSectionPts.length > 1 && normalReveal > 0.55 && (
        <Html position={normalSectionPts[Math.floor(normalSectionPts.length * 0.85)]} style={{ pointerEvents: 'none' }}>
          <div className="text-rose-800 text-xs bg-[#fffaf1]/95 border border-rose-700/20 px-1.5 py-0.5 rounded whitespace-nowrap">
            {normalLabel}
          </div>
        </Html>
      )}

      {/* Contact order label */}
      {conclusionReveal > 0 && <Html position={[0, 1.8, 0]} style={{ pointerEvents: 'none', opacity: conclusionReveal }}>
        <div className="text-amber-800 text-sm bg-[#fffaf1]/95 px-2 py-1 rounded text-center whitespace-nowrap border border-amber-700/30">
          {isZh ? '接触阶' : 'Contact order'}: {contactOrder} → {showBothCurves ? 'γ ≠ β' : 'γ = β'}
        </div>
      </Html>}

      <Html position={[-1.15, -1.72, 0]} style={{ pointerEvents: 'none' }}>
        <div className={VIZ_CLASSES.labelPill}>
          {stageIndex + 1}. {isZh ? currentStep.zh : currentStep.en}
        </div>
      </Html>

      <OrbitControls enableZoom={true} enablePan={false} />
    </group>
  );
}

export default function ContactNumberViz({ contactNumber = 2 }: { contactNumber?: number }) {
  return (
    <div className={`w-full h-80 ${VIZ_CLASSES.canvas}`}>
      <Canvas camera={{ position: [2, 1.5, 2.5], fov: 45 }}>
        <CylinderContactScene direction={contactNumber >= 3 ? 'axial' : 'diagonal'} />
      </Canvas>
    </div>
  );
}

export function ContactNumberVizWithControls() {
  const { i18n } = useTranslation();
  const isZh = i18n.language === 'zh';
  const [direction, setDirection] = useState<DirectionMode>('axial');
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const running = playing && time < STORY_LOOP_SECONDS;
  const currentStage = storyStage(time);
  const showResult = time >= STORY_STAGES[4].cue;
  const buttonClass = 'rounded-lg border border-amber-900/20 bg-white/55 px-3 py-2 text-sm font-semibold text-teal-900 hover:bg-white disabled:opacity-40';

  useEffect(() => {
    if (!running) return;
    let previous = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now();
      const delta = (now - previous) / 1000;
      previous = now;
      setTime((elapsed) => Math.min(elapsed + delta, STORY_LOOP_SECONDS));
    }, 40);
    return () => window.clearInterval(timer);
  }, [running]);

  function seek(stage: number) {
    setPlaying(false);
    setTime(STORY_STAGES[stage].cue);
  }

  function togglePlayback() {
    if (running) {
      setPlaying(false);
    } else {
      if (time >= STORY_LOOP_SECONDS) setTime(0);
      setPlaying(true);
    }
  }

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
      <div className={VIZ_CLASSES.panel}>
        <p className="mb-3 text-sm font-semibold text-teal-900">
          {isZh ? '先猜一猜：换哪个切方向，两条曲线会分开？' : 'Make a prediction: in which tangent direction will the two curves separate?'}
        </p>
        <div role="group" aria-label={isZh ? '切方向' : 'Tangent direction'} className="grid grid-cols-3 gap-2">
          {(['axial', 'circumferential', 'diagonal'] as const).map((choice) => (
            <button
              key={choice}
              type="button"
              aria-pressed={direction === choice}
              onClick={() => {
                setDirection(choice);
                seek(0);
              }}
              className={`rounded-lg border px-2 py-2 text-sm ${direction === choice ? VIZ_CLASSES.buttonActive : VIZ_CLASSES.buttonIdle}`}
            >
              {isZh ? directionInfo[choice].zh : directionInfo[choice].en}
            </button>
          ))}
        </div>
      </div>

      <div className={`w-full h-80 ${VIZ_CLASSES.canvas}`}>
        <Canvas camera={EXPERIMENT_CAMERA} frameloop="demand">
          <CylinderContactScene direction={direction} time={time} />
        </Canvas>
      </div>

      <div className={VIZ_CLASSES.panel}>
        <p className="mb-3 text-sm font-semibold text-teal-900" aria-live="polite">
          {currentStage + 1} / {STORY_STAGES.length} · {isZh ? STORY_STAGES[currentStage].zh : STORY_STAGES[currentStage].en}
        </p>
        <div className="flex flex-wrap gap-2" role="group" aria-label={isZh ? '播放控制' : 'Playback controls'}>
          <button type="button" className={buttonClass} onClick={togglePlayback}>
            {running ? (isZh ? '暂停' : 'Pause') : (isZh ? '播放' : 'Play')}
          </button>
          <button type="button" className={buttonClass} disabled={currentStage === 0} onClick={() => seek(currentStage - 1)}>
            {isZh ? '上一步' : 'Previous step'}
          </button>
          <button type="button" className={buttonClass} disabled={currentStage === STORY_STAGES.length - 1} onClick={() => seek(currentStage + 1)}>
            {isZh ? '下一步' : 'Next step'}
          </button>
          <button type="button" className={buttonClass} onClick={() => { setTime(0); setPlaying(true); }}>
            {isZh ? '重播' : 'Replay'}
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 rounded bg-[#1f6f78]"></div>
          <span className="text-stone-700">测地线 γ<sub>u</sub> (Geodesic)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 rounded bg-[#c75f52]"></div>
          <span className="text-stone-700">法截线 β<sub>u</sub> (Normal Section)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 rounded bg-[#0f8f71]"></div>
          <span className="text-stone-700">切方向 u (Tangent)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 rounded bg-[#c76f28]"></div>
          <span className="text-stone-700">法向量 n (Normal)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border border-[#b96d5c] bg-[#d7a08c]/35"></div>
          <span className="text-stone-700">切割平面 (Cutting plane)</span>
        </div>
      </div>

      {/* Explanation for current direction */}
      {showResult && <div className={`rounded-lg p-4 border ${
        direction === 'diagonal'
          ? 'bg-rose-900/10 border-rose-700/30'
          : 'bg-emerald-900/10 border-emerald-700/30'
      }`}>
        <p className={`font-semibold mb-1 ${direction === 'diagonal' ? 'text-rose-800' : 'text-emerald-800'}`}>
          {isZh ? directionInfo[direction].zh : directionInfo[direction].en} · {isZh ? '接触阶' : 'Contact order'} {directionInfo[direction].order}
        </p>
        <p className="text-stone-700 text-sm">{isZh ? directionInfo[direction].desc_zh : directionInfo[direction].desc_en}</p>
      </div>}

      {/* Contact number summary */}
      <details className="rounded-2xl border border-amber-700/25 bg-amber-900/10 p-4">
        <summary className="cursor-pointer text-amber-800 font-semibold">
          {isZh ? '查看圆柱面的接触数' : 'Reveal the contact number of the cylinder'}
        </summary>
        <div className="grid grid-cols-3 gap-2 text-sm my-3">
          <div className={`rounded p-2 text-center ${direction === 'axial' ? 'bg-teal-700/[0.12] ring-2 ring-teal-700/40' : 'bg-white/50'}`}>
            <div className="text-stone-600">轴向 Axial</div>
            <div className="text-emerald-800 font-bold">∞</div>
          </div>
          <div className={`rounded p-2 text-center ${direction === 'circumferential' ? 'bg-teal-700/[0.12] ring-2 ring-teal-700/40' : 'bg-white/50'}`}>
            <div className="text-stone-600">环向 Circ.</div>
            <div className="text-emerald-800 font-bold">∞</div>
          </div>
          <div className={`rounded p-2 text-center ${direction === 'diagonal' ? 'bg-teal-700/[0.12] ring-2 ring-teal-700/40' : 'bg-white/50'}`}>
            <div className="text-stone-600">斜向 Diag.</div>
            <div className="text-rose-800 font-bold">2</div>
          </div>
        </div>
        <p className="text-stone-700 text-sm">
          c<sup>#</sup>(圆柱面) = min(∞, ∞, 2, ...) = <span className="text-amber-800 font-bold text-lg">2</span>
        </p>
        <p className="text-stone-600 text-xs mt-1">
          接触数取所有起点和方向的最小接触阶。所有接触阶都至少为 2，而斜向恰好为 2，因此圆柱面的接触数为 2。
        </p>
        <p className="text-stone-500 text-xs">
          The contact number is the minimum over all starting points and directions. Every contact order is at least 2, and the diagonal example attains 2.
        </p>
      </details>
    </div>
  );
}
