import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ThreeCanvas } from '../components';
import { RotatingSphere, RotatingTorus, RotatingKleinBottle, MobiusStrip } from './ManifoldShapes';

type ManifoldType = 'sphere' | 'torus' | 'klein' | 'mobius';

export default function Chapter1Viz() {
  const { i18n } = useTranslation();
  const isZh = i18n.language === 'zh';
  const [selected, setSelected] = useState<ManifoldType>('sphere');

  const manifolds: { id: ManifoldType; label: string; labelEn: string; desc: string; descEn: string }[] = [
    { 
      id: 'sphere', 
      label: '球面 S²', 
      labelEn: 'Sphere S²',
      desc: '最简单的闭曲面，每点局部像平面',
      descEn: 'The simplest closed surface, locally flat at each point'
    },
    { 
      id: 'torus', 
      label: '环面 T²', 
      labelEn: 'Torus T²',
      desc: '甜甜圈形状，有一个"洞"',
      descEn: 'Donut shape, has one "hole"'
    },
    { 
      id: 'klein', 
      label: 'Klein瓶', 
      labelEn: 'Klein Bottle',
      desc: '不可定向曲面，无法在3D中完整嵌入',
      descEn: 'Non-orientable surface, cannot be fully embedded in 3D'
    },
    { 
      id: 'mobius', 
      label: 'Möbius带', 
      labelEn: 'Möbius Strip',
      desc: '只有一个面和一条边的神奇曲面',
      descEn: 'A magical surface with only one side and one edge'
    },
  ];

  const renderManifold = () => {
    switch (selected) {
      case 'sphere': return <RotatingSphere />;
      case 'torus': return <RotatingTorus />;
      case 'klein': return <RotatingKleinBottle />;
      case 'mobius': return <MobiusStrip />;
    }
  };

  const currentManifold = manifolds.find(m => m.id === selected)!;

  return (
    <div className="bg-slate-900 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-cyan-400 mb-4">
        🎮 {isZh ? '交互式流形展示' : 'Interactive Manifold Display'}
      </h3>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {manifolds.map((m) => (
          <button
            key={m.id}
            onClick={() => setSelected(m.id)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              selected === m.id
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {isZh ? m.label : m.labelEn}
          </button>
        ))}
      </div>

      <ThreeCanvas className="w-full h-80 rounded-lg bg-slate-950">
        {renderManifold()}
      </ThreeCanvas>

      <p className="text-center text-slate-400 mt-4 text-sm">
        {isZh ? currentManifold.desc : currentManifold.descEn}
        <br />
        <span className="text-slate-500">
          {isZh ? '拖拽旋转 · 滚轮缩放' : 'Drag to rotate · Scroll to zoom'}
        </span>
      </p>
    </div>
  );
}
