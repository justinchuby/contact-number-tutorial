import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MathBlock } from '../components';
import { TorsionComparisonViz } from '../visualizations';

export default function Chapter9() {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 bg-orange-600 text-white text-xs rounded">{isZh ? '进阶' : 'Advanced'}</span>
          <p className="text-cyan-400 text-sm">{t('nav.chapter', { num: 9 })}</p>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">{t('chapters.ch9.title')}</h1>
        <p className="text-slate-400">{t('chapters.ch9.subtitle')}</p>
      </header>

      <div className="space-y-8">
        {/* Chapter Overview */}
        <section className="bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-xl p-6 border border-orange-700">
          <h2 className="text-xl font-semibold text-orange-400 mb-4">
            📋 {isZh ? '本章概览' : 'Chapter Overview'}
          </h2>
          <p className="text-slate-300 mb-4">
            {isZh 
              ? '这一章我们将探索曲面上一类特殊的曲线——曲率线，以及它们的"挠率"。秦永安与李世杰教授在2002年发现了一个优美的定理：闭曲率线的全挠率总是π的整数倍！这个看似简单的结论背后有着深刻的几何意义。'
              : 'In this chapter, we\'ll explore a special class of curves on surfaces—lines of curvature—and their "torsion". In 2002, Qin Yong-An and Prof. Li Shi-Jie discovered an elegant theorem: the total torsion of a closed line of curvature is always an integer multiple of π! This seemingly simple result has deep geometric significance.'}
          </p>
          <div className="grid md:grid-cols-3 gap-3">
            <div className="bg-slate-800 rounded-lg p-3 text-center">
              <div className="text-2xl mb-1">🌊</div>
              <p className="text-slate-300 text-sm">{isZh ? '曲率线定义' : 'Lines of Curvature'}</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-3 text-center">
              <div className="text-2xl mb-1">🎢</div>
              <p className="text-slate-300 text-sm">{isZh ? '挠率与全挠率' : 'Torsion & Total'}</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-3 text-center">
              <div className="text-2xl mb-1">⭐</div>
              <p className="text-slate-300 text-sm">{isZh ? 'Qin-Li定理' : 'Qin-Li Theorem'}</p>
            </div>
          </div>
        </section>

        {/* Prerequisites */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-slate-400 mb-4">
            📚 {isZh ? '前置知识回顾' : 'Prerequisites Review'}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-cyan-400 font-semibold mb-2">{isZh ? '主曲率（第二章）' : 'Principal Curvatures (Ch. 2)'}</h3>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? '曲面在每点有两个主曲率κ₁和κ₂，分别是最大和最小曲率方向。对应的方向称为主方向。'
                  : 'A surface has two principal curvatures κ₁ and κ₂ at each point, representing max and min curvature directions. The corresponding directions are called principal directions.'}
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-purple-400 font-semibold mb-2">{isZh ? '形状算子（第二章）' : 'Shape Operator (Ch. 2)'}</h3>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? '形状算子A是描述曲面弯曲的线性映射。主曲率是A的特征值，主方向是A的特征向量。'
                  : 'Shape operator A is a linear map describing surface bending. Principal curvatures are eigenvalues of A, principal directions are eigenvectors.'}
              </p>
            </div>
          </div>
        </section>

        {/* Interactive visualization */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            🎮 {isZh ? '交互可视化：挠率与Frenet标架' : 'Interactive: Torsion and Frenet Frame'}
          </h2>
          <p className="text-slate-400 text-sm mb-4">
            {isZh 
              ? '观察两种曲线的区别：平面曲线（挠率=0）vs 空间曲线（挠率≠0）。注意Frenet标架如何沿曲线"旋转"。'
              : 'Observe the difference between two curves: planar curve (torsion=0) vs space curve (torsion≠0). Notice how the Frenet frame "rotates" along the curve.'}
          </p>
          <TorsionComparisonViz />
        </section>

        {/* Paper info */}
        <section className="bg-gradient-to-r from-green-900/30 to-teal-900/30 rounded-xl p-6 border border-green-700">
          <h2 className="text-xl font-semibold text-green-400 mb-4">
            📄 {isZh ? '原始论文' : 'Original Paper'}
          </h2>
          <div className="bg-slate-900 rounded-lg p-4">
            <p className="text-slate-300 font-semibold">Qin, Y.-A. & Li, S.-J. (2002)</p>
            <p className="text-cyan-400">"Total Torsion of Closed Lines of Curvature"</p>
            <p className="text-slate-400 text-sm">Bulletin of the Australian Mathematical Society, 65, 73-78</p>
          </div>
        </section>

        {/* Section 9.1 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 id="section-9.1" className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '9.1 曲率线是什么？' : '9.1 What are Lines of Curvature?'}
          </h2>
          
          <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-lg p-4 border border-blue-700 mb-4">
            <p className="text-blue-400 font-semibold mb-2">
              🌊 {isZh ? '海浪类比' : 'Wave Analogy'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '想象曲面是一片起伏的海面。在每一点，有两个特殊方向：弯曲最大的方向和弯曲最小的方向。沿着这些方向画线，就得到曲率线。就像水流会沿着最陡的方向流下山坡，曲率线"顺着"或"逆着"曲面最弯曲的方向延伸。'
                : 'Imagine the surface as an undulating sea. At each point, there are two special directions: maximum bending and minimum bending. Drawing lines along these directions gives lines of curvature. Just like water flows down the steepest path on a hillside, lines of curvature extend along or against the most curved directions of the surface.'}
            </p>
          </div>

          {/* Step by step explanation */}
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">
              🔢 {isZh ? '分步理解' : 'Step by Step'}
            </p>
            <div className="space-y-3 text-slate-300 text-sm">
              <div className="flex items-start gap-3">
                <span className="bg-cyan-600 text-white px-2 py-0.5 rounded text-xs">1</span>
                <p>{isZh ? '曲面在每一点有无穷多个切线方向' : 'At each point, the surface has infinitely many tangent directions'}</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-cyan-600 text-white px-2 py-0.5 rounded text-xs">2</span>
                <p>{isZh ? '沿不同方向，曲面的弯曲程度不同（用法曲率衡量）' : 'Along different directions, the surface bends differently (measured by normal curvature)'}</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-cyan-600 text-white px-2 py-0.5 rounded text-xs">3</span>
                <p>{isZh ? '弯曲最大和最小的方向叫做主方向，对应的曲率叫主曲率κ₁, κ₂' : 'Directions of max/min bending are called principal directions, with principal curvatures κ₁, κ₂'}</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-cyan-600 text-white px-2 py-0.5 rounded text-xs">4</span>
                <p>{isZh ? '沿主方向连成的曲线就是曲率线' : 'Curves following principal directions are lines of curvature'}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">
              📝 {isZh ? '数学定义' : 'Mathematical Definition'}
            </p>
            <p className="text-slate-300 text-sm mb-2">
              {isZh 
                ? '曲率线是曲面上处处与主曲率方向相切的曲线。在每一点，形状算子的特征向量给出主曲率方向。'
                : 'Lines of curvature are curves on a surface that are everywhere tangent to principal curvature directions. At each point, eigenvectors of the shape operator give principal directions.'}
            </p>
            <MathBlock>{'A_{\\xi}(\\gamma\'(t)) = \\kappa_i(t) \\cdot \\gamma\'(t)'}</MathBlock>
            <p className="text-slate-400 text-sm mt-2">
              {isZh ? 'Rodrigues公式描述了法向量沿曲率线的变化：' : 'Rodrigues formula describes how the normal changes along a line of curvature:'} 
            </p>
            <MathBlock>{'dn = -\\kappa \\cdot dr'}</MathBlock>
          </div>

          {/* Important property */}
          <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-4 border border-yellow-700 mb-4">
            <p className="text-yellow-400 font-semibold mb-2">
              💡 {isZh ? '重要性质' : 'Important Property'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '两个主方向总是互相垂直的！这意味着曲面上的曲率线形成一个正交网格（除了在脐点处，那里κ₁=κ₂，所有方向都是主方向）。'
                : 'The two principal directions are always perpendicular! This means lines of curvature form an orthogonal grid on the surface (except at umbilical points where κ₁=κ₂, and all directions are principal).'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-cyan-400 font-semibold mb-2">
                🌍 {isZh ? '例：椭球面' : 'Example: Ellipsoid'}
              </h3>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? '椭球面的曲率线是经线和纬线（类似地球的经纬网）。两极是脐点。'
                  : 'Lines of curvature on an ellipsoid are meridians and parallels (like Earth\'s lat-long grid). The poles are umbilical points.'}
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-purple-400 font-semibold mb-2">
                🍩 {isZh ? '例：环面' : 'Example: Torus'}
              </h3>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? '环面的曲率线是两组圆：绕大圆的圈和绕小圆的圈。没有脐点。'
                  : 'Lines of curvature on a torus are two families of circles: around the big circle and around the tube. No umbilical points.'}
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-green-400 font-semibold mb-2">
                ⚽ {isZh ? '例：球面' : 'Example: Sphere'}
              </h3>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? '球面的每一点都是脐点！任何方向都是主方向，所以球面上的任何曲线都是曲率线。'
                  : 'Every point on a sphere is umbilical! Any direction is principal, so every curve on a sphere is a line of curvature.'}
              </p>
            </div>
          </div>
        </section>

        {/* Section 9.2 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 id="section-9.2" className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '9.2 什么是挠率？' : '9.2 What is Torsion?'}
          </h2>
          
          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-4 border border-purple-700 mb-4">
            <p className="text-purple-400 font-semibold mb-2">
              🎢 {isZh ? '过山车类比' : 'Roller Coaster Analogy'}
            </p>
            <p className="text-slate-300 text-sm mb-2">
              {isZh 
                ? '坐过山车时，轨道不仅会左右转弯（曲率），还会让你"翻滚"——这种翻滚感就是挠率！挠率测量曲线离开其密切平面的速度。'
                : 'On a roller coaster, the track not only turns left-right (curvature), but also makes you "roll"—this rolling sensation is torsion! Torsion measures how fast a curve leaves its osculating plane.'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '更具体地说：曲率衡量曲线如何在一个平面内弯曲，而挠率衡量曲线如何偏离这个平面向第三个维度扭曲。正的挠率是"向左扭"，负的挠率是"向右扭"。全挠率就是沿着整条闭合曲线把所有的向左扭和向右扭都加起来的结果。'
                : 'More precisely: curvature measures bending within a plane, while torsion measures twisting away from that plane into the third dimension. Positive torsion is "twisting left", negative is "twisting right". Total torsion sums up all the left-twists and right-twists along the entire closed curve.'}
            </p>
          </div>

          {/* Frenet frame introduction */}
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">
              🎯 {isZh ? 'Frenet标架：随曲线移动的坐标系' : 'Frenet Frame: A Moving Coordinate System'}
            </p>
            <p className="text-slate-300 text-sm mb-3">
              {isZh 
                ? '为了描述空间曲线的几何，我们在曲线的每一点建立一个坐标系（称为Frenet标架），由三个正交向量组成：'
                : 'To describe the geometry of a space curve, we set up a coordinate system (called the Frenet frame) at each point, consisting of three orthogonal vectors:'}
            </p>
            <div className="grid md:grid-cols-3 gap-3">
              <div className="bg-slate-700 rounded-lg p-3">
                <p className="text-cyan-400 font-semibold mb-1">T = γ&apos;</p>
                <p className="text-slate-300 text-xs">
                  {isZh ? '切向量：曲线前进的方向' : 'Tangent: direction of travel'}
                </p>
              </div>
              <div className="bg-slate-700 rounded-lg p-3">
                <p className="text-green-400 font-semibold mb-1">N = T&apos;/|T&apos;|</p>
                <p className="text-slate-300 text-xs">
                  {isZh ? '主法向：曲线转弯的方向' : 'Normal: direction of turning'}
                </p>
              </div>
              <div className="bg-slate-700 rounded-lg p-3">
                <p className="text-purple-400 font-semibold mb-1">B = T × N</p>
                <p className="text-slate-300 text-xs">
                  {isZh ? '副法向：垂直于T和N' : 'Binormal: perpendicular to T, N'}
                </p>
              </div>
            </div>
          </div>

          {/* Curvature vs Torsion */}
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">
              ⚖️ {isZh ? '曲率 vs 挠率' : 'Curvature vs Torsion'}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-700 rounded-lg p-3">
                <p className="text-yellow-400 font-semibold mb-2">{isZh ? '曲率 κ' : 'Curvature κ'}</p>
                <MathBlock>{'\\kappa = |T\'| = |\\gamma\'\'|'}</MathBlock>
                <p className="text-slate-300 text-sm mt-2">
                  {isZh ? '测量曲线"转弯"的剧烈程度' : 'Measures how sharply the curve turns'}
                </p>
                <p className="text-slate-400 text-xs mt-1">
                  {isZh ? '圆的曲率 = 1/半径' : 'Circle curvature = 1/radius'}
                </p>
              </div>
              <div className="bg-slate-700 rounded-lg p-3">
                <p className="text-purple-400 font-semibold mb-2">{isZh ? '挠率 τ' : 'Torsion τ'}</p>
                <MathBlock>{'\\tau = -N\' \\cdot B'}</MathBlock>
                <p className="text-slate-300 text-sm mt-2">
                  {isZh ? '测量曲线"扭曲"的剧烈程度' : 'Measures how fast the curve twists'}
                </p>
                <p className="text-slate-400 text-xs mt-1">
                  {isZh ? '螺旋线有恒定挠率' : 'Helix has constant torsion'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">
              📐 {isZh ? '挠率公式' : 'Torsion Formula'}
            </p>
            <MathBlock>{'\\tau = \\frac{(\\gamma\' \\times \\gamma\'\') \\cdot \\gamma\'\'\'}{|\\gamma\' \\times \\gamma\'\'|^2}'}</MathBlock>
            <ul className="text-slate-300 text-sm mt-3 space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-slate-400">τ = 0</span>
                <span>→</span>
                <span>{isZh ? '曲线完全在平面内（平面曲线）' : 'Curve lies entirely in a plane (planar curve)'}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">τ &gt; 0</span>
                <span>→</span>
                <span>{isZh ? '向右手方向"螺旋上升"' : 'Spirals in right-hand direction'}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-400">τ &lt; 0</span>
                <span>→</span>
                <span>{isZh ? '向左手方向"螺旋上升"' : 'Spirals in left-hand direction'}</span>
              </li>
            </ul>
          </div>

          {/* Total torsion */}
          <div className="bg-gradient-to-r from-green-900/30 to-teal-900/30 rounded-lg p-4 border border-green-700">
            <p className="text-green-400 font-semibold mb-2">
              🔢 {isZh ? '全挠率：累积的扭曲' : 'Total Torsion: Accumulated Twist'}
            </p>
            <MathBlock>{'T = \\oint_C \\tau \\, ds'}</MathBlock>
            <p className="text-slate-300 text-sm mt-3">
              {isZh 
                ? '想象你沿着闭曲线走一圈。全挠率测量你"总共翻滚了多少角度"。如果你回到起点时方向和出发时一样，全挠率可能是0；如果你翻了一圈回来，全挠率是2π。'
                : 'Imagine walking along a closed curve. Total torsion measures "how much total rolling" you\'ve done. If you return to the start in the same orientation, total torsion might be 0; if you\'ve rolled one full turn, total torsion is 2π.'}
            </p>
            <p className="text-yellow-400 text-sm mt-2">
              💡 {isZh ? 'Qin-Li定理将告诉我们：对曲率线来说，这个值总是π的整数倍！' : 'Qin-Li theorem will tell us: for lines of curvature, this is always an integer multiple of π!'}
            </p>
          </div>
        </section>

        {/* Section 9.3 - Main Theorem */}
        <section className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-xl p-6 border-2 border-yellow-600">
          <h2 id="section-9.3" className="text-xl font-semibold text-yellow-400 mb-4">
            ⭐ {isZh ? '9.3 Qin-Li 全挠率定理' : '9.3 Qin-Li Total Torsion Theorem'}
          </h2>
          
          {/* Theorem 1 */}
          <div className="bg-slate-900 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">
              📜 {isZh ? '定理1 (Qin-Li 2002)' : 'Theorem 1 (Qin-Li 2002)'}
            </p>
            <p className="text-slate-300 mb-3">
              {isZh 
                ? '设 C 是 E³ 中曲面上的闭曲率线。则 C 的全挠率是 π 的整数倍：'
                : 'Let C be a closed line of curvature on a surface in E³. Then the total torsion of C is an integer multiple of π:'}
            </p>
            <MathBlock>{'T = \\oint_C \\tau \\, ds = k\\pi, \\quad k \\in \\mathbb{Z}'}</MathBlock>
          </div>

          {/* Why π multiples */}
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-purple-400 font-semibold mb-2">
              🤔 {isZh ? '为什么是π的倍数？直观理解' : 'Why Multiples of π? Intuition'}
            </p>
            <p className="text-slate-300 text-sm mb-3">
              {isZh 
                ? '这是一个深刻的拓扑约束！想象你沿曲率线绕一圈：'
                : 'This is a deep topological constraint! Imagine walking along a line of curvature for one full loop:'}
            </p>
            <ul className="text-slate-300 text-sm space-y-2">
              <li>• {isZh ? '曲率线是"主方向"曲线，法向量沿它变化有特殊规律' : 'Lines of curvature follow principal directions, so the normal changes in a special way'}</li>
              <li>• {isZh ? '当你回到起点，曲面的法向量也回到原来方向' : 'When you return to the start, the surface normal also returns to its original direction'}</li>
              <li>• {isZh ? '但Frenet标架的副法向可能"翻转"了若干次' : 'But the binormal of the Frenet frame might have "flipped" several times'}</li>
              <li>• {isZh ? '每次翻转贡献±π的挠率，所以总和是π的整数倍' : 'Each flip contributes ±π to torsion, so the total is an integer multiple of π'}</li>
            </ul>
          </div>

          {/* Theorem 2 */}
          <div className="bg-slate-900 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">
              📜 {isZh ? '定理2 (Qin-Li 2002)' : 'Theorem 2 (Qin-Li 2002)'}
            </p>
            <p className="text-slate-300 mb-3">
              {isZh 
                ? '设 C 是卵形面(ovaloid)上的闭曲率线。则：'
                : 'Let C be a closed line of curvature on an ovaloid. Then:'}
            </p>
            <MathBlock>{'T = 0'}</MathBlock>
            <p className="text-yellow-400 text-sm mt-3">
              💡 {isZh ? '更强的结论！在卵形面上，不仅是π的倍数，而且恰好是0。' : 'Stronger result! On ovaloids, not just multiples of π, but exactly 0.'}
            </p>
          </div>

          {/* Ovaloid explanation */}
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-green-400 font-semibold mb-2">
              🥚 {isZh ? '什么是卵形面？' : 'What is an Ovaloid?'}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-slate-300 text-sm mb-2">
                  {isZh 
                    ? '卵形面是Gauss曲率处处为正的紧致凸曲面：'
                    : 'An ovaloid is a compact convex surface with positive Gaussian curvature everywhere:'}
                </p>
                <ul className="text-slate-300 text-sm space-y-1">
                  <li>• {isZh ? '紧致：有限大，没有边界' : 'Compact: finite size, no boundary'}</li>
                  <li>• {isZh ? '凸：没有"凹陷"' : 'Convex: no "indentations"'}</li>
                  <li>• {isZh ? 'K > 0：处处像"山顶"，不像"马鞍"' : 'K > 0: everywhere like a "hilltop", not a "saddle"'}</li>
                </ul>
              </div>
              <div className="bg-slate-700 rounded-lg p-3">
                <p className="text-cyan-400 font-semibold mb-1">{isZh ? '例子' : 'Examples'}</p>
                <ul className="text-slate-300 text-sm space-y-1">
                  <li>✓ {isZh ? '球面（最对称）' : 'Sphere (most symmetric)'}</li>
                  <li>✓ {isZh ? '椭球面' : 'Ellipsoid'}</li>
                  <li>✓ {isZh ? '鸡蛋表面' : 'Egg surface'}</li>
                  <li>✗ {isZh ? '环面（有K<0区域）' : 'Torus (has K<0 regions)'}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Why T=0 on ovaloids */}
          <div className="bg-slate-800 rounded-lg p-4">
            <p className="text-orange-400 font-semibold mb-2">
              🎯 {isZh ? '为什么卵形面上全挠率为0？' : 'Why is Total Torsion Zero on Ovaloids?'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '卵形面的凸性带来额外约束。直观地说：卵形面像一个"鼓起来的气球"，处处正曲率（局部性质），却迫使任何闭合曲率线上所有的向左扭和向右扭必须不多不少恰好完全抵消（全局性质）。这是局部性质（每一点的正曲率）如何对全局行为（整条曲线的总扭曲）施加严格限制的一个深刻例子。'
                : 'Ovaloid convexity provides extra constraints. Intuitively: an ovaloid is like an "inflated balloon" with positive curvature everywhere (local property), yet this forces all left-twists and right-twists of any closed curvature line to cancel out exactly (global property). This is a profound example of how local properties (positive curvature at each point) impose strict limits on global behavior (total twist of an entire curve).'}
            </p>
          </div>
        </section>

        {/* Section 9.4 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 id="section-9.4" className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '9.4 历史背景与意义' : '9.4 Historical Background & Significance'}
          </h2>
          
          <div className="space-y-4">
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-purple-400 font-semibold mb-2">
                {isZh ? 'Geppert定理 (1930s)' : 'Geppert Theorem (1930s)'}
              </h3>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? 'Geppert证明：球面上任何闭曲线的全挠率为零。Qin-Li将此结果推广到一般卵形面。'
                  : 'Geppert proved: total torsion of any closed curve on a sphere is zero. Qin-Li generalized this to general ovaloids.'}
              </p>
            </div>
            
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-orange-400 font-semibold mb-2">
                {isZh ? 'Blaschke的16个问题' : 'Blaschke\'s 16 Problems'}
              </h3>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? '著名几何学家Blaschke提出了关于卵形面曲率线的16个问题。Qin-Li的工作回应了其中一个问题。'
                  : 'The famous geometer Blaschke posed 16 problems about lines of curvature on ovaloids. Qin-Li\'s work addresses one of these problems.'}
              </p>
            </div>
          </div>
        </section>

        {/* Section 9.5 - Later developments */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 id="section-9.5" className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '9.5 后续发展' : '9.5 Later Developments'}
          </h2>
          
          <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-lg p-4 border border-blue-700">
            <p className="text-blue-400 font-semibold mb-2">
              📚 Raffaelli (2023)
            </p>
            <p className="text-slate-300 text-sm mb-2">
              {isZh 
                ? 'Matteo Raffaelli在2023年将Qin-Li的结果推广到更一般的情形，研究了三维曲率线的全挠率。'
                : 'Matteo Raffaelli in 2023 generalized Qin-Li\'s result to more general settings, studying total torsion of three-dimensional lines of curvature.'}
            </p>
            <p className="text-slate-400 text-sm italic">
              "Total torsion of three-dimensional lines of curvature"
            </p>
            <p className="text-slate-500 text-sm">
              Geometriae Dedicata, 217, Article 96 (arXiv:2308.12684)
            </p>
          </div>
        </section>

        {/* Connection to Contact Number */}
        <section className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-xl p-6 border border-red-700">
          <h2 className="text-xl font-semibold text-red-400 mb-4">
            🔗 {isZh ? '与接触数的联系' : 'Connection to Contact Number'}
          </h2>
          <p className="text-slate-300">
            {isZh 
              ? '曲率线和测地线是曲面上两类重要的曲线。全脐曲面（接触数∞）的所有曲线既是测地线又是曲率线。Qin-Li对曲率线全挠率的研究，与李世杰教授在接触数理论中对测地线和法截线关系的研究，都属于曲面几何的核心问题。'
              : 'Lines of curvature and geodesics are two important types of curves on surfaces. On totally umbilical surfaces (contact number ∞), all curves are both geodesics and lines of curvature. Qin-Li\'s study of total torsion of lines of curvature, like Prof. Li\'s study of geodesic-normal section relations in contact number theory, are both core problems in surface geometry.'}
          </p>
        </section>

        {/* Chapter Summary */}
        <section className="bg-gradient-to-r from-green-900/50 to-cyan-900/50 rounded-xl p-6 border border-green-700">
          <h2 className="text-xl font-semibold text-green-400 mb-4">
            ✅ {isZh ? '本章小结' : 'Chapter Summary'}
          </h2>
          <ul className="text-slate-300 text-sm space-y-2">
            <li>✓ {isZh ? '曲率线是沿主曲率方向的曲线，两族曲率线正交' : 'Lines of curvature follow principal directions; two families are orthogonal'}</li>
            <li>✓ {isZh ? '挠率τ测量曲线"扭曲"程度，全挠率是沿闭曲线的积分' : 'Torsion τ measures curve "twisting"; total torsion is the integral along a closed curve'}</li>
            <li>✓ {isZh ? 'Qin-Li定理1：闭曲率线的全挠率 = kπ（整数倍）' : 'Qin-Li Theorem 1: total torsion of closed line of curvature = kπ (integer multiple)'}</li>
            <li>✓ {isZh ? 'Qin-Li定理2：卵形面上闭曲率线的全挠率 = 0' : 'Qin-Li Theorem 2: total torsion on ovaloids = 0'}</li>
            <li>✓ {isZh ? '这项工作推广了Geppert定理，回应了Blaschke的经典问题' : 'This work generalizes Geppert\'s theorem and addresses Blaschke\'s classical problem'}</li>
          </ul>

          {/* Thinking Questions */}
          <div className="mt-6 bg-slate-900 rounded-lg p-4">
            <p className="text-yellow-400 font-semibold mb-3">
              🤔 {isZh ? '思考题' : 'Questions to Think About'}
            </p>
            <div className="space-y-3">
              <div>
                <p className="text-slate-300 text-sm">
                  {isZh 
                    ? '1. 为什么全挠率一定是π的整数倍？这个"整数"从何而来？'
                    : '1. Why must total torsion be an integer multiple of π? Where does this "integer" come from?'}
                </p>
                <details className="mt-1">
                  <summary className="text-cyan-400 text-sm cursor-pointer hover:text-cyan-300">
                    {isZh ? '点击查看答案' : 'Click to see answer'}
                  </summary>
                  <p className="text-slate-400 text-xs mt-1">
                    {isZh 
                      ? '这是拓扑学的魔力！当曲线绕回原点时，它的切线（和随之旋转的标架）必须"对齐"回来。这种"必须对齐"的约束导致旋转角度只能是某些离散值——就像你转一圈后手腕必须回到原位。'
                      : 'This is the magic of topology! When a curve returns to its starting point, its tangent (and accompanying frame) must "align" back. This "must align" constraint forces rotation angles to be discrete values—like your wrist must return to original position after a full turn.'}
                  </p>
                </details>
              </div>
              <div>
                <p className="text-slate-300 text-sm">
                  {isZh 
                    ? '2. 卵形面上的闭曲率线全挠率为0，而一般曲面上可以是kπ。什么几何性质导致了这个差异？'
                    : '2. Closed lines of curvature on ovaloids have zero total torsion, while general surfaces have kπ. What geometric property causes this difference?'}
                </p>
                <details className="mt-1">
                  <summary className="text-cyan-400 text-sm cursor-pointer hover:text-cyan-300">
                    {isZh ? '点击查看答案' : 'Click to see answer'}
                  </summary>
                  <p className="text-slate-400 text-xs mt-1">
                    {isZh 
                      ? '卵形面处处有正曲率（像鸡蛋），这意味着它是"凸"的。凸性限制了曲率线的"扭曲"方式——曲率线不能绕得太复杂。在更一般的曲面上（如马鞍面附近），曲率有正有负，允许曲率线有更复杂的扭曲行为。'
                      : 'Ovaloids have positive curvature everywhere (like an egg), meaning they\'re "convex". Convexity constrains how lines of curvature can "twist"—they can\'t wind too complexly. On general surfaces (like near saddle points), curvature varies sign, allowing more complex twisting behavior.'}
                  </p>
                </details>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between">
          <Link to="/chapter/8" className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors">
            ← {t('common.prev')}
          </Link>
          <Link to="/chapter/10" className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white transition-colors">
            {t('common.next')}: {t('chapters.ch10.title')} →
          </Link>
        </div>
      </div>
    </div>
  );
}
