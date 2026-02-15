import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MathBlock, Math } from '../components';
import { IsotropyComparisonViz } from '../visualizations';

export default function Chapter6() {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <p className="text-cyan-400 text-sm mb-2">{t('nav.chapter', { num: 6 })}</p>
        <h1 className="text-3xl font-bold text-white mb-2">{t('chapters.ch6.title')}</h1>
        <p className="text-slate-400">{t('chapters.ch6.subtitle')}</p>
      </header>

      <div className="space-y-8">
        {/* Interactive visualization */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            🎮 {isZh ? '交互可视化：各向同性 vs 非各向同性' : 'Interactive: Isotropic vs Non-Isotropic'}
          </h2>
          <IsotropyComparisonViz />
        </section>

        {/* Section 6.1 - Isotropic */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '6.1 各向同性子流形' : '6.1 Isotropic Submanifolds'}
          </h2>
          
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">
              {isZh ? '定义（各向同性）' : 'Definition (Isotropic)'}
            </p>
            <p className="text-slate-300 mb-2">
              {isZh 
                ? '子流形M是各向同性的，如果对于每点p，法曲率向量的长度与方向无关：'
                : 'A submanifold M is isotropic if, at each point p, the length of the normal curvature vector is independent of direction:'}
            </p>
            <MathBlock>{'|h(u,u)| = \\lambda(p) \\quad \\text{for all unit } u \\in T_pM'}</MathBlock>
          </div>

          <div className="bg-slate-800 rounded-lg p-4">
            <p className="text-green-400 font-semibold mb-2">
              {isZh ? '等价条件' : 'Equivalent Condition'}
            </p>
            <MathBlock>{'\\langle h(u,u), h(u,v) \\rangle = 0 \\quad \\text{for orthogonal } u, v'}</MathBlock>
            <p className="text-slate-400 text-sm mt-2">
              {isZh 
                ? '几何含义：法曲率向量与任何"混合"方向正交。'
                : 'Geometric meaning: Normal curvature vector is orthogonal to any "mixed" direction.'}
            </p>
          </div>
        </section>

        {/* Theorem 1: c# ≥ 3 ⟺ Isotropic */}
        <section className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 rounded-xl p-6 border-2 border-green-700">
          <h2 className="text-xl font-semibold text-green-400 mb-4">
            ⭐ {isZh ? '定理：c#(M) ≥ 3 ⟺ 各向同性' : 'Theorem: c#(M) ≥ 3 ⟺ Isotropic'}
          </h2>
          
          <div className="bg-slate-900 rounded-lg p-4 mb-4">
            <p className="text-white font-semibold mb-3">
              {isZh ? '陈-李定理 (Chen-Li, 2004)' : 'Chen-Li Theorem (2004)'}
            </p>
            <p className="text-slate-300">
              {isZh 
                ? '子流形M的接触数 c#(M) ≥ 3 当且仅当 M 是各向同性的。'
                : 'The contact number c#(M) ≥ 3 if and only if M is isotropic.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-800 rounded-lg p-4">
              <p className="text-cyan-400 font-semibold mb-2">→ {isZh ? '正向' : 'Forward'}</p>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? '若 c#(M) ≥ 3，利用三阶导数相等的条件，可以推出各向同性条件。'
                  : 'If c#(M) ≥ 3, using the third derivative equality condition, we can derive the isotropic condition.'}
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-4">
              <p className="text-pink-400 font-semibold mb-2">← {isZh ? '逆向' : 'Backward'}</p>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? '若M是各向同性的，利用Codazzi方程可以证明三阶导数相等。'
                  : 'If M is isotropic, using the Codazzi equation we can prove third derivative equality.'}
              </p>
            </div>
          </div>
        </section>

        {/* Section 6.3 - Constant Isotropic */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '6.3 常各向同性子流形' : '6.3 Constant Isotropic Submanifolds'}
          </h2>
          
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">
              {isZh ? '定义（常各向同性）' : 'Definition (Constant Isotropic)'}
            </p>
            <p className="text-slate-300 mb-2">
              {isZh 
                ? '子流形M是常各向同性的，如果λ = |h(u,u)| 在整个M上是常数。'
                : 'A submanifold M is constant isotropic if λ = |h(u,u)| is constant over all of M.'}
            </p>
            <MathBlock>{'\\lambda = |h(u,u)| = \\text{const for all } p \\in M, u \\in U_pM'}</MathBlock>
          </div>

          <div className="bg-slate-800 rounded-lg p-4">
            <p className="text-green-400 font-semibold mb-2">
              {isZh ? '等价条件' : 'Equivalent Condition'}
            </p>
            <MathBlock>{'A_{(\\bar{\\nabla}h)(u^3)} u = 0'}</MathBlock>
          </div>
        </section>

        {/* Theorem 2: c# ≥ 4 ⟺ Constant Isotropic */}
        <section className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-6 border-2 border-purple-700">
          <h2 className="text-xl font-semibold text-purple-400 mb-4">
            ⭐ {isZh ? '定理：c#(M) ≥ 4 ⟺ 常各向同性' : 'Theorem: c#(M) ≥ 4 ⟺ Constant Isotropic'}
          </h2>
          
          <div className="bg-slate-900 rounded-lg p-4">
            <p className="text-white font-semibold mb-3">
              {isZh ? '陈-李定理 (Chen-Li, 2004)' : 'Chen-Li Theorem (2004)'}
            </p>
            <p className="text-slate-300">
              {isZh 
                ? '子流形M的接触数 c#(M) ≥ 4 当且仅当 M 是常各向同性的。'
                : 'The contact number c#(M) ≥ 4 if and only if M is constant isotropic.'}
            </p>
          </div>
        </section>

        {/* Theorem 3: Surfaces with c# = 3 */}
        <section className="bg-gradient-to-r from-orange-900/30 to-yellow-900/30 rounded-xl p-6 border-2 border-orange-700">
          <h2 className="text-xl font-semibold text-orange-400 mb-4">
            ⭐ {isZh ? '曲面的特殊定理' : 'Special Theorem for Surfaces'}
          </h2>
          
          <div className="bg-slate-900 rounded-lg p-4 mb-4">
            <p className="text-white font-semibold mb-3">
              {isZh ? '定理：曲面与全纯曲线' : 'Theorem: Surfaces and Holomorphic Curves'}
            </p>
            <p className="text-slate-300">
              {isZh 
                ? '欧氏空间中的曲面M满足 c#(M) = 3 当且仅当 M 是复平面C²中的非平面全纯曲线。'
                : 'A surface M in Euclidean space has c#(M) = 3 if and only if M is a non-planar holomorphic curve in a complex 2-plane C².'}
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-4">
            <p className="text-yellow-400 font-semibold mb-2">
              🔗 {isZh ? '重要联系' : 'Important Connection'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '这个定理建立了微分几何（接触数）与复几何（全纯曲线）之间的深刻联系！'
                : 'This theorem establishes a deep connection between differential geometry (contact number) and complex geometry (holomorphic curves)!'}
            </p>
          </div>
        </section>

        {/* Summary Table */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '定理总结' : 'Theorem Summary'}
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-slate-300">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="py-2 px-4">{isZh ? '接触数' : 'Contact Number'}</th>
                  <th className="py-2 px-4">{isZh ? '等价条件' : 'Equivalent Condition'}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-800">
                  <td className="py-3 px-4"><Math>{'c^\\#(M) \\geq 2'}</Math></td>
                  <td className="py-3 px-4">{isZh ? '所有子流形（无条件）' : 'All submanifolds (no condition)'}</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-3 px-4"><Math>{'c^\\#(M) \\geq 3'}</Math></td>
                  <td className="py-3 px-4">{isZh ? '各向同性 (Isotropic)' : 'Isotropic'}</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-3 px-4"><Math>{'c^\\#(M) \\geq 4'}</Math></td>
                  <td className="py-3 px-4">{isZh ? '常各向同性 (Constant Isotropic)' : 'Constant Isotropic'}</td>
                </tr>
                <tr>
                  <td className="py-3 px-4"><Math>{'c^\\#(M) = 3'}</Math> ({isZh ? '曲面' : 'surface'})</td>
                  <td className="py-3 px-4">{isZh ? 'C²中的非平面全纯曲线' : 'Non-planar holomorphic curve in C²'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between">
          <Link
            to="/chapter/5"
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors"
          >
            ← {t('common.prev')}
          </Link>
          <Link
            to="/chapter/7"
            className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white transition-colors"
          >
            {t('common.next')}: {t('chapters.ch7.title')} →
          </Link>
        </div>
      </div>
    </div>
  );
}
