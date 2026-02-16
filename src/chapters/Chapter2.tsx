import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MathBlock, Math } from '../components';
import { TangentNormalVizWithLabels, EmbeddingVizWithLabels, SecondFundamentalFormVizWithLabels } from '../visualizations';

export default function Chapter2() {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <p className="text-cyan-400 text-sm mb-2">{t('nav.chapter', { num: 2 })}</p>
        <h1 className="text-3xl font-bold text-white mb-2">{t('chapters.ch2.title')}</h1>
        <p className="text-slate-400">{t('chapters.ch2.subtitle')}</p>
      </header>

      <div className="space-y-8">
        {/* Section 2.1 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 id="section-2.1" className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '2.1 切空间与法空间' : '2.1 Tangent and Normal Spaces'}
          </h2>

          {/* Intuitive introduction */}
          <p className="text-slate-300 mb-4">
            {isZh 
              ? '要研究曲面（或更一般的流形）的几何，第一步是理解在每个点上，空间可以被分解为两个正交的部分：切空间和法空间。'
              : 'To study the geometry of a surface (or more generally, a manifold), the first step is understanding that at each point, space can be decomposed into two orthogonal parts: tangent space and normal space.'}
          </p>

          {/* Intuitive analogy */}
          <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 rounded-lg p-4 border border-green-700 mb-4">
            <p className="text-green-400 font-semibold mb-2">
              🏔️ {isZh ? '爬山类比' : 'Mountain Climbing Analogy'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '想象你站在山坡上。切空间就是你脚下的"坡面"——所有你可以沿着山坡走的方向。法空间就是"垂直于坡面"的方向——你需要用绳索才能去的方向（比如悬崖下方）。'
                : 'Imagine standing on a mountainside. The tangent space is the "slope" under your feet—all directions you can walk along the mountain. The normal space is "perpendicular to the slope"—directions you need a rope to go (like down a cliff).'}
            </p>
          </div>

          {/* Tangent space definition */}
          <div className="bg-slate-800 rounded-lg p-4 border-l-4 border-cyan-500 mb-4">
            <h3 className="text-cyan-400 font-semibold mb-2">
              {isZh ? '切空间' : 'Tangent Space'} <Math>{'T_pM'}</Math>
            </h3>
            <p className="text-slate-300 text-sm mb-2">
              {isZh 
                ? '在曲面M上的点p处，所有"沿着曲面方向"的向量构成一个向量空间，称为切空间。直观地说，如果你站在点p，切空间就是你脚下那个无穷小的"平面"。'
                : 'At a point p on surface M, all vectors pointing "along the surface" form a vector space called the tangent space. Intuitively, if you stand at p, the tangent space is the infinitesimally small "plane" under your feet.'}
            </p>
            <MathBlock>{'\\dim(T_pM) = n \\quad \\text{(' + (isZh ? 'n = 流形M的维数' : 'n = dimension of manifold M') + ')}'}</MathBlock>
          </div>
          
          {/* Normal space definition */}
          <div className="bg-slate-800 rounded-lg p-4 border-l-4 border-pink-500 mb-4">
            <h3 className="text-pink-400 font-semibold mb-2">
              {isZh ? '法空间' : 'Normal Space'} <Math>{'T_p^\\perp M'}</Math>
            </h3>
            <p className="text-slate-300 text-sm mb-2">
              {isZh 
                ? '在点p处，所有与切空间正交（垂直）的向量构成法空间。法空间的维数取决于外部空间的维数。'
                : 'At point p, all vectors orthogonal (perpendicular) to the tangent space form the normal space. Its dimension depends on the ambient space.'}
            </p>
            <MathBlock>{'\\dim(T_p^\\perp M) = m - n \\quad \\text{(' + (isZh ? 'm = 外部空间的维数' : 'm = dimension of ambient space') + ')}'}</MathBlock>
          </div>

          {/* Concrete examples */}
          <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-4 border border-yellow-700 mb-4">
            <h3 className="text-yellow-400 font-semibold mb-3">
              📐 {isZh ? '具体例子' : 'Concrete Examples'}
            </h3>
            <div className="space-y-4 text-sm">
              {/* Sphere */}
              <div className="bg-slate-900 rounded-lg p-3">
                <p className="text-cyan-400 font-semibold mb-1">
                  {isZh ? '① 球面 S² ⊂ ℝ³' : '① Sphere S² ⊂ ℝ³'}
                </p>
                <p className="text-slate-300 mb-1">
                  {isZh 
                    ? '在北极点 p = (0, 0, 1)：'
                    : 'At the north pole p = (0, 0, 1):'}
                </p>
                <ul className="text-slate-400 space-y-1 ml-4">
                  <li>• <span className="text-cyan-400">{isZh ? '切空间' : 'Tangent'}</span> = x-y {isZh ? '平面（2维）——可以向东西南北走' : 'plane (2D)—can walk east, west, north, south'}</li>
                  <li>• <span className="text-pink-400">{isZh ? '法空间' : 'Normal'}</span> = z {isZh ? '轴方向（1维）——只有"天"和"地"' : 'axis direction (1D)—only "up" and "down"'}</li>
                </ul>
              </div>
              
              {/* Cylinder */}
              <div className="bg-slate-900 rounded-lg p-3">
                <p className="text-cyan-400 font-semibold mb-1">
                  {isZh ? '② 圆柱面 ⊂ ℝ³' : '② Cylinder ⊂ ℝ³'}
                </p>
                <p className="text-slate-300 mb-1">
                  {isZh 
                    ? '在点 p = (1, 0, 0)：'
                    : 'At point p = (1, 0, 0):'}
                </p>
                <ul className="text-slate-400 space-y-1 ml-4">
                  <li>• <span className="text-cyan-400">{isZh ? '切空间' : 'Tangent'}</span> = {isZh ? 'y-z 平面（2维）——可以绕圆柱走、可以沿轴走' : 'y-z plane (2D)—can walk around or along axis'}</li>
                  <li>• <span className="text-pink-400">{isZh ? '法空间' : 'Normal'}</span> = x {isZh ? '轴方向（1维）——指向圆柱外' : 'axis direction (1D)—points outward from cylinder'}</li>
                </ul>
              </div>

              {/* Torus */}
              <div className="bg-slate-900 rounded-lg p-3">
                <p className="text-cyan-400 font-semibold mb-1">
                  {isZh ? '③ 环面 T² ⊂ ℝ³' : '③ Torus T² ⊂ ℝ³'}
                </p>
                <p className="text-slate-300 mb-1">
                  {isZh 
                    ? '环面像一个甜甜圈。在每个点上：'
                    : 'A torus is shaped like a donut. At each point:'}
                </p>
                <ul className="text-slate-400 space-y-1 ml-4">
                  <li>• <span className="text-cyan-400">{isZh ? '切空间' : 'Tangent'}</span> = {isZh ? '2维——可以"绕大圈"走或"绕小圈"走' : '2D—can walk "around the big circle" or "around the small circle"'}</li>
                  <li>• <span className="text-pink-400">{isZh ? '法空间' : 'Normal'}</span> = {isZh ? '1维——垂直于甜甜圈表面的方向' : '1D—direction perpendicular to the donut surface'}</li>
                </ul>
              </div>

              {/* Higher dimension hint */}
              <div className="bg-slate-900 rounded-lg p-3 border border-slate-600">
                <p className="text-purple-400 font-semibold mb-1">
                  {isZh ? '④ 高维的情况' : '④ Higher Dimensions'}
                </p>
                <p className="text-slate-400">
                  {isZh 
                    ? '以上例子法空间都是1维的（曲面在3D空间中）。但如果曲面放在更高维的空间中，法空间可以是多维的！例如 S² ⊂ ℝ⁶，法空间是4维的。后面的"余维数"概念会精确描述这个维数。'
                    : 'In the above examples, normal space is 1D (surface in 3D). But if a surface sits in higher-dimensional space, normal space can be multi-dimensional! E.g., S² ⊂ ℝ⁶ has 4D normal space. The "codimension" concept later will describe this precisely.'}
                </p>
              </div>
            </div>
          </div>

          {/* Key insight */}
          <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-lg p-3 border border-cyan-700">
            <p className="text-cyan-300 text-sm">
              💡 {isZh 
                ? '关键观察：切空间和法空间随着点p的移动而变化！它们在每个点上的"朝向"不同，反映了曲面的弯曲。下面的动画展示了这一点。'
                : 'Key observation: Tangent and normal spaces change as point p moves! Their "orientation" differs at each point, reflecting the curvature of the surface. The animation below shows this.'}
            </p>
          </div>
        </section>


        {/* Interactive: Tangent and Normal visualization - after concepts introduced */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            🎮 {isZh ? '交互可视化：切空间与法空间' : 'Interactive: Tangent and Normal Spaces'}
          </h2>
          <TangentNormalVizWithLabels />
          <p className="text-slate-400 text-sm mt-4">
            {isZh 
              ? '拖动旋转查看不同角度。切换不同曲面，观察切平面和法向量如何随点的位置变化。' 
              : 'Drag to rotate. Switch between surfaces and observe how the tangent plane and normal vector change with point position.'}
          </p>
        </section>


        {/* Section 2.2 */}

        {/* Section 2.2 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 id="section-2.2" className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '2.2 嵌入与浸入' : '2.2 Embeddings and Immersions'}
          </h2>

          <p className="text-slate-300 mb-4">
            {isZh 
              ? '子流形是"住在"另一个流形里的流形。我们需要精确定义这种"住在"的含义。'
              : 'A submanifold is a manifold that "lives inside" another manifold. We need to precisely define what "lives inside" means.'}
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-slate-800 rounded-lg p-4 border-l-4 border-green-500">
              <h3 className="text-green-400 font-semibold mb-2">
                {isZh ? '嵌入 (Embedding)' : 'Embedding'}
              </h3>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? '光滑、单射、且保持拓扑结构。'
                  : 'Smooth, injective, and preserves topological structure.'}
              </p>
              <p className="text-slate-400 text-xs mt-2">
                🎯 {isZh ? '例：把橡皮筋放在桌上（不交叉）' : 'Example: rubber band on table (no crossing)'}
              </p>
            </div>
            
            <div className="bg-slate-800 rounded-lg p-4 border-l-4 border-yellow-500">
              <h3 className="text-yellow-400 font-semibold mb-2">
                {isZh ? '浸入 (Immersion)' : 'Immersion'}
              </h3>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? '局部光滑，但可能有自交。'
                  : 'Locally smooth, but may have self-intersections.'}
              </p>
              <p className="text-slate-400 text-xs mt-2">
                🎯 {isZh ? '例：8字形（有交叉点）' : 'Example: figure-8 (has crossing point)'}
              </p>
            </div>
          </div>

          {/* Intuitive analogy */}
          <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-4 border border-yellow-700 mb-4">
            <p className="text-yellow-400 font-semibold mb-2">
              🧵 {isZh ? '绳子类比' : 'String Analogy'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '想象把一根绳子放在桌面上。如果绳子没有打结、没有交叉，这就是"嵌入"。如果绳子像8字形那样交叉了，这就是"浸入"——局部看起来没问题，但整体上有交叉。'
                : 'Imagine placing a string on a table. If the string has no knots and no crossings, this is an "embedding". If the string crosses itself like a figure-8, this is an "immersion"—locally it looks fine, but globally there are crossings.'}
            </p>
          </div>

          {/* Embedding visualization */}
          <div className="mb-4">
            <EmbeddingVizWithLabels />
          </div>

          {/* More vivid examples */}
          <div className="bg-slate-800 rounded-lg p-4">
            <p className="text-cyan-400 font-semibold mb-2">
              🌟 {isZh ? '更多生动例子' : 'More Vivid Examples'}
            </p>
            <ul className="text-slate-300 text-sm space-y-2">
              <li>• <span className="text-green-400">{isZh ? '嵌入' : 'Embedding'}</span>: {isZh ? '戒指戴在手指上、水管的形状、耳机线（不打结时）' : 'Ring on finger, shape of a water pipe, earphone cord (when not tangled)'}</li>
              <li>• <span className="text-yellow-400">{isZh ? '浸入' : 'Immersion'}</span>: {isZh ? '打结的耳机线、交叉的铁路轨道、Klein瓶在3D中的表示' : 'Tangled earphone cord, crossing railway tracks, Klein bottle representation in 3D'}</li>
            </ul>
          </div>

          {/* Embedding vs Immersion Deep Dive */}
          <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-lg p-4 border border-blue-700 mb-4 mt-6">
            <p className="text-blue-400 font-semibold mb-3">
              🔬 {isZh ? '深入理解：嵌入与浸入的关系' : 'Deep Dive: Relationship Between Embedding and Immersion'}
            </p>
            
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-cyan-400 font-semibold mb-1">{isZh ? '关键关系：嵌入 ⊂ 浸入' : 'Key Relationship: Embedding ⊂ Immersion'}</p>
                <p className="text-slate-300">
                  {isZh 
                    ? '每个嵌入都是浸入，但反过来不一定成立。嵌入是"更强"的条件——不仅局部要一对一，全局也要一对一（不允许自交）。'
                    : 'Every embedding is an immersion, but not vice versa. Embedding is a "stronger" condition—not only locally one-to-one, but globally one-to-one (no self-intersection allowed).'}
                </p>
              </div>

              <div>
                <p className="text-cyan-400 font-semibold mb-1">{isZh ? 'Whitney 定理' : 'Whitney Theorem'}</p>
                <p className="text-slate-300 mb-2">
                  {isZh 
                    ? '著名的 Whitney 定理告诉我们需要多少维空间：'
                    : 'The famous Whitney theorem tells us how many dimensions we need:'}
                </p>
                <ul className="text-slate-400 space-y-1 ml-4">
                  <li>• {isZh ? '任何 n 维流形都可以浸入 ℝ^{2n-1}' : 'Any n-dimensional manifold can be immersed in ℝ^{2n-1}'}</li>
                  <li>• {isZh ? '任何 n 维流形都可以嵌入 ℝ^{2n}' : 'Any n-dimensional manifold can be embedded in ℝ^{2n}'}</li>
                </ul>
              </div>

              <div className="bg-slate-800 rounded p-3">
                <p className="text-yellow-400 font-semibold mb-2">{isZh ? '经典例子' : 'Classic Examples'}</p>
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-slate-400">
                      <th className="text-left py-1">{isZh ? '流形' : 'Manifold'}</th>
                      <th className="text-left py-1">dim</th>
                      <th className="text-left py-1">{isZh ? '最小浸入' : 'Min Immersion'}</th>
                      <th className="text-left py-1">{isZh ? '最小嵌入' : 'Min Embedding'}</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    <tr>
                      <td className="py-1">{isZh ? '圆 S¹' : 'Circle S¹'}</td>
                      <td>1</td>
                      <td>ℝ²</td>
                      <td>ℝ²</td>
                    </tr>
                    <tr>
                      <td className="py-1">{isZh ? '球面 S²' : 'Sphere S²'}</td>
                      <td>2</td>
                      <td>ℝ³</td>
                      <td>ℝ³</td>
                    </tr>
                    <tr>
                      <td className="py-1">Klein{isZh ? '瓶' : ' bottle'}</td>
                      <td>2</td>
                      <td>ℝ³ {isZh ? '(自交)' : '(self-int.)'}</td>
                      <td className="text-orange-400">ℝ⁴</td>
                    </tr>
                    <tr>
                      <td className="py-1">ℝP² {isZh ? '(射影平面)' : '(proj. plane)'}</td>
                      <td>2</td>
                      <td>ℝ³ {isZh ? '(自交)' : '(self-int.)'}</td>
                      <td className="text-orange-400">ℝ⁴</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <p className="text-cyan-400 font-semibold mb-1">{isZh ? '为什么 Klein 瓶不能嵌入 ℝ³？' : 'Why can\'t Klein bottle embed in ℝ³?'}</p>
                <p className="text-slate-300">
                  {isZh 
                    ? 'Klein 瓶是不可定向的闭曲面。定理：在 ℝ³ 中，任何闭曲面都会把空间分成"内"和"外"。但 Klein 瓶没有内外之分（不可定向），所以它必须自交才能在 3D 中表示。需要"多一个维度"（ℝ⁴）来避免自交。'
                    : 'Klein bottle is a non-orientable closed surface. Theorem: In ℝ³, any closed surface divides space into "inside" and "outside". But Klein bottle has no inside/outside (non-orientable), so it must self-intersect in 3D. It needs "one more dimension" (ℝ⁴) to avoid self-intersection.'}
                </p>
              </div>
            </div>
          </div>

          {/* Why embedding matters for later theory */}
          <div className="bg-gradient-to-r from-amber-900/30 to-yellow-900/30 rounded-lg p-4 border border-amber-700 mb-4">
            <p className="text-amber-400 font-semibold mb-2">
              📣 {isZh ? '预告：为什么"嵌入"是我们关注的重点？' : 'Preview: Why "Embedding" is Our Focus'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '在 Chen-Li 的论文中，接触数的定义要求子流形 M 是欧氏空间 E^m 中的子流形——即 M 通过等距嵌入成为 E^m 的一个子集。这是因为法截面的定义需要用一个仿射子空间去"切割" M，而这只有在 M 是一个没有自交的子集时才有意义。因此，本教程中讨论的子流形默认都是嵌入的。'
                : 'In Chen-Li\'s paper, the contact number is defined for submanifolds M in Euclidean space E^m—meaning M is isometrically embedded as a subset of E^m. This is because the normal section definition requires intersecting M with an affine subspace, which only makes sense when M is a subset without self-intersections. Thus, submanifolds in this tutorial are embedded by default.'}
            </p>
            <p className="text-slate-400 text-xs mt-2">
              {isZh 
                ? '（技术注释：由于每个浸入在局部都是嵌入，接触数的结果在局部意义上也适用于浸入。论文中的许多例子也以"等距浸入"的语言给出。）'
                : '(Technical note: Since every immersion is locally an embedding, contact number results also apply locally to immersions. Many examples in the paper are also stated using "isometric immersion" language.)'}
            </p>
          </div>
        </section>

        {/* Section 2.3 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 id="section-2.3" className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '2.3 欧氏空间中的子流形' : '2.3 Submanifolds in Euclidean Space'}
          </h2>
          
          <p className="text-slate-300 mb-4">
            {isZh 
              ? '陳邦彥教授与李世杰教授的研究主要关注欧氏空间中的子流形。'
              : "The research by Prof. Bang-Yen Chen and Prof. Shi-Jie Li primarily focuses on submanifolds in Euclidean space."}
          </p>

          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">
              {isZh ? '定义（欧氏空间）' : 'Definition (Euclidean Space)'}
            </p>
            <p className="text-slate-300 mb-2">
              {isZh 
                ? 'm维欧氏空间是配备标准内积的实向量空间：'
                : 'm-dimensional Euclidean space is a real vector space with the standard inner product:'}
            </p>
            <MathBlock>{'E^m = (\\mathbb{R}^m, \\langle \\cdot, \\cdot \\rangle)'}</MathBlock>
          </div>

          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">
              {isZh ? '定义（子流形）' : 'Definition (Submanifold)'}
            </p>
            <p className="text-slate-300 mb-2">
              {isZh 
                ? 'n维子流形M是欧氏空间的一个子集，局部是n维的：'
                : 'An n-dimensional submanifold M is a subset of Euclidean space that is locally n-dimensional:'}
            </p>
            <MathBlock>{'M^n \\subset E^m \\quad (n < m)'}</MathBlock>
          </div>

          <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 rounded-lg p-4 border border-purple-700 mb-4">
            <h3 className="text-purple-400 font-semibold mb-2">
              🔑 {isZh ? '余维数 (Codimension) — 关键概念！' : 'Codimension — Key Concept!'}
            </h3>
            <p className="text-slate-300 mb-2">
              {isZh 
                ? '余维数 = m - n，表示子流形"缺少"的维数，也就是法空间的维数。'
                : 'Codimension = m - n, representing the "missing" dimensions of the submanifold, i.e., the dimension of the normal space.'}
            </p>
            <MathBlock>{'\\text{codim}(M) = m - n = \\dim(T^\\perp_p M)'}</MathBlock>
          </div>

          {/* Codimension analogy */}
          <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-4 border border-yellow-700 mb-4">
            <h3 className="text-yellow-400 font-semibold mb-2">
              🏊 {isZh ? '游泳池类比' : 'Swimming Pool Analogy'}
            </h3>
            <p className="text-slate-300 text-sm mb-3">
              {isZh 
                ? '想象不同"自由度"的活动空间：'
                : 'Imagine activity spaces with different "degrees of freedom":'}
            </p>
            <div className="grid md:grid-cols-3 gap-3 text-sm">
              <div className="bg-slate-900 rounded p-3">
                <p className="text-cyan-400 font-semibold">{isZh ? '走钢丝' : 'Tightrope Walking'}</p>
                <p className="text-slate-400">{isZh ? '1维线 ⊂ 3维空间' : '1D line ⊂ 3D space'}</p>
                <p className="text-purple-400">{isZh ? '余维数 = 2' : 'codim = 2'}</p>
                <p className="text-slate-500 text-xs mt-1">{isZh ? '你可以向左右/上下"掉落"' : 'You can "fall" left-right or up-down'}</p>
              </div>
              <div className="bg-slate-900 rounded p-3">
                <p className="text-cyan-400 font-semibold">{isZh ? '溜冰场' : 'Ice Skating Rink'}</p>
                <p className="text-slate-400">{isZh ? '2维面 ⊂ 3维空间' : '2D surface ⊂ 3D space'}</p>
                <p className="text-purple-400">{isZh ? '余维数 = 1' : 'codim = 1'}</p>
                <p className="text-slate-500 text-xs mt-1">{isZh ? '只能向上"跳起"' : 'Can only "jump" upward'}</p>
              </div>
              <div className="bg-slate-900 rounded p-3">
                <p className="text-cyan-400 font-semibold">{isZh ? '游泳池' : 'Swimming Pool'}</p>
                <p className="text-slate-400">{isZh ? '3维体 ⊂ 3维空间' : '3D volume ⊂ 3D space'}</p>
                <p className="text-purple-400">{isZh ? '余维数 = 0' : 'codim = 0'}</p>
                <p className="text-slate-500 text-xs mt-1">{isZh ? '完全自由移动' : 'Complete freedom'}</p>
              </div>
            </div>
          </div>

          {/* Why codimension matters */}
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <h3 className="text-cyan-400 font-semibold mb-2">
              💡 {isZh ? '为什么余维数重要？' : 'Why Does Codimension Matter?'}
            </h3>
            <ul className="text-slate-300 text-sm space-y-2">
              <li>• <span className="text-green-400">{isZh ? '余维数 = 1' : 'Codim = 1'}</span>: {isZh ? '超曲面，法空间只有一个方向，几何相对简单' : 'Hypersurface, normal space has only one direction, geometry is simpler'}</li>
              <li>• <span className="text-yellow-400">{isZh ? '余维数 = 2' : 'Codim = 2'}</span>: {isZh ? '"甜蜜点"——足够复杂但可以完全分类（Chen-Li论文重点）' : '"Sweet spot"—complex enough but fully classifiable (Chen-Li paper focus)'}</li>
              <li>• <span className="text-orange-400">{isZh ? '余维数 ≥ 3' : 'Codim ≥ 3'}</span>: {isZh ? '非常复杂，难以完全分类' : 'Very complex, difficult to fully classify'}</li>
            </ul>
          </div>

          {/* Examples with visualization */}
          <div className="bg-slate-800 rounded-lg p-4">
            <h3 className="text-cyan-400 font-semibold mb-3">
              📊 {isZh ? '具体例子' : 'Concrete Examples'}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-slate-600">
                    <th className="py-2 text-slate-400">{isZh ? '子流形' : 'Submanifold'}</th>
                    <th className="py-2 text-slate-400">n</th>
                    <th className="py-2 text-slate-400">{isZh ? '环境' : 'Ambient'}</th>
                    <th className="py-2 text-slate-400">m</th>
                    <th className="py-2 text-purple-400">{isZh ? '余维数' : 'Codim'}</th>
                    <th className="py-2 text-slate-400">{isZh ? '法空间' : 'Normal'}</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-slate-700">
                    <td className="py-2">{isZh ? '球面 S²' : 'Sphere S²'}</td>
                    <td className="py-2">2</td>
                    <td className="py-2">E³</td>
                    <td className="py-2">3</td>
                    <td className="py-2 text-green-400 font-semibold">1</td>
                    <td className="py-2">{isZh ? '1维（法线）' : '1D (normal line)'}</td>
                  </tr>
                  <tr className="border-b border-slate-700">
                    <td className="py-2">{isZh ? '空间曲线' : 'Space curve'}</td>
                    <td className="py-2">1</td>
                    <td className="py-2">E³</td>
                    <td className="py-2">3</td>
                    <td className="py-2 text-yellow-400 font-semibold">2</td>
                    <td className="py-2">{isZh ? '2维（法平面）' : '2D (normal plane)'}</td>
                  </tr>
                  <tr className="border-b border-slate-700">
                    <td className="py-2">{isZh ? '曲面 ⊂ E⁴' : 'Surface ⊂ E⁴'}</td>
                    <td className="py-2">2</td>
                    <td className="py-2">E⁴</td>
                    <td className="py-2">4</td>
                    <td className="py-2 text-yellow-400 font-semibold">2</td>
                    <td className="py-2">{isZh ? '2维法空间' : '2D normal space'}</td>
                  </tr>
                  <tr>
                    <td className="py-2">{isZh ? '曲面 ⊂ E⁶' : 'Surface ⊂ E⁶'}</td>
                    <td className="py-2">2</td>
                    <td className="py-2">E⁶</td>
                    <td className="py-2">6</td>
                    <td className="py-2 text-orange-400 font-semibold">4</td>
                    <td className="py-2">{isZh ? '4维法空间 ⭐' : '4D normal space ⭐'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-slate-400 text-xs mt-2">
              ⭐ {isZh ? 'Chen-Li论文研究的关键对象：E⁶中余维数4的曲面，几何结构最丰富' : 'Key object in Chen-Li paper: surfaces in E⁶ with codimension 4, richest geometry'}
            </p>
          </div>

          {/* Preview: codimension importance */}
          <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 rounded-lg p-4 border border-green-700 mt-4">
            <p className="text-green-400 font-semibold mb-2">
              📣 {isZh ? '预告：余维数的重要性' : 'Preview: Why Codimension Matters'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '在第五章中我们将看到，余维数直接影响子流形可能具有的几何对称性。'
                : 'In Chapter 5, we\'ll see that codimension directly affects what geometric symmetry a submanifold can have.'}
            </p>
            <p className="text-green-300 text-sm mt-2">
              💡 {isZh 
                ? '高余维数 = 更多"弯曲的空间" = 更多几何可能性！'
                : 'Higher codimension = more "room to bend" = more geometric possibilities!'}
            </p>
          </div>
        </section>

        {/* Section 2.4 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 id="section-2.4" className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '2.4 直和分解' : '2.4 Direct Sum Decomposition'}
          </h2>

          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">
              {isZh ? '直和分解' : 'Direct Sum Decomposition'}
            </p>
            <MathBlock>{'T_p E^m = T_p M \\oplus T_p^\\perp M'}</MathBlock>
            <p className="text-slate-400 text-sm mt-2">
              {isZh 
                ? '欧氏空间的切空间等于子流形的切空间与法空间的直和。'
                : "Euclidean space's tangent space equals the direct sum of submanifold's tangent and normal spaces."}
            </p>
          </div>

          {/* What is direct sum? */}
          <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg p-4 border border-purple-700 mb-4">
            <h3 className="text-purple-400 font-semibold mb-2">
              ❓ {isZh ? '什么是"直和"？' : 'What is "Direct Sum"?'}
            </h3>
            <p className="text-slate-300 text-sm mb-3">
              {isZh 
                ? '直和⊕是一种特殊的"组合"方式，要求两个空间完全互不重叠，可以唯一地分解。'
                : 'Direct sum ⊕ is a special way of "combining" spaces, requiring them to have no overlap and allowing unique decomposition.'}
            </p>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div className="bg-slate-900 rounded p-3">
                <p className="text-cyan-400 font-semibold mb-1">{isZh ? '条件 1：不重叠' : 'Condition 1: No Overlap'}</p>
                <MathBlock>{'T_p M \\cap T_p^\\perp M = \\{0\\}'}</MathBlock>
                <p className="text-slate-500 text-xs">{isZh ? '两个空间只共享零向量' : 'Spaces share only the zero vector'}</p>
              </div>
              <div className="bg-slate-900 rounded p-3">
                <p className="text-cyan-400 font-semibold mb-1">{isZh ? '条件 2：完整覆盖' : 'Condition 2: Complete Coverage'}</p>
                <MathBlock>{'T_p M + T_p^\\perp M = T_p E^m'}</MathBlock>
                <p className="text-slate-500 text-xs">{isZh ? '两者合起来恰好是整个空间' : 'Together they span the whole space'}</p>
              </div>
            </div>
          </div>

          {/* Pizza analogy for direct sum */}
          <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-4 border border-yellow-700 mb-4">
            <h3 className="text-yellow-400 font-semibold mb-2">
              🍕 {isZh ? '披萨类比' : 'Pizza Analogy'}
            </h3>
            <p className="text-slate-300 text-sm mb-2">
              {isZh 
                ? '想象一整块披萨被切成两部分：'
                : 'Imagine a pizza cut into two parts:'}
            </p>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• {isZh ? '切空间 T_pM = 你的那份披萨' : 'Tangent space T_pM = your portion of pizza'}</li>
              <li>• {isZh ? '法空间 T_p⊥M = 朋友的那份披萨' : 'Normal space T_p⊥M = friend\'s portion'}</li>
              <li>• {isZh ? '直和 ⊕ = 两份合起来恰好是完整的披萨，没有重叠也没有缺失' : 'Direct sum ⊕ = both portions together make the complete pizza, no overlap, no missing'}</li>
            </ul>
            <p className="text-green-400 text-sm mt-2">
              ✅ {isZh 
                ? '关键：任何向量都能唯一地分解为"切向分量 + 法向分量"'
                : 'Key: Any vector can be uniquely decomposed into "tangent part + normal part"'}
            </p>
          </div>

          {/* Why direct sum matters */}
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <h3 className="text-cyan-400 font-semibold mb-2">
              🤔 {isZh ? '为什么直和分解重要？' : 'Why Does Direct Sum Matter?'}
            </h3>
            <p className="text-slate-300 text-sm mb-3">
              {isZh 
                ? '直和分解让我们可以把复杂的高维问题拆解为两个独立的部分来分析：'
                : 'Direct sum decomposition lets us break down complex high-dimensional problems into two independent parts:'}
            </p>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div className="bg-slate-900 rounded p-3 border-l-4 border-cyan-500">
                <p className="text-cyan-400 font-semibold">{isZh ? '切向部分' : 'Tangent Part'}</p>
                <p className="text-slate-400">{isZh ? '研究子流形本身的"内在几何"' : 'Studies the "intrinsic geometry" of the submanifold'}</p>
                <p className="text-slate-500 text-xs mt-1">{isZh ? '例：曲面上两点之间的最短路径' : 'E.g., shortest path between two points on surface'}</p>
              </div>
              <div className="bg-slate-900 rounded p-3 border-l-4 border-pink-500">
                <p className="text-pink-400 font-semibold">{isZh ? '法向部分' : 'Normal Part'}</p>
                <p className="text-slate-400">{isZh ? '研究子流形如何"弯曲"嵌入外部空间' : 'Studies how the submanifold "bends" in ambient space'}</p>
                <p className="text-slate-500 text-xs mt-1">{isZh ? '例：曲面的弯曲程度（曲率）' : 'E.g., degree of bending (curvature)'}</p>
              </div>
            </div>
            <p className="text-yellow-400 text-sm mt-3">
              📣 {isZh 
                ? '预告：后续章节将深入研究法向部分的几何性质，揭示它如何反映子流形的嵌入特征。'
                : 'Preview: Later chapters will study the geometry of the normal part, revealing how it reflects embedding characteristics.'}
            </p>
          </div>

          {/* Concrete decomposition example */}
          <div className="bg-slate-800 rounded-lg p-4">
            <h3 className="text-cyan-400 font-semibold mb-2">
              📐 {isZh ? '具体例子：球面上的直和分解' : 'Concrete Example: Direct Sum on Sphere'}
            </h3>
            <p className="text-slate-300 text-sm mb-2">
              {isZh 
                ? '考虑单位球面 S² ⊂ E³，在点 p = (1, 0, 0) 处：'
                : 'Consider unit sphere S² ⊂ E³, at point p = (1, 0, 0):'}
            </p>
            <div className="grid md:grid-cols-2 gap-3 text-sm mb-3">
              <div className="bg-slate-900 rounded p-3">
                <p className="text-cyan-400 font-semibold">{isZh ? '切空间' : 'Tangent Space'}</p>
                <MathBlock>{'T_p S^2 = \\{(0, y, z) : y, z \\in \\mathbb{R}\\}'}</MathBlock>
                <p className="text-slate-500 text-xs">{isZh ? 'y-z平面（2维）' : 'y-z plane (2D)'}</p>
              </div>
              <div className="bg-slate-900 rounded p-3">
                <p className="text-pink-400 font-semibold">{isZh ? '法空间' : 'Normal Space'}</p>
                <MathBlock>{'T_p^\\perp S^2 = \\{(x, 0, 0) : x \\in \\mathbb{R}\\}'}</MathBlock>
                <p className="text-slate-500 text-xs">{isZh ? 'x轴方向（1维）' : 'x-axis direction (1D)'}</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '任何向量 v = (a, b, c) ∈ E³ 可以唯一分解为：'
                : 'Any vector v = (a, b, c) ∈ E³ can be uniquely decomposed as:'}
            </p>
            <MathBlock>{'v = \\underbrace{(0, b, c)}_{\\text{' + (isZh ? '切向' : 'tangent') + '}} + \\underbrace{(a, 0, 0)}_{\\text{' + (isZh ? '法向' : 'normal') + '}}'}</MathBlock>
          </div>
        </section>

        {/* Section 2.5 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 id="section-2.5" className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '2.5 第二基本形式' : '2.5 Second Fundamental Form'}
          </h2>
          
          <div className="bg-gradient-to-r from-red-900/50 to-orange-900/50 rounded-lg p-4 border border-red-700 mb-4">
            <h3 className="text-red-400 font-semibold mb-2">
              ⭐ {isZh ? '核心概念——后续章节的关键工具' : 'Core Concept—Key Tool for Later Chapters'}
            </h3>
            <p className="text-slate-300">
              {isZh 
                ? '第二基本形式h测量子流形如何"弯曲"地嵌入外部空间。它是后续所有定理的核心数学工具。'
                : 'The second fundamental form h measures how the submanifold "bends" in the ambient space. It is the core mathematical tool for all theorems to come.'}
            </p>
          </div>

          {/* Intuitive understanding */}
          <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 rounded-lg p-4 border border-green-700 mb-4">
            <h3 className="text-green-400 font-semibold mb-2">
              🚗 {isZh ? '开车类比：理解"弯曲"' : 'Driving Analogy: Understanding "Bending"'}
            </h3>
            <p className="text-slate-300 text-sm mb-3">
              {isZh 
                ? '想象你在一条路上开车：'
                : 'Imagine driving on a road:'}
            </p>
            <ul className="text-slate-300 text-sm space-y-2">
              <li>• <span className="text-cyan-400">{isZh ? '直路' : 'Straight road'}</span>: {isZh ? '方向盘不用转 → h = 0（没有弯曲）' : 'No steering needed → h = 0 (no bending)'}</li>
              <li>• <span className="text-yellow-400">{isZh ? '缓弯' : 'Gentle curve'}</span>: {isZh ? '方向盘轻轻转 → h 较小（轻微弯曲）' : 'Slight steering → h is small (mild bending)'}</li>
              <li>• <span className="text-red-400">{isZh ? '急弯' : 'Sharp turn'}</span>: {isZh ? '方向盘大幅度转 → h 较大（剧烈弯曲）' : 'Heavy steering → h is large (strong bending)'}</li>
            </ul>
            <p className="text-yellow-400 text-sm mt-3">
              💡 {isZh 
                ? '第二基本形式h精确地量化了这种"需要转方向盘"的程度！'
                : 'Second fundamental form h precisely quantifies this "steering needed" degree!'}
            </p>
          </div>

          {/* First vs Second fundamental form */}
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <h3 className="text-cyan-400 font-semibold mb-2">
              📊 {isZh ? '第一基本形式 vs 第二基本形式' : 'First vs Second Fundamental Form'}
            </h3>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div className="bg-slate-900 rounded p-3 border-l-4 border-blue-500">
                <p className="text-blue-400 font-semibold mb-1">{isZh ? '第一基本形式 I' : 'First Fundamental Form I'}</p>
                <p className="text-slate-400">{isZh ? '测量子流形上的长度和角度' : 'Measures lengths and angles on the submanifold'}</p>
                <p className="text-slate-500 text-xs mt-1">{isZh ? '"内在几何"：不需要知道外部空间' : '"Intrinsic geometry": doesn\'t need ambient space'}</p>
                <p className="text-slate-500 text-xs">{isZh ? '例：曲面上两点的测地距离' : 'E.g., geodesic distance on surface'}</p>
              </div>
              <div className="bg-slate-900 rounded p-3 border-l-4 border-orange-500">
                <p className="text-orange-400 font-semibold mb-1">{isZh ? '第二基本形式 h' : 'Second Fundamental Form h'}</p>
                <p className="text-slate-400">{isZh ? '测量子流形如何弯曲嵌入外部空间' : 'Measures how submanifold bends in ambient space'}</p>
                <p className="text-slate-500 text-xs mt-1">{isZh ? '"外在几何"：需要知道嵌入方式' : '"Extrinsic geometry": needs embedding info'}</p>
                <p className="text-slate-500 text-xs">{isZh ? '例：曲面在空间中的弯曲程度' : 'E.g., degree of surface bending in space'}</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm mt-3">
              {isZh 
                ? '著名的Gauss绝妙定理(Theorema Egregium)说：对于曲面，高斯曲率虽然用第二基本形式定义，但其实是内在不变量！'
                : 'The famous Theorema Egregium states: for surfaces, Gaussian curvature, though defined using the second fundamental form, is actually an intrinsic invariant!'}
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">
              {isZh ? 'Gauss公式——分解导数' : 'Gauss Formula—Decomposing Derivatives'}
            </p>
            <MathBlock>{'\\tilde{\\nabla}_X Y = \\nabla_X Y + h(X, Y)'}</MathBlock>
            <div className="mt-3 text-sm">
              <p className="text-slate-300 mb-2">{isZh ? '解读：' : 'Interpretation:'}</p>
              <ul className="text-slate-400 space-y-1">
                <li>• <Math>{'\\tilde{\\nabla}_X Y'}</Math>: {isZh ? '在外部空间E^m中对Y求导（沿X方向）' : 'Derivative of Y in ambient space E^m (along X direction)'}</li>
                <li>• <Math>{'\\nabla_X Y'}</Math>: {isZh ? '切向分量 — 在子流形M内的导数' : 'Tangent part — derivative within submanifold M'}</li>
                <li>• <Math>{'h(X, Y)'}</Math>: {isZh ? '法向分量 — 这就是第二基本形式！' : 'Normal part — this is the second fundamental form!'}</li>
              </ul>
            </div>
            <p className="text-yellow-400 text-sm mt-3">
              💡 {isZh 
                ? 'Gauss公式正是直和分解的应用：把导数分解为切向+法向两部分！'
                : 'Gauss formula is exactly the application of direct sum: decomposing derivative into tangent + normal!'}
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">
              {isZh ? '定义（第二基本形式）' : 'Definition (Second Fundamental Form)'}
            </p>
            <p className="text-slate-300 mb-2">
              {isZh 
                ? '第二基本形式是一个对称双线性映射：'
                : 'The second fundamental form is a symmetric bilinear map:'}
            </p>
            <MathBlock>{'h: T_pM \\times T_pM \\to T_p^\\perp M'}</MathBlock>
            <div className="mt-3 text-sm">
              <p className="text-slate-300 mb-2">{isZh ? '逐项理解：' : 'Understanding each part:'}</p>
              <ul className="text-slate-400 space-y-1">
                <li>• <span className="text-cyan-400">{isZh ? '输入' : 'Input'}</span>: {isZh ? '两个切向量 X, Y ∈ T_pM' : 'Two tangent vectors X, Y ∈ T_pM'}</li>
                <li>• <span className="text-pink-400">{isZh ? '输出' : 'Output'}</span>: {isZh ? '一个法向量 h(X,Y) ∈ T_p⊥M' : 'A normal vector h(X,Y) ∈ T_p⊥M'}</li>
                <li>• <span className="text-green-400">{isZh ? '对称' : 'Symmetric'}</span>: h(X,Y) = h(Y,X)</li>
                <li>• <span className="text-yellow-400">{isZh ? '双线性' : 'Bilinear'}</span>: {isZh ? '对X和Y都是线性的' : 'Linear in both X and Y'}</li>
              </ul>
            </div>
          </div>

          {/* Why h is a normal vector */}
          <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg p-4 border border-purple-700 mb-4">
            <h3 className="text-purple-400 font-semibold mb-2">
              🤔 {isZh ? '为什么h(X,Y)是法向量？' : 'Why is h(X,Y) a Normal Vector?'}
            </h3>
            <p className="text-slate-300 text-sm mb-2">
              {isZh 
                ? '直觉解释：如果你沿着子流形走（切向移动），你的位置只在子流形上变化。但如果子流形是弯曲的，你的速度方向会改变——而这个改变的方向指向"弯曲的方向"，也就是法方向！'
                : 'Intuitive explanation: If you walk along the submanifold (tangent movement), your position only changes on the submanifold. But if the submanifold is curved, your velocity direction changes—and this change points in the "bending direction", i.e., the normal direction!'}
            </p>
            <div className="bg-slate-900 rounded p-3 text-sm mt-3">
              <p className="text-cyan-400 font-semibold mb-1">{isZh ? '球面上的例子' : 'Example on Sphere'}</p>
              <p className="text-slate-400">
                {isZh 
                  ? '在球面上沿赤道行走，你的速度方向不断向内弯曲（指向球心）。这个弯曲方向就是法方向！h越大，弯曲越剧烈。'
                  : 'Walking along the equator on a sphere, your velocity direction keeps bending inward (toward the center). This bending direction is the normal direction! Larger h means more bending.'}
              </p>
            </div>
          </div>

          {/* Concrete example */}
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <h3 className="text-cyan-400 font-semibold mb-2">
              📐 {isZh ? '具体例子：球面的第二基本形式' : 'Concrete Example: Second Fundamental Form of Sphere'}
            </h3>
            <p className="text-slate-300 text-sm mb-2">
              {isZh 
                ? '对于半径为 r 的球面 S² ⊂ E³：'
                : 'For a sphere S² ⊂ E³ with radius r:'}
            </p>
            <MathBlock>{'h(X, Y) = -\\frac{1}{r}\\langle X, Y \\rangle \\cdot \\mathbf{n}'}</MathBlock>
            <p className="text-slate-400 text-sm mt-2">
              {isZh 
                ? '其中 n 是单位外法向量。注意：球面各处各方向的弯曲程度相同（1/r），这就是为什么球面是"脐"的！'
                : 'Where n is the unit outward normal. Note: the sphere bends equally (1/r) in all directions at all points—this is why the sphere is "umbilical"!'}
            </p>
            <div className="grid md:grid-cols-2 gap-3 text-sm mt-3">
              <div className="bg-slate-900 rounded p-3">
                <p className="text-green-400 font-semibold">{isZh ? '小球（r小）' : 'Small sphere (small r)'}</p>
                <p className="text-slate-400">{isZh ? 'h = -1/r 很大 → 弯曲剧烈' : 'h = -1/r is large → strong bending'}</p>
              </div>
              <div className="bg-slate-900 rounded p-3">
                <p className="text-yellow-400 font-semibold">{isZh ? '大球（r大）' : 'Large sphere (large r)'}</p>
                <p className="text-slate-400">{isZh ? 'h = -1/r 很小 → 弯曲平缓' : 'h = -1/r is small → gentle bending'}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-4">
            <p className="text-yellow-400 font-semibold mb-2">
              📣 {isZh ? '预告' : 'Preview'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '第二基本形式 h 是后续章节的核心工具。在第五章，我们将看到 h(u,u)（沿方向u的"自弯曲"）如何决定子流形的对称性质——对 h 的约束越强，子流形越"特殊"。'
                : 'The second fundamental form h is the core tool for later chapters. In Chapter 5, we\'ll see how h(u,u) (the "self-bending" along direction u) determines the symmetry properties of submanifolds—stronger constraints on h mean more "special" submanifolds.'}
            </p>
          </div>

          {/* Second fundamental form visualization */}
          <div className="mt-4">
            <SecondFundamentalFormVizWithLabels />
          </div>
        </section>

        {/* Section 2.5 */}
        {/* Section 2.6 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 id="section-2.6" className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '2.6 形状算子' : '2.6 Shape Operator'}
          </h2>

          {/* Intuitive explanation */}
          <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 rounded-lg p-4 border border-green-700 mb-4">
            <h3 className="text-green-400 font-semibold mb-2">
              🔍 {isZh ? '形状算子的直觉' : 'Intuition of Shape Operator'}
            </h3>
            <p className="text-slate-300 text-sm mb-2">
              {isZh 
                ? '第二基本形式h告诉我们"沿某方向弯曲后得到什么法向量"。而形状算子A_ξ回答相反的问题：'
                : 'The second fundamental form h tells us "what normal vector we get after bending in some direction". The shape operator A_ξ answers the opposite question:'}
            </p>
            <p className="text-yellow-400 text-sm font-semibold">
              ❓ {isZh 
                ? '"给定一个法方向ξ，在这个方向上弯曲会如何影响切空间？"'
                : '"Given a normal direction ξ, how does bending in this direction affect the tangent space?"'}
            </p>
          </div>

          {/* Mirror analogy */}
          <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-4 border border-yellow-700 mb-4">
            <h3 className="text-yellow-400 font-semibold mb-2">
              🪞 {isZh ? '哈哈镜类比' : 'Fun House Mirror Analogy'}
            </h3>
            <p className="text-slate-300 text-sm mb-2">
              {isZh 
                ? '想象你站在哈哈镜前：'
                : 'Imagine standing in front of a fun house mirror:'}
            </p>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• {isZh ? '镜面的弯曲方式（凸/凹/波浪）= 法方向ξ的"曲率"' : 'How the mirror is curved (convex/concave/wavy) = "curvature" in normal direction ξ'}</li>
              <li>• {isZh ? '你的像被拉伸或压缩的方式 = 形状算子 A_ξ' : 'How your image is stretched or compressed = shape operator A_ξ'}</li>
              <li>• {isZh ? '不同方向的拉伸程度不同 = A_ξ的特征值（主曲率）' : 'Different stretching in different directions = eigenvalues of A_ξ (principal curvatures)'}</li>
            </ul>
            <p className="text-green-400 text-sm mt-2">
              ✅ {isZh 
                ? '形状算子把"法方向的几何"翻译成"切空间内的变换"！'
                : 'Shape operator translates "normal direction geometry" into "tangent space transformation"!'}
            </p>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">
              {isZh ? 'Weingarten公式——分解法向量的导数' : 'Weingarten Formula—Decomposing Normal Vector Derivative'}
            </p>
            <MathBlock>{'\\tilde{\\nabla}_X \\xi = -A_\\xi X + D_X \\xi'}</MathBlock>
            <div className="mt-3 text-sm">
              <p className="text-slate-300 mb-2">{isZh ? '解读：' : 'Interpretation:'}</p>
              <ul className="text-slate-400 space-y-1">
                <li>• <Math>{'\\tilde{\\nabla}_X \\xi'}</Math>: {isZh ? '在外部空间中对法向量ξ求导（沿切向X）' : 'Derivative of normal vector ξ in ambient space (along tangent X)'}</li>
                <li>• <Math>{'-A_\\xi X'}</Math>: {isZh ? '切向分量（负号是约定）' : 'Tangent part (negative sign is convention)'}</li>
                <li>• <Math>{'D_X \\xi'}</Math>: {isZh ? '法向分量——法联络' : 'Normal part—normal connection'}</li>
              </ul>
            </div>
            <p className="text-yellow-400 text-sm mt-3">
              💡 {isZh 
                ? '这又是直和分解！Gauss公式分解切向量的导数，Weingarten公式分解法向量的导数。'
                : 'This is direct sum decomposition again! Gauss formula decomposes tangent vector derivative, Weingarten formula decomposes normal vector derivative.'}
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">
              {isZh ? '定义（形状算子）' : 'Definition (Shape Operator)'}
            </p>
            <p className="text-slate-300 mb-2">
              {isZh 
                ? '给定法向量 ξ ∈ T_p⊥M，形状算子是一个线性映射：'
                : 'Given normal vector ξ ∈ T_p⊥M, the shape operator is a linear map:'}
            </p>
            <MathBlock>{'A_\\xi : T_pM \\to T_pM'}</MathBlock>
            <p className="text-slate-400 text-sm mt-2">
              {isZh 
                ? '它把一个切向量X映射到另一个切向量 A_ξ(X)。'
                : 'It maps a tangent vector X to another tangent vector A_ξ(X).'}
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">
              {isZh ? '形状算子与第二基本形式的关系' : 'Relation to Second Fundamental Form'}
            </p>
            <MathBlock>{'\\langle A_\\xi X, Y \\rangle = \\langle h(X, Y), \\xi \\rangle'}</MathBlock>
            <p className="text-slate-400 text-sm mt-2 mb-3">
              {isZh 
                ? '形状算子 A_ξ 是第二基本形式的"切空间版本"——通过内积把法向量信息转换成切空间内的信息。'
                : 'The shape operator A_ξ is the "tangent space version" of the second fundamental form—converting normal vector info to tangent space info via inner product.'}
            </p>
            <div className="bg-slate-900 rounded p-3 text-sm">
              <p className="text-cyan-400 font-semibold mb-1">{isZh ? '为什么这个关系有用？' : 'Why is this relation useful?'}</p>
              <p className="text-slate-400">
                {isZh 
                  ? 'h(X,Y)住在法空间（可能是高维的），但A_ξX住在切空间（子流形的维数）。A_ξ是一个矩阵，我们可以计算它的特征值、行列式、迹等！'
                  : 'h(X,Y) lives in normal space (possibly high-dimensional), but A_ξX lives in tangent space (submanifold dimension). A_ξ is a matrix—we can compute eigenvalues, determinant, trace, etc.!'}
              </p>
            </div>
          </div>

          {/* Properties of shape operator */}
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <h3 className="text-cyan-400 font-semibold mb-2">
              📋 {isZh ? '形状算子的重要性质' : 'Important Properties of Shape Operator'}
            </h3>
            <ul className="text-slate-300 text-sm space-y-2">
              <li className="flex items-start">
                <span className="bg-cyan-600 text-white text-xs px-2 py-0.5 rounded mr-2 mt-0.5">1</span>
                <span><span className="text-yellow-400">{isZh ? '自伴随（对称）' : 'Self-adjoint (Symmetric)'}</span>: ⟨A_ξX, Y⟩ = ⟨X, A_ξY⟩ — {isZh ? '所以特征值都是实数' : 'so eigenvalues are all real'}</span>
              </li>
              <li className="flex items-start">
                <span className="bg-cyan-600 text-white text-xs px-2 py-0.5 rounded mr-2 mt-0.5">2</span>
                <span><span className="text-green-400">{isZh ? '特征值 = 主曲率' : 'Eigenvalues = Principal Curvatures'}</span>: {isZh ? '沿法方向ξ的弯曲程度' : 'bending degree in normal direction ξ'}</span>
              </li>
              <li className="flex items-start">
                <span className="bg-cyan-600 text-white text-xs px-2 py-0.5 rounded mr-2 mt-0.5">3</span>
                <span><span className="text-purple-400">{isZh ? '迹 = 平均曲率（分量）' : 'Trace = Mean Curvature (component)'}</span>: tr(A_ξ) = n⟨H, ξ⟩</span>
              </li>
            </ul>
          </div>

          {/* Concrete example */}
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <h3 className="text-cyan-400 font-semibold mb-2">
              📐 {isZh ? '具体例子：球面的形状算子' : 'Concrete Example: Shape Operator of Sphere'}
            </h3>
            <p className="text-slate-300 text-sm mb-2">
              {isZh 
                ? '对于半径为 r 的球面 S² ⊂ E³，单位外法向量 n：'
                : 'For sphere S² ⊂ E³ with radius r, unit outward normal n:'}
            </p>
            <MathBlock>{'A_n = \\frac{1}{r} \\cdot I'}</MathBlock>
            <p className="text-slate-400 text-sm mt-2">
              {isZh 
                ? '形状算子就是 1/r 倍的恒等变换！这意味着：'
                : 'The shape operator is just 1/r times the identity! This means:'}
            </p>
            <ul className="text-slate-400 text-sm mt-2 space-y-1">
              <li>• {isZh ? '所有主曲率相同（= 1/r）' : 'All principal curvatures are the same (= 1/r)'}</li>
              <li>• {isZh ? '球面是"脐"的——各方向弯曲程度相同' : 'Sphere is "umbilical"—same bending in all directions'}</li>
              <li>• {isZh ? '这与第二基本形式 h = -(1/r)⟨X,Y⟩n 完全一致' : 'This is consistent with h = -(1/r)⟨X,Y⟩n'}</li>
            </ul>
          </div>

          {/* Shape operator special properties */}
          <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg p-4 border border-purple-700 mb-4">
            <h3 className="text-purple-400 font-semibold mb-2">
              🔗 {isZh ? '形状算子的特殊条件（后续章节）' : 'Special Shape Operator Conditions (Later Chapters)'}
            </h3>
            <p className="text-slate-300 text-sm mb-3">
              {isZh 
                ? '后续章节将研究形状算子满足特殊条件时，子流形会有什么性质：'
                : 'Later chapters will study what happens when the shape operator satisfies special conditions:'}
            </p>
            <ul className="text-slate-300 text-sm space-y-2">
              <li>• <span className="text-green-400">{isZh ? '伪脐条件' : 'Pseudo-umbilical condition'}</span>: A_H = λI — {isZh ? '沿平均曲率方向的形状算子是恒等的倍数（第7章）' : 'shape operator along mean curvature is scalar identity (Chapter 7)'}</li>
              <li>• <span className="text-yellow-400">{isZh ? '形状算子可交换' : 'Commuting shape operators'}</span>: A_ξA_η = A_ηA_ξ — {isZh ? '不同法方向的弯曲是"兼容"的' : 'bending in different normal directions is "compatible"'}</li>
              <li>• <span className="text-cyan-400">{isZh ? '平行平均曲率' : 'Parallel mean curvature'}</span>: DH = 0 — {isZh ? '平均曲率向量不随点变化（第8章）' : 'mean curvature vector doesn\'t change with point (Chapter 8)'}</li>
            </ul>
          </div>

          {/* Summary comparison */}
          <div className="bg-slate-800 rounded-lg p-4">
            <h3 className="text-cyan-400 font-semibold mb-3">
              📊 {isZh ? 'h vs A：两种视角，同一几何' : 'h vs A: Two Views, Same Geometry'}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-slate-600">
                    <th className="py-2 text-slate-400">{isZh ? '方面' : 'Aspect'}</th>
                    <th className="py-2 text-orange-400">h (第二基本形式)</th>
                    <th className="py-2 text-cyan-400">A_ξ (形状算子)</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-slate-700">
                    <td className="py-2">{isZh ? '输入' : 'Input'}</td>
                    <td className="py-2">{isZh ? '两个切向量 X, Y' : 'Two tangent vectors X, Y'}</td>
                    <td className="py-2">{isZh ? '一个切向量 X（和法向量 ξ）' : 'One tangent vector X (and normal ξ)'}</td>
                  </tr>
                  <tr className="border-b border-slate-700">
                    <td className="py-2">{isZh ? '输出' : 'Output'}</td>
                    <td className="py-2">{isZh ? '法向量' : 'Normal vector'}</td>
                    <td className="py-2">{isZh ? '切向量' : 'Tangent vector'}</td>
                  </tr>
                  <tr className="border-b border-slate-700">
                    <td className="py-2">{isZh ? '适用场景' : 'Best for'}</td>
                    <td className="py-2">{isZh ? '研究弯曲方向' : 'Studying bending direction'}</td>
                    <td className="py-2">{isZh ? '计算曲率、特征值' : 'Computing curvatures, eigenvalues'}</td>
                  </tr>
                  <tr>
                    <td className="py-2">{isZh ? '类比' : 'Analogy'}</td>
                    <td className="py-2">{isZh ? '"弯向哪里？"' : '"Bending where?"'}</td>
                    <td className="py-2">{isZh ? '"弯曲多剧烈？"' : '"How much bending?"'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Chapter Summary */}
        <section className="bg-gradient-to-r from-green-900/50 to-cyan-900/50 rounded-xl p-6 border border-green-700">
          <h2 className="text-xl font-semibold text-green-400 mb-4">
            ✅ {isZh ? '本章小结' : 'Chapter Summary'}
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-cyan-400 font-semibold mb-2">{isZh ? '核心概念' : 'Core Concepts'}</p>
              <ul className="text-slate-300 space-y-1">
                <li>✓ {isZh ? '嵌入与浸入：子流形如何"住在"外部空间' : 'Embedding & immersion: how submanifolds "live in" ambient space'}</li>
                <li>✓ {isZh ? '余维数：法空间的维数 = m - n' : 'Codimension: dimension of normal space = m - n'}</li>
                <li>✓ {isZh ? '直和分解：任何向量 = 切向 + 法向（唯一）' : 'Direct sum: any vector = tangent + normal (unique)'}</li>
              </ul>
            </div>
            <div>
              <p className="text-yellow-400 font-semibold mb-2">{isZh ? '关键工具' : 'Key Tools'}</p>
              <ul className="text-slate-300 space-y-1">
                <li>✓ {isZh ? '第二基本形式 h：测量弯曲方向（输出法向量）' : 'Second fundamental form h: measures bending direction (outputs normal)'}</li>
                <li>✓ {isZh ? '形状算子 A_ξ：测量弯曲程度（输出切向量）' : 'Shape operator A_ξ: measures bending degree (outputs tangent)'}</li>
                <li>✓ {isZh ? '两者通过内积联系：⟨A_ξX, Y⟩ = ⟨h(X,Y), ξ⟩' : 'Connected via: ⟨A_ξX, Y⟩ = ⟨h(X,Y), ξ⟩'}</li>
              </ul>
            </div>
          </div>
          <p className="text-green-400 text-sm mt-4">
            🎯 {isZh 
              ? '下一章：我们将学习测地线——流形上的"最短路径"，它是连接内蕴几何与外蕴几何的关键桥梁。'
              : 'Next chapter: We\'ll learn about geodesics—the "shortest paths" on manifolds, a key bridge connecting intrinsic and extrinsic geometry.'}
          </p>

          {/* Thinking Questions */}
          <div className="mt-6 bg-slate-800 rounded-lg p-4">
            <p className="text-yellow-400 font-semibold mb-3">
              🤔 {isZh ? '思考题' : 'Questions to Think About'}
            </p>
            <div className="space-y-3">
              <div>
                <p className="text-slate-300 text-sm">
                  {isZh 
                    ? '1. 为什么平面ℝ²的第二基本形式是零？'
                    : '1. Why is the second fundamental form of a plane ℝ² equal to zero?'}
                </p>
                <details className="mt-1">
                  <summary className="text-cyan-400 text-sm cursor-pointer hover:text-cyan-300">
                    {isZh ? '点击查看答案' : 'Click to see answer'}
                  </summary>
                  <p className="text-slate-400 text-xs mt-1">
                    {isZh 
                      ? '因为平面是完全"平"的！沿着平面走，你永远不会偏离平面方向。第二基本形式测量的就是这种偏离（弯曲），平面没有弯曲所以 h = 0。'
                      : 'Because a plane is completely "flat"! Walking along a plane, you never deviate from the plane direction. The second fundamental form measures this deviation (bending), and planes don\'t bend, so h = 0.'}
                  </p>
                </details>
              </div>
              <div>
                <p className="text-slate-300 text-sm">
                  {isZh 
                    ? '2. 球面的形状算子 A = (1/r)I，这告诉我们球面的什么性质？'
                    : '2. The shape operator of a sphere is A = (1/r)I. What does this tell us about spheres?'}
                </p>
                <details className="mt-1">
                  <summary className="text-cyan-400 text-sm cursor-pointer hover:text-cyan-300">
                    {isZh ? '点击查看答案' : 'Click to see answer'}
                  </summary>
                  <p className="text-slate-400 text-xs mt-1">
                    {isZh 
                      ? '这说明球面各个方向的弯曲程度完全相同（都是1/r）！这就是为什么球面被称为"全脐"的——它是最对称的曲面之一。'
                      : 'This means the sphere bends equally in all directions (all 1/r)! This is why spheres are called "totally umbilical"—they are among the most symmetric surfaces.'}
                  </p>
                </details>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between">
          <Link
            to="/chapter/1"
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors"
          >
            ← {t('common.prev')}
          </Link>
          <Link
            to="/chapter/3"
            className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white transition-colors"
          >
            {t('common.next')}: {t('chapters.ch3.title')} →
          </Link>
        </div>
      </div>
    </div>
  );
}
