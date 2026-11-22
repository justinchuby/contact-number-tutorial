import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ThreeCanvas } from '../components';
import ContactPaperLink from '../components/ContactPaperLink';
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
        <h1 className="text-4xl font-bold text-cyan-400 mb-4">{t('home.welcome')}
        </h1>
        <p className="text-lg text-slate-300 mb-8">{t('home.intro')}</p>
        <div className="flex items-center justify-center gap-4">
          <Link
            to="/chapter/1"
            className="inline-flex items-center px-8 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white font-semibold transition-colors"
          >{t('home.startLearning')} →
          </Link>
          <a
            href="https://github.com/justinchuby/manifold-tutorial"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 font-semibold transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            GitHub
          </a>
        </div>
      </div>

      <div className="bg-slate-900 rounded-xl p-6 mb-8">
        <ThreeCanvas className="w-full h-80 rounded-lg">
          <RotatingSphere />
          <RotatingTorus />
        </ThreeCanvas>
        <p className="text-center text-slate-400 mt-4 text-sm">{isZh
            ? '球面 S² 与环面 T² — 两种基本的二维流形'
            : 'Sphere S² and Torus T² — Two fundamental 2D manifolds'}
        </p>
      </div>

      {/* Tutorial overview */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">{isZh ? '教程结构' : 'Tutorial Structure'}
          </h2>
          <ul className="text-slate-300 space-y-2 text-sm">
            <li>• <span className="text-green-400">{isZh ? '第1-4章' : 'Ch 1-4'}:</span>{isZh ? '流形基础（流形、子流形、测地线、法截线）' : 'Foundations (Manifolds, Submanifolds, Geodesics, Normal Sections)'}</li>
            <li>• <span className="text-cyan-400">{isZh ? '第5-7章' : 'Ch 5-7'}:</span>{isZh ? '接触数理论（定义、定理、分类）' : 'Contact Number Theory (Definition, Theorems, Classification)'}</li>
            <li>• <span className="text-orange-400">{isZh ? '第8-11章' : 'Ch 8-11'}:</span>{isZh ? '进阶内容（相关论文与后续发展）' : 'Advanced (Related Papers & Developments)'}</li>
            <li>• <span className="text-purple-400">{isZh ? '第12章' : 'Ch 12'}:</span>{isZh ? '研究意义与致敬' : 'Significance & Tribute'}</li>
          </ul>
        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">{isZh ? '教程特色' : 'Features'}
          </h2>
          <ul className="text-slate-300 space-y-2 text-sm">
            <li>{isZh ? '交互式3D可视化' : 'Interactive 3D visualizations'}</li>
            <li>{isZh ? '精美动画演示数学概念' : 'Beautiful animations for math concepts'}</li>
            <li>{isZh ? '由浅入深的讲解' : 'Progressive learning path'}</li>
            <li>{isZh ? '中英双语支持' : 'Bilingual (Chinese/English)'}</li>
            <li>{isZh ? '基于5篇原始论文' : 'Based on 5 original papers'}</li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 rounded-xl p-6 border border-amber-900/20">
        <h2 className="text-xl font-semibold text-cyan-400 mb-4">
          {t('home.professor')}
        </h2>
        <p className="text-slate-300">{t('home.affiliation')}</p>
        <p className="text-slate-400 text-sm mt-2">{t('home.collaborator')}</p>
        <div className="mt-4 text-slate-400 text-sm">
          <p>{isZh
            ? '核心论文：Chen, B.-Y. & Li, S.-J. (2004). "The Contact Number of a Euclidean Submanifold"'
            : 'Core Paper: Chen, B.-Y. & Li, S.-J. (2004). "The Contact Number of a Euclidean Submanifold"'}</p>
          <p className="text-slate-500">Proceedings of the Edinburgh Mathematical Society, 47, 69-100</p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            <ContactPaperLink />
            <Link to="/chapter/5#section-5.2" className="font-medium text-teal-800 underline underline-offset-4">
              {isZh ? '直达第 5 章：接触数定义' : 'Jump to Chapter 5: The definition'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
