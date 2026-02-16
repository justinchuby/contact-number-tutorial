import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MathBlock, Tooltip } from '../components';
import { PseudoUmbilicalViz, NonSphericalPUViz } from '../visualizations';

export default function Chapter7() {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <p className="text-cyan-400 text-sm mb-2">{t('nav.chapter', { num: 7 })}</p>
        <h1 className="text-3xl font-bold text-white mb-2">{t('chapters.ch7.title')}</h1>
        <p className="text-slate-400">{t('chapters.ch7.subtitle')}</p>
      </header>

      <div className="space-y-8">
        {/* Chapter Overview */}
        <section className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-6 border border-purple-700">
          <h2 className="text-xl font-semibold text-purple-400 mb-4">
            📋 {isZh ? '本章概览' : 'Chapter Overview'}
          </h2>
          <p className="text-slate-300 mb-4">
            {isZh 
              ? '本章介绍Chen-Li论文的具体分类定理和重大发现。我们将看到接触数理论如何给出子流形的完整分类，以及如何发现新的几何对象。'
              : 'This chapter presents specific classification theorems and major discoveries from Chen-Li\'s paper. We\'ll see how contact number theory provides complete classifications of submanifolds and leads to discovering new geometric objects.'}
          </p>
          <div className="grid md:grid-cols-3 gap-3">
            <div className="bg-slate-800 rounded-lg p-3 text-center">
              <div className="text-2xl mb-1">📊</div>
              <p className="text-slate-300 text-sm">{isZh ? '余维数2分类' : 'Codim-2 Classification'}</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-3 text-center">
              <div className="text-2xl mb-1">🔮</div>
              <p className="text-slate-300 text-sm">{isZh ? '广义螺旋面' : 'Generalized Helicoid'}</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-3 text-center">
              <div className="text-2xl mb-1">⭐</div>
              <p className="text-slate-300 text-sm">{isZh ? 'Pseudo-umbilical发现' : 'Pseudo-umbilical Discovery'}</p>
            </div>
          </div>
        </section>

        {/* Section 7.1 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 id="section-7.1" className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '7.1 余维数为2的子流形分类' : '7.1 Classification of Codimension-2 Submanifolds'}
          </h2>
          
          <p className="text-slate-300 mb-4">
            {isZh 
              ? '当余维数（codimension = m - n）为2时，即子流形嵌入的"额外维度"只有2个，Chen-Li给出了完整的分类：'
              : 'When codimension (= m - n) is 2, meaning the submanifold is embedded with only 2 "extra dimensions", Chen-Li provide a complete classification:'}
          </p>

          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">
              📜 {isZh ? '定理 (Chen-Li)' : 'Theorem (Chen-Li)'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '设 M 是 E^(n+2) 中的 n 维子流形，c#(M) ≥ 3。则 M 是以下之一：'
                : 'Let M be an n-dimensional submanifold of E^(n+2) with c#(M) ≥ 3. Then M is one of:'}
            </p>
            <ul className="text-slate-300 text-sm mt-2 space-y-1 list-disc list-inside">
              <li>{isZh ? '开部分的 n 维球面 S^n' : 'Open portion of n-sphere S^n'}</li>
              <li>{isZh ? '开部分的广义螺旋面' : 'Open portion of generalized helicoid'}</li>
              <li>{isZh ? 'C^(n/2) 中的非平面全纯曲线（当 n 为偶数）' : 'Non-planar holomorphic curve in C^(n/2) (when n is even)'}</li>
            </ul>
          </div>

          {/* Why codim 2 */}
          <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-lg p-4 border border-blue-700 mb-4">
            <p className="text-blue-400 font-semibold mb-2">
              🤔 {isZh ? '为什么是余维数2？' : 'Why Codimension 2?'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '余维数2是一个"甜蜜点"：足够复杂以产生有趣的现象，又足够简单可以完全分类。余维数1（超曲面）太特殊，余维数≥3则太复杂。'
                : 'Codimension 2 is a "sweet spot": complex enough for interesting phenomena, yet simple enough for complete classification. Codim 1 (hypersurfaces) is too special, codim ≥3 is too complex.'}
            </p>
          </div>

          {/* What is generalized helicoid */}
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-purple-400 font-semibold mb-2">
              🌀 {isZh ? '什么是广义螺旋面？' : 'What is a Generalized Helicoid?'}
            </p>
            <p className="text-slate-300 text-sm mb-3">
              {isZh 
                ? '你可能见过螺旋楼梯或弹簧——这就是三维空间中的螺旋面！'
                : 'You\'ve probably seen spiral staircases or springs—these are helicoids in 3D space!'}
            </p>
            
            <div className="bg-slate-700 rounded-lg p-3 mb-3">
              <p className="text-cyan-400 font-semibold mb-1">{isZh ? '经典螺旋面（E³中）' : 'Classical Helicoid (in E³)'}</p>
              <p className="text-slate-300 text-sm mb-2">
                {isZh 
                  ? '螺旋面是极小曲面（肥皂膜曲面）的一种，可以通过直线一边旋转一边上升来生成。'
                  : 'The helicoid is a type of minimal surface (soap film surface), generated by a line rotating while rising.'}
              </p>
              <MathBlock>{'(u, v) \\mapsto (u\\cos v, u\\sin v, av)'}</MathBlock>
              <p className="text-slate-400 text-xs mt-1">
                {isZh ? 'u是半径，v是角度，a控制"上升速度"' : 'u is radius, v is angle, a controls "rising speed"'}
              </p>
            </div>

            <div className="bg-slate-700 rounded-lg p-3">
              <p className="text-green-400 font-semibold mb-1">{isZh ? '广义螺旋面' : 'Generalized Helicoid'}</p>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? '将经典螺旋面的概念推广到高维空间。在E^(n+2)中，广义螺旋面是n维子流形，保持类似的"螺旋上升"结构。'
                  : 'Generalizes the classical helicoid concept to higher dimensions. In E^(n+2), a generalized helicoid is an n-dimensional submanifold maintaining similar "spiraling upward" structure.'}
              </p>
            </div>
          </div>

          {/* Why these three */}
          <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-4 border border-yellow-700">
            <p className="text-yellow-400 font-semibold mb-2">
              🤔 {isZh ? '为什么恰好是这三类？' : 'Why Exactly These Three Types?'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '这三类代表了不同的"对称性来源"：球面有最高对称性（c# = ∞），广义螺旋面有"螺旋对称性"，全纯曲线有"复对称性"。高接触数要求强对称性，而这三类恰好是余维数2时满足条件的所有可能。'
                : 'These three types represent different "sources of symmetry": spheres have highest symmetry (c# = ∞), generalized helicoids have "spiral symmetry", holomorphic curves have "complex symmetry". High contact number requires strong symmetry, and these three are exactly all possibilities satisfying the conditions in codim 2.'}
            </p>
          </div>
        </section>

        {/* Section 7.2 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 id="section-7.2" className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '7.2 E⁶中的曲面' : '7.2 Surfaces in E⁶'}
          </h2>
          
          <p className="text-slate-300 mb-4">
            {isZh 
              ? 'Chen-Li特别研究了6维欧氏空间中的曲面（2维子流形）。这里余维数为4，几何更加丰富。'
              : 'Chen-Li specifically studied surfaces (2-dimensional submanifolds) in 6-dimensional Euclidean space. Here codimension is 4, and geometry is richer.'}
          </p>

          {/* Why E6 */}
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-green-400 font-semibold mb-2">
              🤔 {isZh ? '为什么研究E⁶？' : 'Why Study E⁶?'}
            </p>
            <p className="text-slate-300 text-sm mb-3">
              {isZh 
                ? 'E⁶ = ℝ⁶ 可以看作 C³（3维复空间）：'
                : 'E⁶ = ℝ⁶ can be viewed as C³ (3-dimensional complex space):'}
            </p>
            <div className="bg-slate-700 rounded-lg p-3 mb-3">
              <p className="text-slate-300 text-sm">
                (x₁, y₁, x₂, y₂, x₃, y₃) ↔ (x₁ + iy₁, x₂ + iy₂, x₃ + iy₃) = (z₁, z₂, z₃) ∈ C³
              </p>
            </div>
            <p className="text-slate-400 text-sm">
              {isZh 
                ? '这建立了与复几何的深刻联系。曲面在C³中的行为与全纯函数理论相关。'
                : 'This establishes deep connections with complex geometry. Surface behavior in C³ relates to holomorphic function theory.'}
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-4">
            <p className="text-cyan-300 font-semibold mb-2">
              📜 {isZh ? '定理：c# ≥ 4 的曲面' : 'Theorem: Surfaces with c# ≥ 4'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? 'E⁶ 中 c# ≥ 4 的曲面必须是常各向同性的，且具有非常特殊的几何结构。这些曲面的第二基本形式满足严格的代数约束。'
                : 'Surfaces in E⁶ with c# ≥ 4 must be constant isotropic and have very special geometric structure. The second fundamental form of these surfaces satisfies strict algebraic constraints.'}
            </p>
          </div>
        </section>

        {/* Section 7.3 - Major discovery */}
        <section className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-xl p-6 border-2 border-yellow-600">
          <h2 id="section-7.3" className="text-xl font-semibold text-yellow-400 mb-4">
            ⭐ {isZh ? '7.3 重大发现：首例非球面 Pseudo-Umbilical 曲面' : '7.3 Major Discovery: First Non-Spherical Pseudo-Umbilical Surfaces'}
          </h2>
          
          <div className="space-y-4">
            {/* Umbilical review */}
            <div className="bg-slate-900 rounded-lg p-4">
              <h3 className="text-blue-400 font-semibold mb-2">
                📚 {isZh ? '前置知识：什么是脐点（Umbilical Point）？' : 'Prerequisite: What is an Umbilical Point?'}
              </h3>
              <p className="text-slate-300 text-sm mb-3">
                {isZh 
                  ? '脐点是曲面上一个特殊的点，在那里各方向的法曲率都相同。'
                  : 'An umbilical point is a special point on a surface where normal curvature is the same in all directions.'}
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-slate-800 rounded-lg p-2">
                  <p className="text-cyan-400 text-sm font-semibold">{isZh ? '球面' : 'Sphere'}</p>
                  <p className="text-slate-400 text-xs">{isZh ? '每个点都是脐点！' : 'Every point is umbilical!'}</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-2">
                  <p className="text-purple-400 text-sm font-semibold">{isZh ? '椭球面' : 'Ellipsoid'}</p>
                  <p className="text-slate-400 text-xs">{isZh ? '只有4个脐点（两极附近）' : 'Only 4 umbilical points (near poles)'}</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm mt-2">
                {isZh 
                  ? '全脐子流形（totally umbilical）= 每个点都是脐点 → c# = ∞'
                  : 'Totally umbilical submanifold = every point is umbilical → c# = ∞'}
              </p>
            </div>

            {/* Pseudo-umbilical definition */}
            <div className="bg-slate-900 rounded-lg p-4">
              <h3 className="text-cyan-400 font-semibold mb-2">
                🔮 {isZh ? '什么是 Pseudo-Umbilical（伪脐）？' : 'What is Pseudo-Umbilical?'}
              </h3>
              <p className="text-slate-300 text-sm mb-3">
                {isZh 
                  ? 'Pseudo-umbilical 是比 umbilical 更弱的条件，只要求沿平均曲率向量H方向的形状算子是恒等映射的倍数。'
                  : 'Pseudo-umbilical is weaker than umbilical, only requiring the shape operator in mean curvature direction H to be a scalar multiple of identity.'}
              </p>
              <div className="bg-slate-800 rounded-lg p-3 mb-3">
                <p className="text-yellow-400 font-semibold mb-1">{isZh ? '数学定义' : 'Mathematical Definition'}</p>
                <MathBlock>{'A_H = \\lambda \\cdot I'}</MathBlock>
                <p className="text-slate-400 text-xs mt-1">
                  {isZh 
                    ? 'A_H 是沿H方向的形状算子，I是恒等映射，λ是常数'
                    : 'A_H is shape operator in H direction, I is identity, λ is constant'}
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-slate-800 rounded-lg p-2">
                  <p className="text-green-400 text-sm font-semibold">{isZh ? 'Umbilical（脐）' : 'Umbilical'}</p>
                  <p className="text-slate-400 text-xs">{isZh ? '所有法方向都是恒等倍数' : 'All normal directions are identity multiple'}</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-2">
                  <p className="text-purple-400 text-sm font-semibold">{isZh ? 'Pseudo-umbilical（伪脐）' : 'Pseudo-umbilical'}</p>
                  <p className="text-slate-400 text-xs">{isZh ? '只要求H方向是恒等倍数' : 'Only H direction needs to be identity multiple'}</p>
                </div>
              </div>
            </div>

            {/* Historical context */}
            <div className="bg-slate-900 rounded-lg p-4">
              <h3 className="text-red-400 font-semibold mb-2">
                📜 {isZh ? '历史背景：之前的困境' : 'Historical Context: Previous Dilemma'}
              </h3>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? '在Chen-Li论文之前，所有已知的pseudo-umbilical曲面要么是球面，要么是球面的一部分。数学家们开始怀疑：'
                  : 'Before Chen-Li\'s paper, all known pseudo-umbilical surfaces were either spheres or parts of spheres. Mathematicians began to wonder:'}
              </p>
              <p className="text-yellow-400 text-sm mt-2 italic">
                "{isZh ? '是否所有pseudo-umbilical曲面都必须是球形的？' : 'Must all pseudo-umbilical surfaces be spherical?'}"
              </p>
            </div>

            {/* Breakthrough */}
            <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-lg p-4 border border-green-600">
              <h3 className="text-green-400 font-semibold mb-2">
                🎉 {isZh ? 'Chen-Li的突破' : 'Chen-Li\'s Breakthrough'}
              </h3>
              <p className="text-slate-300 text-sm mb-3">
                {isZh 
                  ? 'Chen-Li构造出了显式的非球面pseudo-umbilical曲面例子！'
                  : 'Chen-Li constructed explicit examples of non-spherical pseudo-umbilical surfaces!'}
              </p>
              <ul className="text-slate-300 text-sm space-y-2">
                <li>• {isZh ? '这些曲面存在于E⁶中（不是E³或E⁴）' : 'These surfaces exist in E⁶ (not E³ or E⁴)'}</li>
                <li>• {isZh ? '它们是c# = 4的常各向同性曲面' : 'They are constant isotropic surfaces with c# = 4'}</li>
                <li>• {isZh ? '证明了pseudo-umbilical性质不蕴含球面性质' : 'Proved pseudo-umbilical does NOT imply spherical'}</li>
                <li>• {isZh ? '这是接触数理论的一个重要应用' : 'This is an important application of contact number theory'}</li>
              </ul>
            </div>

            {/* Donut in 6D */}
            <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 rounded-lg p-4 border border-green-700">
              <p className="text-green-400 font-semibold mb-2">
                🍩 {isZh ? '甜甜圈的"变身"' : 'The Donut\'s Transformation'}
              </p>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? '一个普通的三维空间里的甜甜圈（环面），接触数并不高。为什么？因为在甜甜圈的内圈，曲率像马鞍面一样；在外圈，曲率是正的，像球面。不同位置的弯曲完全不同，当然不是常各向同性的。但Chen-Li发现，把这个甜甜圈放进六维空间，用一种特殊的方式让它弯曲和折叠，就能精确调整它的几何属性，使得它处处对称（各向同性）、对称程度处处相等（常各向同性），但又没有完美到让测地线和法截线完全重合。结果：接触数不多不少，正好是4。'
                  : 'An ordinary donut (torus) in 3D doesn\'t have a high contact number. Why? Because at the inner ring, curvature is saddle-like; at the outer ring, it\'s positive like a sphere. Bending varies wildly—definitely not constant isotropic. But Chen-Li discovered that by placing this donut into 6D and bending it in a special way, they could precisely tune its geometry to be isotropic everywhere, with equal isotropy at every point, yet not so perfect that geodesics and normal sections completely coincide. Result: contact number is exactly 4.'}
              </p>
            </div>

            {/* How Contact Number Helped */}
            <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-4 border border-yellow-700">
              <h3 className="text-yellow-400 font-semibold mb-3">
                🔑 {isZh ? '接触数理论如何帮助发现？' : 'How Did Contact Number Theory Help?'}
              </h3>
              
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-cyan-400 font-semibold mb-1">{isZh ? '1. 提供新视角' : '1. Provided New Perspective'}</p>
                  <p className="text-slate-300">
                    {isZh 
                      ? 'Chen-Li 发现 c# ≥ 3 等价于各向同性条件。这意味着可以用接触数来"筛选"具有特殊对称性的子流形。'
                      : 'Chen-Li discovered c# ≥ 3 is equivalent to isotropy condition. This means contact number can "filter" submanifolds with special symmetry.'}
                  </p>
                </div>

                <div>
                  <p className="text-cyan-400 font-semibold mb-1">{isZh ? '2. 揭示关键联系' : '2. Revealed Key Connections'}</p>
                  <p className="text-slate-300">
                    {isZh 
                      ? 'Pseudo-umbilical 条件要求形状算子 A_H = λI，这与接触数 c# ≥ 3 密切相关。但 c# = 3 或 4 的曲面不一定是球面！'
                      : 'Pseudo-umbilical requires shape operator A_H = λI, closely related to c# ≥ 3. But surfaces with c# = 3 or 4 are not necessarily spheres!'}
                  </p>
                </div>

                <div>
                  <p className="text-cyan-400 font-semibold mb-1">{isZh ? '3. 指明构造方向' : '3. Pointed to Construction Path'}</p>
                  <p className="text-slate-300">
                    {isZh 
                      ? '通过分析接触数理论，Chen-Li 理解了为什么低维空间强迫 pseudo-umbilical 曲面是球面，以及需要多高的余维数才能打破这个限制。'
                      : 'By analyzing contact number theory, Chen-Li understood why lower dimensions force pseudo-umbilical surfaces to be spheres, and what codimension is needed to break this constraint.'}
                  </p>
                </div>

                <div className="bg-slate-800 rounded p-3 mt-2">
                  <p className="text-green-400 font-semibold mb-1">{isZh ? '关键洞察' : 'Key Insight'}</p>
                  <p className="text-slate-300">
                    {isZh 
                      ? '接触数理论不只是分类工具——它能指导新对象的构造！同一个框架既解释了为什么低维不行（必须是球面），又指出了高维的可能性（余维数 ≥ 4 时可以非球面）。'
                      : 'Contact number theory is not just a classification tool—it guides construction of new objects! The same framework explains why lower dimensions fail (must be spheres) and points to higher dimensional possibilities (non-spherical when codim ≥ 4).'}
                  </p>
                </div>
              </div>
            </div>

            {/* Why important */}
            <div className="bg-slate-900 rounded-lg p-4">
              <h3 className="text-purple-400 font-semibold mb-2">
                🤔 {isZh ? '为什么这个发现重要？' : 'Why is This Discovery Important?'}
              </h3>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? '这个发现展示了接触数理论的威力：它不仅能分类已知对象，还能发现新的几何对象！高维空间中存在我们在低维无法想象的几何结构。'
                  : 'This discovery demonstrates the power of contact number theory: it not only classifies known objects but also discovers new geometric objects! Higher dimensional spaces contain geometric structures we cannot imagine in lower dimensions.'}
              </p>
            </div>

            {/* What does it look like - NEW SECTION */}
            <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-lg p-4 border border-cyan-700">
              <h3 className="text-cyan-400 font-semibold mb-3">
                👁️ {isZh ? '非球面 Pseudo-Umbilical 曲面长什么样？' : 'What Do Non-Spherical Pseudo-Umbilical Surfaces Look Like?'}
              </h3>
              
              <p className="text-slate-300 text-sm mb-4">
                {isZh 
                  ? '这是一个很好的问题！由于这些曲面存在于6维空间中，我们无法直接"看到"它们。但我们可以通过以下方式理解：'
                  : 'Great question! Since these surfaces exist in 6-dimensional space, we cannot directly "see" them. But we can understand them through:'}
              </p>

              {/* Analogy 1 */}
              <div className="bg-slate-800 rounded-lg p-3 mb-3">
                <p className="text-yellow-400 font-semibold mb-2">
                  🎭 {isZh ? '类比1：变形但不裂开的气球' : 'Analogy 1: Deformed But Unbroken Balloon'}
                </p>
                <p className="text-slate-300 text-sm mb-2">
                  {isZh 
                    ? '想象一个完美的球形气球。Pseudo-umbilical的含义是：'
                    : 'Imagine a perfectly spherical balloon. Pseudo-umbilical means:'}
                </p>
                <ul className="text-slate-400 text-xs space-y-1 ml-4">
                  <li>• {isZh 
                    ? '球面：在每个方向、每个法方向上，弯曲程度都一样（像完美球形气球）'
                    : 'Sphere: bending is the same in every direction, every normal direction (like a perfect balloon)'}
                  </li>
                  <li>• {isZh 
                    ? 'Pseudo-umbilical：只要求在"平均弯曲方向"(H)上保持对称，其他法方向可以不同'
                    : 'Pseudo-umbilical: only requires symmetry in the "average bending direction" (H), other normal directions can differ'}
                  </li>
                </ul>
                <p className="text-green-400 text-xs mt-2">
                  💡 {isZh 
                    ? '就像一个气球被特殊力量拉扯变形，但在某个特定方向看过去，它仍然"各处一样"！'
                    : 'Like a balloon deformed by special forces, but from a specific direction, it still "looks uniform everywhere"!'}
                </p>
              </div>

              {/* Analogy 2 */}
              <div className="bg-slate-800 rounded-lg p-3 mb-3">
                <p className="text-purple-400 font-semibold mb-2">
                  🌊 {isZh ? '类比2：高维空间中的"波浪"' : 'Analogy 2: "Waves" in High Dimensions'}
                </p>
                <p className="text-slate-300 text-sm">
                  {isZh 
                    ? '在E³中，曲面弯曲只能"向上或向下"（只有1个法方向）。在E⁶中，曲面有4个独立的法方向可以弯曲！Chen-Li的曲面像是：'
                    : 'In E³, surfaces can only bend "up or down" (just 1 normal direction). In E⁶, surfaces have 4 independent normal directions to bend! Chen-Li\'s surface is like:'}
                </p>
                <ul className="text-slate-400 text-xs space-y-1 ml-4 mt-2">
                  <li>• {isZh ? '在某些法方向上弯曲得像球（均匀）' : 'Bending like a sphere (uniform) in some normal directions'}</li>
                  <li>• {isZh ? '在其他法方向上弯曲得不均匀（像马鞍或波浪）' : 'Bending non-uniformly in other directions (like saddle or waves)'}</li>
                  <li>• {isZh ? '但"平均"起来恰好满足pseudo-umbilical条件！' : 'But "on average" it exactly satisfies the pseudo-umbilical condition!'}</li>
                </ul>
              </div>

              {/* Mathematical insight */}
              <div className="bg-slate-800 rounded-lg p-3 mb-3">
                <p className="text-red-400 font-semibold mb-2">
                  📐 {isZh ? '数学洞察：为什么需要E⁶？' : 'Mathematical Insight: Why E⁶?'}
                </p>
                <p className="text-slate-300 text-sm mb-2">
                  {isZh 
                    ? '在低维空间中（E³, E⁴, E⁵）没有足够的"自由度"来构造这种曲面：'
                    : 'In lower dimensional spaces (E³, E⁴, E⁵), there\'s not enough "freedom" to construct such surfaces:'}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                  <div className="bg-slate-700 rounded p-2 text-center">
                    <p className="text-slate-400">E³</p>
                    <p className="text-slate-500">{isZh ? '余维数1' : 'codim 1'}</p>
                    <p className="text-red-400">❌</p>
                  </div>
                  <div className="bg-slate-700 rounded p-2 text-center">
                    <p className="text-slate-400">E⁴</p>
                    <p className="text-slate-500">{isZh ? '余维数2' : 'codim 2'}</p>
                    <p className="text-red-400">❌</p>
                  </div>
                  <div className="bg-slate-700 rounded p-2 text-center">
                    <p className="text-slate-400">E⁵</p>
                    <p className="text-slate-500">{isZh ? '余维数3' : 'codim 3'}</p>
                    <p className="text-red-400">❌</p>
                  </div>
                  <div className="bg-slate-700 rounded p-2 text-center">
                    <p className="text-cyan-400">E⁶</p>
                    <p className="text-slate-500">{isZh ? '余维数4' : 'codim 4'}</p>
                    <p className="text-green-400">✓</p>
                  </div>
                </div>
                <p className="text-slate-400 text-xs mt-2">
                  {isZh 
                    ? '余维数4（4个法方向）恰好提供了足够的空间来"藏"非均匀的弯曲，同时保持pseudo-umbilical性质！'
                    : 'Codimension 4 (4 normal directions) provides exactly enough room to "hide" non-uniform bending while maintaining pseudo-umbilical property!'}
                </p>
              </div>

              {/* Concrete construction hint */}
              <div className="bg-slate-800 rounded-lg p-3">
                <p className="text-green-400 font-semibold mb-2">
                  🔧 {isZh ? '具体构造（简化版）' : 'Concrete Construction (Simplified)'}
                </p>
                <p className="text-slate-300 text-sm mb-2">
                  {isZh 
                    ? 'Chen-Li的构造利用了复几何。在C³ = E⁶中，考虑这样的曲面：'
                    : 'Chen-Li\'s construction uses complex geometry. In C³ = E⁶, consider a surface like:'}
                </p>
                <div className="bg-slate-900 rounded p-2 text-center mb-2">
                  <MathBlock>{'M = \\{(z, w, f(z,w)) : (z,w) \\in D \\subset \\mathbb{C}^2\\}'}</MathBlock>
                </div>
                <p className="text-slate-400 text-xs">
                  {isZh 
                    ? '其中 f 是精心选择的函数，使得 M 满足 c# = 4 和 pseudo-umbilical 条件，但不是任何球面的一部分。这需要 f 满足特定的偏微分方程。'
                    : 'Where f is carefully chosen so M satisfies c# = 4 and pseudo-umbilical, but is not part of any sphere. This requires f to satisfy specific partial differential equations.'}
                </p>
              </div>

              {/* Take-away */}
              <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-700 rounded-lg">
                <p className="text-yellow-400 font-semibold text-sm">
                  🎯 {isZh ? '直观总结' : 'Intuitive Summary'}
                </p>
                <p className="text-slate-300 text-sm mt-1">
                  {isZh 
                    ? '非球面pseudo-umbilical曲面就像是一个"伪装成球的非球"——它在"平均意义"上各处一样对称，但实际上在某些隐藏的维度里是不均匀的。只有在6维及以上的空间里，才有足够的"躲藏空间"让这种伪装成为可能！'
                    : 'A non-spherical pseudo-umbilical surface is like a "non-sphere disguised as a sphere"—it\'s uniformly symmetric "on average", but actually non-uniform in some hidden dimensions. Only in 6D and above is there enough "hiding space" for this disguise to be possible!'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Visualization: Pseudo-umbilical torus from paper */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            🎮 {isZh ? '可视化：论文中的平坦环面 τₐ (Example 6.6)' : 'Visualization: Flat Torus τₐ from the Paper (Example 6.6)'}
          </h2>
          <p className="text-slate-300 text-sm mb-3">
            {isZh 
              ? <>这是Chen-Li论文中Example 6.6构造的平坦环面 τ<sub>a</sub> 在三维空间的投影。这个环面嵌入在六维欧氏空间E⁶中，具有接触数 c# = 4，是常各向同性的pseudo-umbilical曲面。由于六维无法直接看到，下面展示了不同的三维投影方式。</>
              : <>This is the 3D projection of the flat torus τ<sub>a</sub> constructed in Chen-Li's Example 6.6. This torus is embedded in 6-dimensional Euclidean space E⁶ with contact number c# = 4, and is a constant isotropic pseudo-umbilical surface. Since 6D can't be directly visualized, we show different 3D projections below.</>}
          </p>
          <div className="bg-slate-800 rounded-lg p-3 mb-3 overflow-x-auto">
            <MathBlock>{String.raw`\tau_a(u,v) = \frac{2}{\sqrt{6}\,a}\begin{pmatrix} \cos\!\frac{au}{\sqrt{2}}\cos\!\frac{\sqrt{3}\,av}{\sqrt{2}} \\[4pt] \cos\!\frac{au}{\sqrt{2}}\sin\!\frac{\sqrt{3}\,av}{\sqrt{2}} \\[4pt] \frac{1}{\sqrt{2}}\cos\!\sqrt{2}\,au \\[4pt] \sin\!\frac{au}{\sqrt{2}}\cos\!\frac{\sqrt{3}\,av}{\sqrt{2}} \\[4pt] \sin\!\frac{au}{\sqrt{2}}\sin\!\frac{\sqrt{3}\,av}{\sqrt{2}} \\[4pt] \frac{1}{\sqrt{2}}\sin\!\sqrt{2}\,au \end{pmatrix}`}</MathBlock>
          </div>
          <PseudoUmbilicalViz />
          <div className="mt-3 grid md:grid-cols-2 gap-3 text-sm">
            <div className="bg-slate-800 rounded p-3">
              <p className="text-purple-400 font-semibold mb-1">{isZh ? '为什么需要6维？' : 'Why 6 Dimensions?'}</p>
              <p className="text-slate-400 text-xs">
                {isZh 
                  ? '在3维空间中，环面的弯曲在内圈和外圈完全不同，无法实现常各向同性。6维空间提供了4个法方向，足以"隐藏"这种不均匀性。'
                  : 'In 3D, a torus bends differently on inner and outer rings—impossible to be constant isotropic. 6D provides 4 normal directions, enough to "hide" this non-uniformity.'}
              </p>
            </div>
            <div className="bg-slate-800 rounded p-3">
              <p className="text-cyan-400 font-semibold mb-1">{isZh ? '青色曲线' : 'Cyan Curve'}</p>
              <p className="text-slate-400 text-xs">
                {isZh 
                  ? '青色线条是环面上的一条测地线（u-参数曲线）的投影。在这个平坦环面上，测地线就是"直线"——但投影到3维后看起来是弯曲的。'
                  : 'The cyan line is a geodesic (u-parameter curve) on the torus, projected to 3D. On this flat torus, geodesics are "straight"—but appear curved when projected to 3D.'}
              </p>
            </div>
          </div>
        </section>

        {/* Visualization: Non-spherical pseudo-umbilical surface (10.20) */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-orange-400 mb-4">
            🎮 {isZh ? '可视化：首例非球面 Pseudo-Umbilical 曲面 (公式 10.20)' : 'Visualization: First Non-Spherical Pseudo-Umbilical Surface (Formula 10.20)'}
          </h2>
          <p className="text-slate-300 text-sm mb-3">
            {isZh 
              ? <>这是Chen-Li论文第10节构造的<strong className="text-orange-400">首例非球面pseudo-umbilical曲面</strong>在三维空间的投影。与上面的平坦环面不同，这个曲面具有<strong>非平行的平均曲率向量</strong>——它是S²(√3/a)的一个开子集嵌入到E⁶中。论文指出 ⟨ψ,ψ⟩ = 3cos²(au/√3)/a²，证明了它不在任何超球面上（即非球面的）。</>
              : <>This is the 3D projection of the <strong className="text-orange-400">first non-spherical pseudo-umbilical surface</strong> constructed in Section 10 of Chen-Li's paper. Unlike the flat torus above, this surface has <strong>non-parallel mean curvature vector</strong>—it immerses an open subset of S²(√3/a) into E⁶. The paper shows ⟨ψ,ψ⟩ = 3cos²(au/√3)/a², proving it lies on no hypersphere (i.e., non-spherical).</>}
          </p>
          <div className="bg-slate-800 rounded-lg p-3 mb-3 overflow-x-auto">
            <MathBlock>{String.raw`\psi(u,v) = \cos^2\!\frac{au}{\sqrt{3}} \cdot \begin{pmatrix} \frac{\sqrt{3}}{a}\tan\!\frac{au}{\sqrt{3}}\cos\!\frac{av}{\sqrt{3}} \\[4pt] \frac{\sqrt{3}}{a}\tan\!\frac{au}{\sqrt{3}}\sin\!\frac{av}{\sqrt{3}} \\[4pt] \text{(振荡项 } \sin/\cos \text{ 组合)} \\[4pt] \vdots \end{pmatrix}`}</MathBlock>
            <MathBlock>{String.raw`\beta = \frac{2(a^2+6c^2)}{3},\quad \delta = \frac{2}{3}\sqrt{a^4+6a^2c^2+36c^4},\quad a=1,\; c=0.5`}</MathBlock>
          </div>
          <NonSphericalPUViz />
          <div className="mt-3 grid md:grid-cols-2 gap-3 text-sm">
            <div className="bg-slate-800 rounded p-3">
              <p className="text-orange-400 font-semibold mb-1">{isZh ? '为什么这个例子重要？' : 'Why is This Example Important?'}</p>
              <p className="text-slate-400 text-xs">
                {isZh 
                  ? '在此之前，所有已知的pseudo-umbilical曲面都是球面或球面的一部分。这个例子首次证明了非球面的pseudo-umbilical曲面确实存在——它推翻了数学家们的猜想。'
                  : 'Before this, all known pseudo-umbilical surfaces were spheres or parts of spheres. This example first proved that non-spherical pseudo-umbilical surfaces do exist—overturning mathematicians\' conjecture.'}
              </p>
            </div>
            <div className="bg-slate-800 rounded p-3">
              <p className="text-green-400 font-semibold mb-1">{isZh ? '绿色曲线' : 'Green Curve'}</p>
              <p className="text-slate-400 text-xs">
                {isZh 
                  ? <>绿色线条是曲面"赤道"(u=0)处的曲线投影。注意这个曲面不是封闭的——它是<Tooltip term="open-subset-image">S²的一个开子集的像</Tooltip>，在两极(u→±√3π/2a)处趋于无穷。</>
                  : <>The green line is the projection of the "equator" curve (u=0). Note this surface is not closed—it's the <Tooltip term="open-subset-image">image of an open subset of S²</Tooltip>, approaching infinity near the poles.</>}
              </p>
            </div>
          </div>
        </section>

        {/* Section 7.4 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 id="section-7.4" className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '7.4 与复几何的联系' : '7.4 Connection with Complex Geometry'}
          </h2>
          
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">
              🔄 {isZh ? '全纯曲线定理回顾' : 'Holomorphic Curve Theorem Review'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '曲面 M² ⊂ E⁴ = C² 满足 c#(M) = 3 当且仅当 M 是非平面全纯曲线。'
                : 'A surface M² ⊂ E⁴ = C² has c#(M) = 3 if and only if M is a non-planar holomorphic curve.'}
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-4">
            <p className="text-purple-400 font-semibold mb-2">
              🌐 {isZh ? '意义：数学的统一' : 'Significance: Unity of Mathematics'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '这个定理在微分几何和复分析之间架起了桥梁。接触数3的条件完全等价于曲面满足Cauchy-Riemann方程！这说明看似不同的数学分支其实深刻地联系在一起。'
                : 'This theorem bridges differential geometry and complex analysis. The contact number 3 condition is completely equivalent to the surface satisfying Cauchy-Riemann equations! This shows seemingly different mathematical branches are deeply connected.'}
            </p>
          </div>
        </section>

        {/* Chapter Summary */}
        <section className="bg-gradient-to-r from-green-900/50 to-cyan-900/50 rounded-xl p-6 border border-green-700">
          <h2 className="text-xl font-semibold text-green-400 mb-4">
            ✅ {isZh ? '本章小结' : 'Chapter Summary'}
          </h2>
          <ul className="text-slate-300 text-sm space-y-2">
            <li>✓ {isZh ? '余维数2时，c# ≥ 3的子流形只有三类：球面、广义螺旋面、全纯曲线' : 'In codim 2, submanifolds with c# ≥ 3 are only: spheres, generalized helicoids, holomorphic curves'}</li>
            <li>✓ {isZh ? '广义螺旋面是经典螺旋面在高维的推广' : 'Generalized helicoid is high-dimensional generalization of classical helicoid'}</li>
            <li>✓ {isZh ? 'Pseudo-umbilical：沿H方向的形状算子是恒等的倍数' : 'Pseudo-umbilical: shape operator in H direction is scalar multiple of identity'}</li>
            <li>✓ {isZh ? 'Chen-Li发现了首例非球面pseudo-umbilical曲面（在E⁶中）' : 'Chen-Li discovered first non-spherical pseudo-umbilical surfaces (in E⁶)'}</li>
            <li>✓ {isZh ? '接触数理论不仅分类已知对象，还能发现新几何对象' : 'Contact number theory not only classifies known objects but discovers new ones'}</li>
            <li>✓ {isZh ? '接触数就像几何世界的"元素周期表"——每个数对应一类独特的几何"物种"，而表上还有大量位置等待发现' : 'Contact number is like a "periodic table" for geometry—each number corresponds to a unique geometric "species", with many positions still awaiting discovery'}</li>
          </ul>
          <div className="mt-6 bg-slate-900 rounded-lg p-4">
            <p className="text-yellow-400 font-semibold mb-3">
              🤔 {isZh ? '思考题' : 'Questions to Think About'}
            </p>
            <div className="space-y-3">
              <div>
                <p className="text-slate-300 text-sm">
                  {isZh 
                    ? '1. 为什么pseudo-umbilical曲面需要至少6维空间才能是非球面的？余维数4有什么特别之处？'
                    : '1. Why do pseudo-umbilical surfaces need at least 6-dimensional space to be non-spherical? What\'s special about codimension 4?'}
                </p>
                <details className="mt-1">
                  <summary className="text-cyan-400 text-sm cursor-pointer hover:text-cyan-300">
                    {isZh ? '点击查看答案' : 'Click to see answer'}
                  </summary>
                  <p className="text-slate-400 text-xs mt-1">
                    {isZh 
                      ? '余维数小的时候，"弯曲的空间"太小，各方向的弯曲会互相干扰。需要足够多的法方向（余维数4），才能让曲面在保持pseudo-umbilical条件的同时，有足够的"自由度"偏离球面形状。'
                      : 'With small codimension, the "bending space" is too small, and bending in different directions interferes. You need enough normal directions (codimension 4) to give the surface enough "freedom" to deviate from spherical shape while maintaining the pseudo-umbilical condition.'}
                  </p>
                </details>
              </div>
              <div>
                <p className="text-slate-300 text-sm">
                  {isZh 
                    ? '2. 广义螺旋面（generalized helicoid）是怎样"螺旋"的？它和我们日常见的螺旋楼梯有什么联系和区别？'
                    : '2. How does a "generalized helicoid" spiral? What\'s its connection to and difference from a spiral staircase we see in daily life?'}
                </p>
                <details className="mt-1">
                  <summary className="text-cyan-400 text-sm cursor-pointer hover:text-cyan-300">
                    {isZh ? '点击查看答案' : 'Click to see answer'}
                  </summary>
                  <p className="text-slate-400 text-xs mt-1">
                    {isZh 
                      ? '螺旋楼梯是螺旋面的直观例子：绕中心轴旋转的同时向上延伸。广义螺旋面也有类似的"旋转+平移"结构，但它是在高维空间中实现的，而且可能有多个"旋转轴"——想象一下在4维空间里，可以同时绕两个正交平面旋转！'
                      : 'A spiral staircase is an intuitive example: rotating around a central axis while extending upward. Generalized helicoids have similar "rotation + translation" structure, but realized in higher dimensions, possibly with multiple "rotation axes"—imagine in 4D space, you can rotate around two orthogonal planes simultaneously!'}
                  </p>
                </details>
              </div>
            </div>
          </div>
        </section>

        {/* Citation */}
        <section className="bg-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-slate-400 mb-4">
            📚 {isZh ? '论文引用' : 'Paper Citation'}
          </h2>
          <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-slate-400">
            <p>Chen, B.-Y. & Li, S.-J. (2004).</p>
            <p className="text-cyan-400">The Contact Number of a Euclidean Submanifold.</p>
            <p>Proc. Edinburgh Math. Soc., 47(1), 69-100.</p>
            <p className="text-slate-500 mt-2">DOI: 10.1017/S0013091503000038</p>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between">
          <Link to="/chapter/6" className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors">
            ← {t('common.prev')}
          </Link>
          <Link to="/chapter/8" className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white transition-colors">
            {t('common.next')}: {t('chapters.ch8.title')} →
          </Link>
        </div>
      </div>
    </div>
  );
}
