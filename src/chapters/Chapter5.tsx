import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MathBlock, Math } from '../components';

export default function Chapter5() {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <p className="text-cyan-400 text-sm mb-2">{t('nav.chapter', { num: 5 })}</p>
        <h1 className="text-3xl font-bold text-white mb-2">{t('chapters.ch5.title')}</h1>
        <p className="text-slate-400">{t('chapters.ch5.subtitle')}</p>
        <div className="mt-4 bg-gradient-to-r from-cyan-900/50 to-purple-900/50 rounded-lg p-3 border border-cyan-700">
          <p className="text-cyan-300 text-sm">
            📄 {isZh 
              ? '本章基于：Chen, B.-Y. & Li, S.-J. (2004). "The Contact Number of a Euclidean Submanifold", Proc. Edinburgh Math. Soc., 47, 69-100'
              : 'Based on: Chen, B.-Y. & Li, S.-J. (2004). "The Contact Number of a Euclidean Submanifold", Proc. Edinburgh Math. Soc., 47, 69-100'}
          </p>
        </div>
      </header>

      <div className="space-y-8">
        {/* Section 5.1 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '5.1 曲线的"接触"是什么意思？' : '5.1 What Does "Contact" Between Curves Mean?'}
          </h2>

          {/* Intuitive analogy */}
          <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-4 border border-yellow-700 mb-4">
            <p className="text-yellow-400 font-semibold mb-2">
              🚗 {isZh ? '开车类比' : 'Driving Analogy'}
            </p>
            <p className="text-slate-300 text-sm mb-2">
              {isZh 
                ? '想象两辆车在高速公路上：'
                : 'Imagine two cars on a highway:'}
            </p>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• <span className="text-cyan-400">{isZh ? '0阶' : '0th order'}</span>: {isZh ? '两车在同一地点' : 'Both cars at the same location'}</li>
              <li>• <span className="text-cyan-400">{isZh ? '1阶' : '1st order'}</span>: {isZh ? '同一地点 + 同一速度方向' : 'Same location + same velocity direction'}</li>
              <li>• <span className="text-cyan-400">{isZh ? '2阶' : '2nd order'}</span>: {isZh ? '同一地点 + 同一速度 + 同一加速度' : 'Same location + same velocity + same acceleration'}</li>
              <li>• <span className="text-purple-400">{isZh ? 'k阶' : 'kth order'}</span>: {isZh ? '前k个运动特征都相同！' : 'First k motion characteristics all the same!'}</li>
            </ul>
          </div>
          
          <p className="text-slate-300 mb-4">
            {isZh 
              ? '两条曲线可以以不同的"紧密程度"接触。接触阶数越高，它们在接触点附近越"像"：'
              : 'Two curves can be in contact with different degrees of "closeness". Higher contact order means they are more "similar" near the contact point:'}
          </p>

          <div className="space-y-3 mb-4">
            <div className="bg-slate-800 rounded-lg p-4 flex items-start gap-4">
              <span className="bg-slate-700 text-cyan-400 rounded-full w-8 h-8 flex items-center justify-center font-bold">0</span>
              <div>
                <p className="text-white font-semibold">{isZh ? '0阶接触' : '0th order contact'}</p>
                <p className="text-slate-400 text-sm">{isZh ? '两条曲线在一点相遇（如两条路交叉）' : 'Two curves meet at a point (like two roads crossing)'}</p>
              </div>
            </div>
            
            <div className="bg-slate-800 rounded-lg p-4 flex items-start gap-4">
              <span className="bg-slate-700 text-cyan-400 rounded-full w-8 h-8 flex items-center justify-center font-bold">1</span>
              <div>
                <p className="text-white font-semibold">{isZh ? '1阶接触' : '1st order contact'}</p>
                <p className="text-slate-400 text-sm">{isZh ? '相同切线方向（如高速公路和匝道的切点）' : 'Same tangent direction (like highway and ramp tangent point)'}</p>
              </div>
            </div>
            
            <div className="bg-slate-800 rounded-lg p-4 flex items-start gap-4">
              <span className="bg-slate-700 text-cyan-400 rounded-full w-8 h-8 flex items-center justify-center font-bold">2</span>
              <div>
                <p className="text-white font-semibold">{isZh ? '2阶接触' : '2nd order contact'}</p>
                <p className="text-slate-400 text-sm">{isZh ? '相同曲率（弯曲程度一样，如完美贴合的齿轮）' : 'Same curvature (same bending, like perfectly meshing gears)'}</p>
              </div>
            </div>
            
            <div className="bg-slate-800 rounded-lg p-4 flex items-start gap-4">
              <span className="bg-slate-700 text-purple-400 rounded-full w-8 h-8 flex items-center justify-center font-bold">k</span>
              <div>
                <p className="text-white font-semibold">{isZh ? 'k阶接触' : 'kth order contact'}</p>
                <p className="text-slate-400 text-sm">{isZh ? '前k阶导数相等（几乎无法区分！）' : 'First k derivatives equal (almost indistinguishable!)'}</p>
              </div>
            </div>
          </div>

          {/* DNA analogy */}
          <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 rounded-lg p-4 border border-green-700 mb-4">
            <p className="text-green-400 font-semibold mb-2">
              🧬 {isZh ? 'DNA类比' : 'DNA Analogy'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '就像DNA测序：两段DNA序列越长的相同前缀，它们的关系越近。接触阶数就像是"几何DNA"的匹配长度！'
                : 'Like DNA sequencing: the longer the matching prefix of two DNA sequences, the more closely related they are. Contact order is like the matching length of "geometric DNA"!'}
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-4">
            <p className="text-cyan-300 font-semibold mb-2">
              {isZh ? '数学定义' : 'Mathematical Definition'}
            </p>
            <p className="text-slate-300 mb-2">
              {isZh 
                ? '两条曲线γ和β在点p处有k阶接触，当且仅当：'
                : 'Two curves γ and β have k-th order contact at point p if and only if:'}
            </p>
            <MathBlock>{'\\gamma^{(i)}(0) = \\beta^{(i)}(0) \\quad \\text{for } i = 1, 2, \\ldots, k'}</MathBlock>
          </div>
        </section>

        {/* Section 5.2 - THE DEFINITION */}
        <section className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-xl p-6 border-2 border-red-700">
          <h2 className="text-xl font-semibold text-red-400 mb-4">
            ⭐ {isZh ? '5.2 接触数的正式定义' : '5.2 Formal Definition of Contact Number'}
          </h2>

          {/* Key insight analogy */}
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-4 border border-blue-700 mb-4">
            <p className="text-blue-400 font-semibold mb-2">
              🔍 {isZh ? '核心洞察：两个"自我"的比较' : 'Core Insight: Comparing Two "Selves"'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '想象流形M是一个人。测地线γ是"内心的自己"——完全由内在决定（只关心流形本身）。法截面β是"别人眼中的自己"——由外部视角决定（依赖于嵌入方式）。接触数测量这两个"自我"有多一致！'
                : 'Imagine manifold M is a person. Geodesic γ is the "inner self"—determined entirely from within (only cares about the manifold itself). Normal section β is "how others see you"—determined by external perspective (depends on embedding). Contact number measures how consistent these two "selves" are!'}
            </p>
          </div>
          
          <p className="text-slate-300 mb-4">
            {isZh 
              ? '对于子流形M上的每一点p和单位切向量u，我们有两条特殊的曲线：'
              : 'For each point p on submanifold M and unit tangent vector u, we have two special curves:'}
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-900 rounded-lg p-4 border-l-4 border-cyan-500">
              <h3 className="text-cyan-400 font-semibold mb-2">
                {isZh ? '测地线' : 'Geodesic'} <Math>{'\\gamma_u'}</Math>
              </h3>
              <p className="text-slate-300 text-sm mb-2">
                {isZh 
                  ? '流形M上从p出发沿u方向的测地线'
                  : 'The geodesic on M starting from p in direction u'}
              </p>
              <p className="text-yellow-400 text-xs mb-1">
                🏠 {isZh ? '内蕴视角：只看流形本身' : 'Intrinsic view: only looks at the manifold'}
              </p>
              <p className="text-slate-500 text-xs">
                {isZh ? '例：蚂蚁沿"直线"爬行的路径' : 'Example: path of an ant crawling "straight"'}
              </p>
            </div>
            
            <div className="bg-slate-900 rounded-lg p-4 border-l-4 border-pink-500">
              <h3 className="text-pink-400 font-semibold mb-2">
                {isZh ? '法截面' : 'Normal Section'} <Math>{'\\beta_u'}</Math>
              </h3>
              <p className="text-slate-300 text-sm mb-2">
                {isZh 
                  ? '仿射子空间E(p,u)与M的交线'
                  : 'Intersection of affine subspace E(p,u) with M'}
              </p>
              <p className="text-yellow-400 text-xs mb-1">
                🌍 {isZh ? '外蕴视角：从外部切割流形' : 'Extrinsic view: cutting the manifold from outside'}
              </p>
              <p className="text-slate-500 text-xs">
                {isZh ? '例：用平面切一个球，得到一个圆' : 'Example: slicing a sphere with a plane to get a circle'}
              </p>
            </div>
          </div>

          {/* Real example */}
          <div className="bg-slate-900 rounded-lg p-4 mb-4">
            <p className="text-green-400 font-semibold mb-2">
              🌐 {isZh ? '例子：地球上的"直线"' : 'Example: "Straight Lines" on Earth'}
            </p>
            <p className="text-slate-300 text-sm mb-2">
              {isZh 
                ? '假设你从北京向正东方向"直走"：'
                : 'Suppose you walk "straight" due east from Beijing:'}
            </p>
            <ul className="text-slate-400 text-sm space-y-1">
              <li>• <span className="text-cyan-400">{isZh ? '测地线' : 'Geodesic'}</span>: {isZh ? '你会沿着大圆走，最终回到北京！' : "You'll follow a great circle and eventually return to Beijing!"}</li>
              <li>• <span className="text-pink-400">{isZh ? '法截面' : 'Normal section'}</span>: {isZh ? '纬线圈（用水平面切地球）——这不是测地线！' : 'Latitude circle (slice Earth with horizontal plane)—this is NOT a geodesic!'}</li>
            </ul>
            <p className="text-slate-300 text-sm mt-2">
              {isZh 
                ? '在大多数点上，这两条曲线是不同的。但在某些特殊的流形上，它们可以非常"接近"——这就是高接触数的含义！'
                : 'At most points, these two curves differ. But on some special manifolds, they can be very "close"—this is what high contact number means!'}
            </p>
          </div>

          <div className="bg-slate-900 rounded-lg p-4 mb-4 border-2 border-yellow-600">
            <p className="text-yellow-400 font-bold mb-3 text-lg">
              📖 Definition 1.1 (Chen-Li, 2004)
            </p>
            
            <div className="space-y-4 text-slate-300">
              <p>
                {isZh 
                  ? '子流形M在(p, u)处是k阶接触，如果：'
                  : 'Submanifold M is in contact of order k at (p, u) if:'}
              </p>
              <MathBlock>{'\\gamma_u^{(i)}(0) = \\beta_u^{(i)}(0) \\quad \\text{for } i = 1, 2, \\ldots, k'}</MathBlock>
              
              <p>
                {isZh 
                  ? 'M是k阶接触，如果对所有 (p, u) ∈ UM 成立。'
                  : 'M is in contact of order k if this holds for all (p, u) ∈ UM.'}
              </p>
              
              <div className="bg-slate-800 rounded-lg p-3 mt-4">
                <p className="text-cyan-400 font-semibold mb-2">
                  {isZh ? '接触数 c#(M) 定义为：' : 'Contact Number c#(M) is defined as:'}
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>
                    <Math>{'c^\\#(M) = k'}</Math> {isZh 
                      ? '如果M是k阶接触但不是(k+1)阶接触'
                      : 'if M is in contact of order k but not k+1'}
                  </li>
                  <li>
                    <Math>{'c^\\#(M) = \\infty'}</Math> {isZh 
                      ? '如果M对所有k都是k阶接触'
                      : 'if M is in contact of order k for all k'}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5.3 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '5.3 为什么接触数至少为2？' : '5.3 Why is Contact Number at Least 2?'}
          </h2>
          
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-green-400 font-semibold mb-3">
              {isZh ? '定理：任何子流形的接触数 c#(M) ≥ 2' : 'Theorem: For any submanifold, c#(M) ≥ 2'}
            </p>
            
            <div className="space-y-3 text-slate-300">
              <p className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span><Math>{'\\gamma_u(0) = \\beta_u(0) = p'}</Math> — {isZh ? '0阶' : '0th order'}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span><Math>{'\\gamma_u\'(0) = \\beta_u\'(0) = u'}</Math> — {isZh ? '1阶' : '1st order'}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span><Math>{'\\gamma_u\'\'(0) = \\beta_u\'\'(0)'}</Math> — {isZh ? '2阶（需要证明）' : '2nd order (needs proof)'}</span>
              </p>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-4">
            <p className="text-cyan-300 font-semibold mb-2">
              {isZh ? '证明思路' : 'Proof Sketch'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '利用第二基本形式h，可以证明二阶导数相等。这是因为测地线和法截面在原点处具有相同的二阶Taylor展开。'
                : 'Using the second fundamental form h, we can prove the second derivatives are equal. This is because the geodesic and normal section have the same second-order Taylor expansion at the origin.'}
            </p>
          </div>
        </section>

        {/* Section 5.4 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '5.4 接触数与第二基本形式的深层联系' : '5.4 Deep Connection with Second Fundamental Form'}
          </h2>
          
          <div className="space-y-4">
            <div className="bg-slate-800 rounded-lg p-4">
              <p className="text-purple-400 font-semibold mb-2">
                {isZh ? '接触数 ≥ 3 的条件' : 'Condition for Contact Number ≥ 3'}
              </p>
              <p className="text-slate-300 text-sm mb-2">
                {isZh 
                  ? '涉及h(u,u)的性质：'
                  : 'Involves properties of h(u,u):'}
              </p>
              <MathBlock>{'\\langle h(u,u), h(u,v) \\rangle = 0 \\quad \\text{for orthogonal } u, v'}</MathBlock>
            </div>
            
            <div className="bg-slate-800 rounded-lg p-4">
              <p className="text-purple-400 font-semibold mb-2">
                {isZh ? '接触数 ≥ 4 的条件' : 'Condition for Contact Number ≥ 4'}
              </p>
              <p className="text-slate-300 text-sm mb-2">
                {isZh 
                  ? '涉及h的高阶协变导数：'
                  : 'Involves higher covariant derivatives of h:'}
              </p>
              <MathBlock>{'A_{(\\bar{\\nabla}h)(u^3)} u = 0'}</MathBlock>
            </div>

            <div className="bg-gradient-to-r from-cyan-900/50 to-purple-900/50 rounded-lg p-4 border border-cyan-700">
              <p className="text-cyan-400 font-semibold mb-2">
                💡 {isZh ? '核心洞察' : 'Core Insight'}
              </p>
              <p className="text-slate-300">
                {isZh 
                  ? '接触数越高，子流形的几何结构越"对称"。这种对称性通过第二基本形式及其导数的特殊性质来体现。'
                  : 'Higher contact number means more "symmetric" geometric structure. This symmetry is manifested through special properties of the second fundamental form and its derivatives.'}
              </p>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between">
          <Link
            to="/chapter/4"
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors"
          >
            ← {t('common.prev')}
          </Link>
          <Link
            to="/chapter/6"
            className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white transition-colors"
          >
            {t('common.next')}: {t('chapters.ch6.title')} →
          </Link>
        </div>
      </div>
    </div>
  );
}
