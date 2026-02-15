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
        {/* Chapter Overview */}
        <section className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 rounded-xl p-6 border border-green-700">
          <h2 className="text-xl font-semibold text-green-400 mb-4">
            📋 {isZh ? '本章概览' : 'Chapter Overview'}
          </h2>
          <p className="text-slate-300 mb-4">
            {isZh 
              ? '本章是Chen-Li接触数理论的核心！我们将看到接触数如何与"各向同性"这一几何性质建立精确对应。这些定理揭示了接触数的深刻几何意义。'
              : 'This chapter is the core of Chen-Li contact number theory! We\'ll see how contact number establishes precise correspondence with the geometric property of "isotropy". These theorems reveal the deep geometric meaning of contact number.'}
          </p>
          <div className="grid md:grid-cols-3 gap-3">
            <div className="bg-slate-800 rounded-lg p-3 text-center">
              <div className="text-2xl mb-1">⭐</div>
              <p className="text-slate-300 text-sm">c# ≥ 3 ⟺ {isZh ? '各向同性' : 'Isotropic'}</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-3 text-center">
              <div className="text-2xl mb-1">⭐⭐</div>
              <p className="text-slate-300 text-sm">c# ≥ 4 ⟺ {isZh ? '常各向同性' : 'Const. Isotropic'}</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-3 text-center">
              <div className="text-2xl mb-1">🔮</div>
              <p className="text-slate-300 text-sm">c# = 3 ⟺ {isZh ? '全纯曲线' : 'Holomorphic'}</p>
            </div>
          </div>
        </section>

        {/* Interactive visualization */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            🎮 {isZh ? '交互可视化：各向同性 vs 非各向同性' : 'Interactive: Isotropic vs Non-Isotropic'}
          </h2>
          <p className="text-slate-400 text-sm mb-4">
            {isZh 
              ? '观察球面（各向同性）和椭球面（非各向同性）的法曲率差异。在球面上，各方向的法曲率相同；在椭球面上，不同方向法曲率不同。'
              : 'Observe the difference in normal curvature between sphere (isotropic) and ellipsoid (non-isotropic). On a sphere, normal curvature is the same in all directions; on an ellipsoid, it varies.'}
          </p>
          <IsotropyComparisonViz />
        </section>

        {/* Section 6.1 - Isotropic */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 id="section-6.1" className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '6.1 各向同性子流形' : '6.1 Isotropic Submanifolds'}
          </h2>
          
          {/* Intuitive understanding */}
          <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-lg p-4 border border-blue-700 mb-4">
            <p className="text-blue-400 font-semibold mb-2">
              🌐 {isZh ? '直观理解："各向同性"是什么意思？' : 'Intuition: What Does "Isotropic" Mean?'}
            </p>
            <p className="text-slate-300 text-sm mb-2">
              {isZh 
                ? '"各向同性"字面意思是"各个方向都一样"。想象你站在曲面上的一点：'
                : '"Isotropic" literally means "same in all directions". Imagine standing at a point on a surface:'}
            </p>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>🔵 {isZh ? '球面：无论你朝哪个方向看，曲面的弯曲程度都一样——这是各向同性的！' : 'Sphere: No matter which direction you look, the surface bends the same—this is isotropic!'}</li>
              <li>🥚 {isZh ? '椭球面：沿长轴和短轴方向，弯曲程度不同——这不是各向同性的。' : 'Ellipsoid: Along major vs minor axis, bending differs—this is NOT isotropic.'}</li>
            </ul>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">
              📝 {isZh ? '定义（各向同性）' : 'Definition (Isotropic)'}
            </p>
            <p className="text-slate-300 mb-2">
              {isZh 
                ? '子流形M是各向同性的，如果对于每点p，法曲率向量的长度与方向无关：'
                : 'A submanifold M is isotropic if, at each point p, the length of the normal curvature vector is independent of direction:'}
            </p>
            <MathBlock>{'|h(u,u)| = \\lambda(p) \\quad \\text{for all unit } u \\in T_pM'}</MathBlock>
            <p className="text-slate-400 text-sm mt-2">
              {isZh 
                ? '这里h(u,u)是沿方向u的法曲率向量，λ(p)只依赖于点p，不依赖于方向u。'
                : 'Here h(u,u) is the normal curvature vector in direction u, λ(p) depends only on point p, not on direction u.'}
            </p>
          </div>

          {/* Why this matters */}
          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-4 border border-purple-700 mb-4">
            <p className="text-purple-400 font-semibold mb-2">
              💡 {isZh ? '为什么这个性质重要？' : 'Why Does This Property Matter?'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '各向同性是一种"对称性"。在物理中，各向同性材料在各方向有相同的性质（如玻璃）。在几何中，各向同性子流形在各方向有相同的弯曲特性，这使它们具有特殊的几何结构。'
                : 'Isotropy is a form of "symmetry". In physics, isotropic materials have the same properties in all directions (like glass). In geometry, isotropic submanifolds have the same curvature characteristics in all directions, giving them special geometric structure.'}
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-4">
            <p className="text-green-400 font-semibold mb-2">
              🔄 {isZh ? '等价条件' : 'Equivalent Condition'}
            </p>
            <MathBlock>{'\\langle h(u,u), h(u,v) \\rangle = 0 \\quad \\text{for orthogonal } u, v'}</MathBlock>
            <p className="text-slate-400 text-sm mt-2">
              {isZh 
                ? '几何含义：法曲率向量h(u,u)与任何"混合"方向h(u,v)正交。这是验证各向同性的另一种方式。'
                : 'Geometric meaning: Normal curvature vector h(u,u) is orthogonal to any "mixed" direction h(u,v). This is another way to verify isotropy.'}
            </p>
          </div>
        </section>

        {/* Theorem 1: c# ≥ 3 ⟺ Isotropic */}
        <section className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 rounded-xl p-6 border-2 border-green-700">
          <h2 className="text-xl font-semibold text-green-400 mb-4">
            ⭐ {isZh ? '定理1：c#(M) ≥ 3 ⟺ 各向同性' : 'Theorem 1: c#(M) ≥ 3 ⟺ Isotropic'}
          </h2>
          
          <div className="bg-slate-900 rounded-lg p-4 mb-4">
            <p className="text-white font-semibold mb-3">
              📜 {isZh ? '陈-李定理 (Chen-Li, 2004)' : 'Chen-Li Theorem (2004)'}
            </p>
            <p className="text-slate-300">
              {isZh 
                ? '子流形M的接触数 c#(M) ≥ 3 当且仅当 M 是各向同性的。'
                : 'The contact number c#(M) ≥ 3 if and only if M is isotropic.'}
            </p>
          </div>

          {/* Why is 3 special? */}
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-yellow-400 font-semibold mb-2">
              🤔 {isZh ? '为什么是3？为什么不是2或4？' : 'Why 3? Why Not 2 or 4?'}
            </p>
            <p className="text-slate-300 text-sm mb-2">
              {isZh 
                ? '回忆接触数的定义：c# ≥ k 意味着测地线和法截面在起点处前k-1阶导数都相等。'
                : 'Recall the definition: c# ≥ k means geodesic and normal section have equal derivatives up to order k-1 at the starting point.'}
            </p>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• c# ≥ 2: {isZh ? '一阶导数相等（切向量相同）——所有子流形都满足' : '1st derivatives equal (same tangent)—all submanifolds satisfy this'}</li>
              <li>• c# ≥ 3: {isZh ? '二阶导数相等——这正好对应曲率条件，即各向同性！' : '2nd derivatives equal—this exactly corresponds to curvature condition, i.e., isotropy!'}</li>
              <li>• c# ≥ 4: {isZh ? '三阶导数相等——需要更强的条件（常各向同性）' : '3rd derivatives equal—requires stronger condition (constant isotropic)'}</li>
            </ul>
          </div>

          {/* Intuitive meaning */}
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-purple-400 font-semibold mb-2">
              💡 {isZh ? '直观理解：为什么接触数和各向同性有关？' : 'Intuition: Why Are Contact Number and Isotropy Related?'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '想象在曲面上沿不同方向出发。如果曲面是各向同性的，各方向的弯曲程度相同，那么测地线和法截面在各方向的"贴合程度"也相同——这意味着它们在更高阶上也保持接触。反之，如果各方向弯曲不同，两条曲线会更快地分离。'
                : 'Imagine starting in different directions on a surface. If the surface is isotropic, bending is the same in all directions, so geodesic and normal section have the same "closeness" in all directions—meaning they maintain contact to higher order. Conversely, if bending differs by direction, the curves separate faster.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-slate-800 rounded-lg p-4">
              <p className="text-cyan-400 font-semibold mb-2">→ {isZh ? '正向证明思路' : 'Forward Proof Idea'}</p>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? '若 c#(M) ≥ 3，则测地线和法截面的二阶导数相等。通过计算，这等价于 |h(u,u)| 与方向u无关，即各向同性。'
                  : 'If c#(M) ≥ 3, geodesic and normal section have equal 2nd derivatives. By calculation, this is equivalent to |h(u,u)| being independent of direction u, i.e., isotropy.'}
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-4">
              <p className="text-pink-400 font-semibold mb-2">← {isZh ? '逆向证明思路' : 'Backward Proof Idea'}</p>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? '若M是各向同性的，利用Codazzi方程（描述曲率如何变化的方程），可以验证三阶导数相等，从而c# ≥ 3。'
                  : 'If M is isotropic, using the Codazzi equation (which describes how curvature varies), we can verify 3rd derivative equality, hence c# ≥ 3.'}
              </p>
            </div>
          </div>

          {/* What does this tell us */}
          <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-4 border border-yellow-700">
            <p className="text-orange-400 font-semibold mb-2">
              🎯 {isZh ? '这个定理告诉我们什么？' : 'What Does This Theorem Tell Us?'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '接触数不是随意的数字——它精确地刻画了子流形的几何对称性。c# ≥ 3 恰好捕捉了"各向同性"这一重要的几何性质。这建立了一个纯粹分析定义（导数相等的阶数）与几何性质（各向同性）之间的桥梁。'
                : 'Contact number isn\'t arbitrary—it precisely characterizes submanifold geometric symmetry. c# ≥ 3 exactly captures the important property of "isotropy". This bridges a purely analytic definition (order of derivative equality) with a geometric property (isotropy).'}
            </p>
          </div>
        </section>

        {/* Section 6.2 - Constant Isotropic */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 id="section-6.2" className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '6.2 常各向同性子流形' : '6.2 Constant Isotropic Submanifolds'}
          </h2>
          
          {/* Why constant */}
          <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-lg p-4 border border-blue-700 mb-4">
            <p className="text-blue-400 font-semibold mb-2">
              🤔 {isZh ? '为什么要考虑"常"各向同性？' : 'Why Consider "Constant" Isotropy?'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '各向同性说的是：在每一点，各方向弯曲相同。但不同点的弯曲程度λ(p)可能不同。常各向同性更强：不仅每点各向同性，而且λ在整个M上是同一个常数！'
                : 'Isotropy says: at each point, bending is the same in all directions. But the bending magnitude λ(p) might differ between points. Constant isotropy is stronger: not only is each point isotropic, but λ is the same constant over all of M!'}
            </p>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">
              📝 {isZh ? '定义（常各向同性）' : 'Definition (Constant Isotropic)'}
            </p>
            <p className="text-slate-300 mb-2">
              {isZh 
                ? '子流形M是常各向同性的，如果λ = |h(u,u)| 在整个M上是常数。'
                : 'A submanifold M is constant isotropic if λ = |h(u,u)| is constant over all of M.'}
            </p>
            <MathBlock>{'\\lambda = |h(u,u)| = \\text{const for all } p \\in M, u \\in U_pM'}</MathBlock>
          </div>

          {/* Example comparison */}
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-slate-800 rounded-lg p-4">
              <p className="text-cyan-400 font-semibold mb-2">🔵 {isZh ? '各向同性但非常各向同性' : 'Isotropic but NOT Constant'}</p>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? '想象一个"变半径的球面"——在每点各方向弯曲相同，但不同点的弯曲程度不同。'
                  : 'Imagine a "sphere with varying radius"—at each point bending is same in all directions, but different points have different bending.'}
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-4">
              <p className="text-green-400 font-semibold mb-2">⚪ {isZh ? '常各向同性' : 'Constant Isotropic'}</p>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? '标准球面S^n——所有点的弯曲程度都是1/r，完全均匀。'
                  : 'Standard sphere S^n—bending is 1/r at all points, completely uniform.'}
              </p>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-4">
            <p className="text-green-400 font-semibold mb-2">
              🔄 {isZh ? '等价条件（技术性）' : 'Equivalent Condition (Technical)'}
            </p>
            <MathBlock>{'A_{(\\bar{\\nabla}h)(u^3)} u = 0'}</MathBlock>
            <p className="text-slate-400 text-sm mt-2">
              {isZh 
                ? '这里∇̄h是第二基本形式的协变导数。这个条件刻画了弯曲如何随位置变化。'
                : 'Here ∇̄h is the covariant derivative of the second fundamental form. This condition characterizes how bending varies with position.'}
            </p>
          </div>
        </section>

        {/* Theorem 2: c# ≥ 4 ⟺ Constant Isotropic */}
        <section className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-6 border-2 border-purple-700">
          <h2 className="text-xl font-semibold text-purple-400 mb-4">
            ⭐ {isZh ? '定理2：c#(M) ≥ 4 ⟺ 常各向同性' : 'Theorem 2: c#(M) ≥ 4 ⟺ Constant Isotropic'}
          </h2>
          
          <div className="bg-slate-900 rounded-lg p-4 mb-4">
            <p className="text-white font-semibold mb-3">
              📜 {isZh ? '陈-李定理 (Chen-Li, 2004)' : 'Chen-Li Theorem (2004)'}
            </p>
            <p className="text-slate-300">
              {isZh 
                ? '子流形M的接触数 c#(M) ≥ 4 当且仅当 M 是常各向同性的。'
                : 'The contact number c#(M) ≥ 4 if and only if M is constant isotropic.'}
            </p>
          </div>

          {/* Why 4 */}
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-yellow-400 font-semibold mb-2">
              🤔 {isZh ? '为什么c# ≥ 4对应常各向同性？' : 'Why Does c# ≥ 4 Correspond to Constant Isotropy?'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? 'c# ≥ 4 意味着三阶导数也相等。三阶导数涉及曲率的导数（曲率如何随位置变化）。如果测地线和法截面在三阶导数上也一致，说明曲率在空间上不变化——这正是"常"各向同性！'
                : 'c# ≥ 4 means 3rd derivatives are also equal. 3rd derivatives involve curvature derivatives (how curvature varies with position). If geodesic and normal section agree at 3rd order, curvature doesn\'t vary spatially—this is exactly "constant" isotropy!'}
            </p>
          </div>

          {/* Pattern */}
          <div className="bg-slate-800 rounded-lg p-4">
            <p className="text-green-400 font-semibold mb-2">
              📊 {isZh ? '规律总结' : 'Pattern Summary'}
            </p>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• c# ≥ 2: {isZh ? '无条件（所有子流形）' : 'No condition (all submanifolds)'}</li>
              <li>• c# ≥ 3: {isZh ? '各向同性（各方向弯曲相同）' : 'Isotropic (same bending in all directions)'}</li>
              <li>• c# ≥ 4: {isZh ? '常各向同性（各方向、各位置弯曲都相同）' : 'Constant isotropic (same bending everywhere)'}</li>
              <li>• c# = ∞: {isZh ? '全脐（弯曲完全均匀，如球面）' : 'Totally umbilical (completely uniform bending, like sphere)'}</li>
            </ul>
          </div>
        </section>

        {/* Theorem 3: Surfaces with c# = 3 */}
        <section className="bg-gradient-to-r from-orange-900/30 to-yellow-900/30 rounded-xl p-6 border-2 border-orange-700">
          <h2 className="text-xl font-semibold text-orange-400 mb-4">
            ⭐ {isZh ? '定理3：曲面的特殊定理' : 'Theorem 3: Special Theorem for Surfaces'}
          </h2>
          
          <div className="bg-slate-900 rounded-lg p-4 mb-4">
            <p className="text-white font-semibold mb-3">
              📜 {isZh ? '定理：曲面与全纯曲线' : 'Theorem: Surfaces and Holomorphic Curves'}
            </p>
            <p className="text-slate-300">
              {isZh 
                ? '欧氏空间中的曲面M满足 c#(M) = 3 当且仅当 M 是复平面C²中的非平面全纯曲线。'
                : 'A surface M in Euclidean space has c#(M) = 3 if and only if M is a non-planar holomorphic curve in a complex 2-plane C².'}
            </p>
          </div>

          {/* Prerequisites: Complex numbers */}
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-blue-400 font-semibold mb-2">
              📚 {isZh ? '前置知识：复数回顾' : 'Prerequisite: Complex Numbers Review'}
            </p>
            <p className="text-slate-300 text-sm mb-3">
              {isZh 
                ? '复数是实数的扩展，形式为 z = x + iy，其中 i² = -1。'
                : 'Complex numbers extend real numbers, in the form z = x + iy, where i² = -1.'}
            </p>
            <div className="grid md:grid-cols-3 gap-3">
              <div className="bg-slate-700 rounded-lg p-2">
                <p className="text-cyan-400 text-sm font-semibold">z = x + iy</p>
                <p className="text-slate-400 text-xs">{isZh ? 'x是实部，y是虚部' : 'x is real part, y is imaginary part'}</p>
              </div>
              <div className="bg-slate-700 rounded-lg p-2">
                <p className="text-cyan-400 text-sm font-semibold">ℂ = {isZh ? '复平面' : 'Complex plane'}</p>
                <p className="text-slate-400 text-xs">{isZh ? '所有复数的集合' : 'Set of all complex numbers'}</p>
              </div>
              <div className="bg-slate-700 rounded-lg p-2">
                <p className="text-cyan-400 text-sm font-semibold">ℂ² = ℂ × ℂ</p>
                <p className="text-slate-400 text-xs">{isZh ? '复数对 (z₁, z₂)' : 'Complex pairs (z₁, z₂)'}</p>
              </div>
            </div>
          </div>

          {/* What is holomorphic function */}
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-green-400 font-semibold mb-2">
              📖 {isZh ? '什么是全纯函数（解析函数）？' : 'What is a Holomorphic (Analytic) Function?'}
            </p>
            <p className="text-slate-300 text-sm mb-3">
              {isZh 
                ? '全纯函数是复变函数中"最好"的函数——可以用幂级数展开，处处可微。'
                : 'Holomorphic functions are the "nicest" complex functions—can be expanded as power series, differentiable everywhere.'}
            </p>
            <div className="bg-slate-700 rounded-lg p-3 mb-3">
              <p className="text-cyan-400 font-semibold mb-1">{isZh ? '定义' : 'Definition'}</p>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? '函数 f: ℂ → ℂ 是全纯的，如果它满足 Cauchy-Riemann 方程，即复导数存在。'
                  : 'Function f: ℂ → ℂ is holomorphic if it satisfies Cauchy-Riemann equations, i.e., complex derivative exists.'}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-slate-700 rounded-lg p-2">
                <p className="text-green-400 text-sm">✓ {isZh ? '全纯例子' : 'Holomorphic examples'}</p>
                <p className="text-slate-300 text-xs">f(z) = z², f(z) = eᶻ, f(z) = sin(z)</p>
              </div>
              <div className="bg-slate-700 rounded-lg p-2">
                <p className="text-red-400 text-sm">✗ {isZh ? '非全纯例子' : 'Non-holomorphic examples'}</p>
                <p className="text-slate-300 text-xs">f(z) = z̄ ({isZh ? '共轭' : 'conjugate'}), f(z) = |z|</p>
              </div>
            </div>
          </div>

          {/* What is holomorphic curve */}
          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-4 border border-purple-700 mb-4">
            <p className="text-purple-400 font-semibold mb-2">
              🔮 {isZh ? '什么是全纯曲线？' : 'What is a Holomorphic Curve?'}
            </p>
            <p className="text-slate-300 text-sm mb-3">
              {isZh 
                ? '全纯曲线是用全纯函数参数化的曲线。它是复几何中"最光滑"的曲线类型。'
                : 'A holomorphic curve is a curve parameterized by holomorphic functions. It\'s the "smoothest" type of curve in complex geometry.'}
            </p>
            <div className="bg-slate-900 rounded-lg p-3 mb-3">
              <p className="text-cyan-400 font-semibold mb-1">{isZh ? '形式定义' : 'Formal Definition'}</p>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? '曲线 γ: ℂ → ℂ² 是全纯的，如果 γ(z) = (f(z), g(z))，其中f和g都是全纯函数。'
                  : 'Curve γ: ℂ → ℂ² is holomorphic if γ(z) = (f(z), g(z)), where both f and g are holomorphic.'}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-yellow-400 text-sm font-semibold">{isZh ? '具体例子' : 'Concrete Examples'}</p>
              <div className="grid md:grid-cols-2 gap-2">
                <div className="bg-slate-800 rounded-lg p-2">
                  <p className="text-cyan-400 text-sm">γ(z) = (z, z²)</p>
                  <p className="text-slate-400 text-xs">{isZh ? '抛物线（在ℂ²中）' : 'Parabola (in ℂ²)'}</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-2">
                  <p className="text-cyan-400 text-sm">γ(z) = (z, z³)</p>
                  <p className="text-slate-400 text-xs">{isZh ? '三次曲线' : 'Cubic curve'}</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-2">
                  <p className="text-cyan-400 text-sm">γ(z) = (eᶻ, e²ᶻ)</p>
                  <p className="text-slate-400 text-xs">{isZh ? '指数曲线' : 'Exponential curve'}</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-2">
                  <p className="text-cyan-400 text-sm">γ(z) = (z, 0)</p>
                  <p className="text-slate-400 text-xs">{isZh ? '平面全纯曲线' : 'Planar holomorphic curve'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ℂ² as E⁴ */}
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-400 font-semibold mb-2">
              🔄 {isZh ? 'ℂ² 和 E⁴ 的关系' : 'Relationship Between ℂ² and E⁴'}
            </p>
            <p className="text-slate-300 text-sm mb-2">
              {isZh 
                ? 'ℂ² 可以看作 E⁴（四维欧氏空间）：每个复数 z = x + iy 对应两个实数 (x, y)。'
                : 'ℂ² can be viewed as E⁴ (4D Euclidean space): each complex number z = x + iy corresponds to two real numbers (x, y).'}
            </p>
            <div className="bg-slate-700 rounded-lg p-3">
              <p className="text-slate-300 text-sm">
                (z₁, z₂) = (x₁ + iy₁, x₂ + iy₂) ↔ (x₁, y₁, x₂, y₂) ∈ E⁴
              </p>
            </div>
            <p className="text-slate-400 text-sm mt-2">
              {isZh 
                ? '所以ℂ²中的全纯曲线是E⁴中的一个二维曲面！'
                : 'So a holomorphic curve in ℂ² is a 2D surface in E⁴!'}
            </p>
          </div>

          {/* Why c#=3 equals holomorphic */}
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-yellow-400 font-semibold mb-2">
              🤔 {isZh ? '为什么 c# = 3 恰好对应全纯曲线？' : 'Why Does c# = 3 Exactly Correspond to Holomorphic Curves?'}
            </p>
            <p className="text-slate-300 text-sm mb-2">
              {isZh 
                ? '这是一个深刻的结果！直观理解：'
                : 'This is a profound result! Intuitive understanding:'}
            </p>
            <ul className="text-slate-300 text-sm space-y-2">
              <li>• {isZh 
                ? '全纯函数满足 Cauchy-Riemann 方程，这是一种"额外对称性"'
                : 'Holomorphic functions satisfy Cauchy-Riemann equations—an "extra symmetry"'}
              </li>
              <li>• {isZh 
                ? 'c# = 3 的各向同性条件也是一种"额外对称性"'
                : 'The isotropy condition for c# = 3 is also an "extra symmetry"'}
              </li>
              <li>• {isZh 
                ? 'Chen-Li证明：这两种对称性恰好等价！'
                : 'Chen-Li proved: these two symmetries are exactly equivalent!'}
              </li>
            </ul>
          </div>

          {/* Why surprising */}
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-purple-400 font-semibold mb-2">
              🎯 {isZh ? '为什么这个定理令人惊讶？' : 'Why is This Theorem Surprising?'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '接触数是纯粹的微分几何概念（比较测地线和法截面），全纯曲线是复几何概念（涉及复数和解析函数）。这个定理揭示了两个看似无关的数学领域之间的深刻联系！'
                : 'Contact number is purely differential geometric (comparing geodesic and normal section), while holomorphic curve is from complex geometry (involving complex numbers and analytic functions). This theorem reveals deep connections between two seemingly unrelated mathematical fields!'}
            </p>
          </div>

          <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-4 border border-yellow-700">
            <p className="text-yellow-400 font-semibold mb-2">
              🔗 {isZh ? '数学统一性的体现' : 'Manifestation of Mathematical Unity'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '这类定理展示了数学的内在统一性：微分几何、复分析、代数几何等不同分支通过深刻的定理联系在一起。接触数理论不仅是子流形几何的工具，也是连接不同数学领域的桥梁。'
                : 'Such theorems demonstrate the inherent unity of mathematics: differential geometry, complex analysis, algebraic geometry, and other branches are connected through profound theorems. Contact number theory is not just a tool in submanifold geometry, but a bridge connecting different mathematical fields.'}
            </p>
          </div>
        </section>

        {/* Summary Table */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            📊 {isZh ? '定理总结' : 'Theorem Summary'}
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-slate-300">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="py-2 px-4">{isZh ? '接触数' : 'Contact Number'}</th>
                  <th className="py-2 px-4">{isZh ? '等价条件' : 'Equivalent Condition'}</th>
                  <th className="py-2 px-4">{isZh ? '几何意义' : 'Geometric Meaning'}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-800">
                  <td className="py-3 px-4"><Math>{'c^\\#(M) \\geq 2'}</Math></td>
                  <td className="py-3 px-4">{isZh ? '无条件' : 'No condition'}</td>
                  <td className="py-3 px-4 text-sm">{isZh ? '所有子流形' : 'All submanifolds'}</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-3 px-4"><Math>{'c^\\#(M) \\geq 3'}</Math></td>
                  <td className="py-3 px-4">{isZh ? '各向同性' : 'Isotropic'}</td>
                  <td className="py-3 px-4 text-sm">{isZh ? '各方向弯曲相同' : 'Same bending all directions'}</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-3 px-4"><Math>{'c^\\#(M) \\geq 4'}</Math></td>
                  <td className="py-3 px-4">{isZh ? '常各向同性' : 'Constant Isotropic'}</td>
                  <td className="py-3 px-4 text-sm">{isZh ? '各处各方向弯曲都相同' : 'Same bending everywhere'}</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-3 px-4"><Math>{'c^\\#(M) = 3'}</Math></td>
                  <td className="py-3 px-4">{isZh ? 'C²中全纯曲线' : 'Holomorphic in C²'}</td>
                  <td className="py-3 px-4 text-sm">{isZh ? '仅对曲面' : 'Surfaces only'}</td>
                </tr>
                <tr>
                  <td className="py-3 px-4"><Math>{'c^\\#(M) = \\infty'}</Math></td>
                  <td className="py-3 px-4">{isZh ? '全脐' : 'Totally umbilical'}</td>
                  <td className="py-3 px-4 text-sm">{isZh ? '如球面、平面' : 'Like spheres, planes'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Chapter Summary */}
        <section className="bg-gradient-to-r from-green-900/50 to-cyan-900/50 rounded-xl p-6 border border-green-700">
          <h2 className="text-xl font-semibold text-green-400 mb-4">
            ✅ {isZh ? '本章小结' : 'Chapter Summary'}
          </h2>
          <ul className="text-slate-300 text-sm space-y-2">
            <li>✓ {isZh ? '各向同性：在每点，各方向的法曲率向量长度相同' : 'Isotropic: at each point, normal curvature vector length is same in all directions'}</li>
            <li>✓ {isZh ? '常各向同性：各向同性 + λ在整个M上是常数' : 'Constant isotropic: isotropic + λ is constant over all M'}</li>
            <li>✓ {isZh ? '定理1：c# ≥ 3 ⟺ 各向同性（二阶导数相等 ⟺ 各向同性条件）' : 'Theorem 1: c# ≥ 3 ⟺ isotropic (2nd derivatives equal ⟺ isotropy condition)'}</li>
            <li>✓ {isZh ? '定理2：c# ≥ 4 ⟺ 常各向同性（三阶导数相等 ⟺ 弯曲不随位置变化）' : 'Theorem 2: c# ≥ 4 ⟺ constant isotropic (3rd derivatives equal ⟺ curvature doesn\'t vary)'}</li>
            <li>✓ {isZh ? '定理3：曲面c# = 3 ⟺ 全纯曲线（微分几何与复几何的联系）' : 'Theorem 3: surface c# = 3 ⟺ holomorphic curve (link between differential and complex geometry)'}</li>
          </ul>

          <div className="mt-6 bg-slate-900 rounded-lg p-4">
            <p className="text-yellow-400 font-semibold mb-3">
              🤔 {isZh ? '思考题' : 'Questions to Think About'}
            </p>
            <div className="space-y-3">
              <div>
                <p className="text-slate-300 text-sm">
                  {isZh 
                    ? '1. 为什么"全纯曲线"会和接触数产生联系？复数的什么特性导致了这种联系？'
                    : '1. Why do "holomorphic curves" relate to contact number? What property of complex numbers leads to this connection?'}
                </p>
                <details className="mt-1">
                  <summary className="text-cyan-400 text-sm cursor-pointer hover:text-cyan-300">
                    {isZh ? '点击查看答案' : 'Click to see answer'}
                  </summary>
                  <p className="text-slate-400 text-xs mt-1">
                    {isZh 
                      ? '因为乘以i实现了90°旋转！全纯映射保持这种旋转结构，这意味着在每个方向上的行为是"对称"的。而各向同性恰好要求各方向行为一致——这就是两者联系的几何根源。'
                      : 'Because multiplication by i achieves 90° rotation! Holomorphic maps preserve this rotational structure, meaning behavior is "symmetric" in all directions. Isotropy requires exactly this direction-independence—that\'s the geometric root of their connection.'}
                  </p>
                </details>
              </div>
              <div>
                <p className="text-slate-300 text-sm">
                  {isZh 
                    ? '2. 在物理学中，"各向同性"意味着材料各方向性质相同。子流形的各向同性和材料的各向同性有什么本质区别？'
                    : '2. In physics, "isotropy" means a material has the same properties in all directions. What\'s the essential difference between isotropic submanifolds and isotropic materials?'}
                </p>
                <details className="mt-1">
                  <summary className="text-cyan-400 text-sm cursor-pointer hover:text-cyan-300">
                    {isZh ? '点击查看答案' : 'Click to see answer'}
                  </summary>
                  <p className="text-slate-400 text-xs mt-1">
                    {isZh 
                      ? '材料各向同性是关于材料内部性质（如导电性、强度）的；子流形各向同性是关于它在外部空间中如何"弯曲"的。前者是内蕴性质，后者是外蕴性质——但两者都表达了某种"对称性"的概念！'
                      : 'Material isotropy is about internal properties (conductivity, strength); submanifold isotropy is about how it "bends" in ambient space. Former is intrinsic, latter is extrinsic—but both express a concept of "symmetry"!'}
                  </p>
                </details>
              </div>
            </div>
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
