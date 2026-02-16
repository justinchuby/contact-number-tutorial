import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ThreeCanvas } from '../components';
import { Sphere, Torus } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

function RotatingSphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.005;
  });
  return (
    <Sphere ref={ref} args={[1, 64, 64]}>
      <meshStandardMaterial color="#06b6d4" wireframe />
    </Sphere>
  );
}

function RotatingTorus() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.005;
      ref.current.rotation.y += 0.003;
    }
  });
  return (
    <Torus ref={ref} args={[1, 0.4, 32, 64]} position={[3, 0, 0]}>
      <meshStandardMaterial color="#8b5cf6" wireframe />
    </Torus>
  );
}

export default function Home() {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-cyan-400 mb-4">
          {t('home.welcome')}
        </h1>
        <p className="text-lg text-slate-300 mb-8">{t('home.intro')}</p>
        <Link
          to="/chapter/1"
          className="inline-block px-8 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white font-semibold transition-colors"
        >
          {t('home.startLearning')} →
        </Link>
      </div>

      <div className="bg-slate-900 rounded-xl p-6 mb-8">
        <ThreeCanvas className="w-full h-80 rounded-lg">
          <RotatingSphere />
          <RotatingTorus />
        </ThreeCanvas>
        <p className="text-center text-slate-400 mt-4 text-sm">
          {isZh 
            ? '球面 S² 与环面 T² — 两种基本的二维流形' 
            : 'Sphere S² and Torus T² — Two fundamental 2D manifolds'}
        </p>
      </div>

      {/* Tutorial overview */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            📚 {isZh ? '教程结构' : 'Tutorial Structure'}
          </h2>
          <ul className="text-slate-300 space-y-2 text-sm">
            <li>• <span className="text-green-400">{isZh ? '第1-4章' : 'Ch 1-4'}:</span> {isZh ? '流形基础（流形、子流形、测地线、法截线）' : 'Foundations (Manifolds, Submanifolds, Geodesics, Normal Sections)'}</li>
            <li>• <span className="text-cyan-400">{isZh ? '第5-7章' : 'Ch 5-7'}:</span> {isZh ? '接触数理论（定义、定理、分类）' : 'Contact Number Theory (Definition, Theorems, Classification)'}</li>
            <li>• <span className="text-orange-400">{isZh ? '第8-11章' : 'Ch 8-11'}:</span> {isZh ? '进阶内容（相关论文与后续发展）' : 'Advanced (Related Papers & Developments)'}</li>
            <li>• <span className="text-purple-400">{isZh ? '第12章' : 'Ch 12'}:</span> {isZh ? '研究意义与致敬' : 'Significance & Tribute'}</li>
          </ul>
        </div>
        
        <div className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            ✨ {isZh ? '教程特色' : 'Features'}
          </h2>
          <ul className="text-slate-300 space-y-2 text-sm">
            <li>🎮 {isZh ? '交互式3D可视化' : 'Interactive 3D visualizations'}</li>
            <li>🎨 {isZh ? '精美动画演示数学概念' : 'Beautiful animations for math concepts'}</li>
            <li>📖 {isZh ? '由浅入深的讲解' : 'Progressive learning path'}</li>
            <li>🌐 {isZh ? '中英双语支持' : 'Bilingual (Chinese/English)'}</li>
            <li>📚 {isZh ? '基于5篇原始论文' : 'Based on 5 original papers'}</li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 rounded-xl p-6 border border-cyan-700">
        <h2 className="text-xl font-semibold text-cyan-400 mb-4">
          👨‍🏫 {t('home.professor')}
        </h2>
        <p className="text-slate-300">{t('home.affiliation')}</p>
        <p className="text-slate-400 text-sm mt-2">{t('home.collaborator')}</p>
        <div className="mt-4 text-slate-400 text-sm">
          <p>{isZh 
            ? '核心论文：Chen, B.-Y. & Li, S.-J. (2004). "The Contact Number of a Euclidean Submanifold"' 
            : 'Core Paper: Chen, B.-Y. & Li, S.-J. (2004). "The Contact Number of a Euclidean Submanifold"'}</p>
          <p className="text-slate-500">Proceedings of the Edinburgh Mathematical Society, 47, 69-100</p>
        </div>
      </div>
    </div>
  );
}
