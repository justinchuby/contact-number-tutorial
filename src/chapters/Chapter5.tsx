import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MathBlock, Math } from '../components';
import { ContactNumberVizWithControls } from '../visualizations';
import ContactPaperLink from '../components/ContactPaperLink';

export default function Chapter5() {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="chapter-anchor" aria-hidden="true">🔢</span>
          <p className="text-cyan-400 text-sm">{t('nav.chapter', { num: 5 })}</p>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">{t('chapters.ch5.title')}</h1>
        <p className="text-slate-400">{t('chapters.ch5.subtitle')}</p>
        <div className="mt-4 bg-gradient-to-r from-cyan-900/50 to-purple-900/50 rounded-lg p-3 border border-amber-900/20">
          <p className="text-cyan-300 text-sm">{isZh
              ? '本章基于：Chen, B.-Y. & Li, S.-J. (2004). "The Contact Number of a Euclidean Submanifold", Proc. Edinburgh Math. Soc., 47, 69-100'
              : 'Based on: Chen, B.-Y. & Li, S.-J. (2004). "The Contact Number of a Euclidean Submanifold", Proc. Edinburgh Math. Soc., 47, 69-100'}
          </p>
        </div>
      </header>

      <div className="space-y-8">
        {/* Section 5.1 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 id="section-5.1" className="text-xl font-semibold text-cyan-400 mb-4">{isZh ? '5.1 曲线的"接触"是什么意思？' : '5.1 What Does "Contact" Between Curves Mean?'}
          </h2>

          {/* Intuitive analogy */}
          <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-4 border border-amber-900/20 mb-4">
            <p className="text-yellow-400 font-semibold mb-2">{isZh ? '🏎️ 物理类比：从速度到加速度' : '🏎️ Physics Analogy: From Velocity to Acceleration'}
            </p>
            <p className="text-slate-300 text-sm mb-3">{isZh
                ? '想象两辆车从同一个起跑线出发，我们用越来越精密的仪器去比较它们的运动：'
                : 'Imagine two cars starting from the same line. We compare their motion with increasingly precise instruments:'}
            </p>
            <ul className="text-slate-300 text-sm space-y-2">
              <li>• <span className="text-cyan-400">{isZh ? '0阶' : '0th order'}</span>: {isZh ? '两车在同一地点（位置相同）' : 'Both cars at the same location'}</li>
              <li>• <span className="text-cyan-400">{isZh ? '1阶' : '1st order'}</span>: {isZh ? '速度方向相同（朝着同一个方向前进）' : 'Same velocity direction (heading the same way)'}</li>
              <li>• <span className="text-cyan-400">{isZh ? '2阶' : '2nd order'}</span>: {isZh ? '加速度相同——方向盘打的角度一样，乘客感受到的离心力完全相同' : 'Same acceleration—steering angle is identical, passengers feel the same centripetal force'}</li>
              <li>• <span className="text-purple-400">{isZh ? '3阶' : '3rd order'}</span>: {isZh ? '加速度的变化率也相同——转动方向盘的平顺度一模一样（物理学中叫"jerk"）' : 'Same rate of change of acceleration—the smoothness of turning the steering wheel is identical (called "jerk" in physics)'}</li>
              <li>• <span className="text-purple-400">{isZh ? 'k阶' : 'kth order'}</span>: {isZh ? '用越来越高倍的"显微镜"观察，两辆车的运动在越来越精微的层面上都无法区分！' : 'With an ever more powerful "microscope", the cars\' motion becomes indistinguishable at increasingly fine levels!'}</li>
            </ul>
          </div>

          <p className="text-slate-300 mb-4">{isZh
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

          {/* Kissing + DNA analogy */}
          <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 rounded-lg p-4 border border-amber-900/20 mb-4">
            <p className="text-green-400 font-semibold mb-2">{isZh ? '两条曲线的"亲吻"' : 'Two Curves "Kissing"'}
            </p>
            <p className="text-slate-300 text-sm mb-2">{isZh
                ? '接触阶数衡量的就是两条曲线在接触点处"亲吻"的紧密程度。0阶只是嘴唇轻轻碰到，1阶是方向一致的接吻，2阶是连弯曲弧度都完美贴合……阶数越高，越难分出哪里是一条曲线的结束，哪里是另一条的开始。'
                : 'Contact order measures how tightly two curves "kiss" at their meeting point. 0th order is barely touching lips, 1st order means the same direction, 2nd order means even the curvature matches perfectly... The higher the order, the harder it is to tell where one curve ends and the other begins.'}
            </p>
            <p className="text-slate-300 text-sm">{isZh
                ? '另一个类比：就像DNA比对。把两条曲线的泰勒展开式一项一项排开比较——每成功匹配一阶导数，就像DNA序列多匹配了一个碱基对。匹配长度越长，两条曲线的"亲缘关系"越近！'
                : 'Another analogy: like DNA comparison. Line up the Taylor expansions term by term—each matched derivative is like matching another base pair. The longer the match, the closer the "kinship"!'}
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-4">
            <p className="text-cyan-300 font-semibold mb-2">{isZh ? '数学定义' : 'Mathematical Definition'}
            </p>
            <p className="text-slate-300 mb-2">{isZh
                ? '两条曲线γ和β在点p处有k阶接触，当且仅当：'
                : 'Two curves γ and β have k-th order contact at point p if and only if:'}
            </p>
            <MathBlock>{'\\gamma^{(i)}(0) = \\beta^{(i)}(0) \\quad \\text{for } i = 1, 2, \\ldots, k'}</MathBlock>
          </div>
        </section>

        {/* Section 5.2 - THE DEFINITION */}
        <section className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-xl p-6 border-2 border-amber-900/20">
          <h2 id="section-5.2" className="text-xl font-semibold text-red-400 mb-4">{isZh ? '5.2 接触数的正式定义' : '5.2 Formal Definition of Contact Number'}
          </h2>
          <p className="mb-4"><ContactPaperLink reference={isZh ? '定义 1.1，第 70 页' : 'Definition 1.1, p. 70'} /></p>

          {/* Key insight analogy */}
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-4 border border-amber-900/20 mb-4">
            <p className="text-blue-400 font-semibold mb-2">{isZh ? '核心洞察：山坡居民 vs 上帝视角' : 'Core Insight: Hillside Resident vs God\'s View'}
            </p>
            <p className="text-slate-300 text-sm">{isZh
                ? '想象你站在一个光滑的山坡上。作为山坡上的居民，你凭感觉走出最"直"的路——这就是测地线γ，完全由脚下的地形决定。现在换成上帝视角：你拿一把巨大的无限薄的刀，垂直于地面，沿着你前进的方向把山坡切开。刀面与山坡相交形成的曲线就是法截线β。接触数测量的就是：在你出发的那一瞬间，这条"内在之路"和"外在切片之路"的贴合程度到底有多高？'
                : 'Imagine standing on a smooth hillside. As a resident, you walk the "straightest" path you can feel—that\'s the geodesic γ, determined entirely by the terrain beneath your feet. Now switch to God\'s view: take a giant, infinitely thin knife, hold it perpendicular to the ground, and slice along your direction of travel. The curve where knife meets hillside is the normal section β. Contact number measures: at the moment of departure, how closely do this "inner path" and "outer slice path" match?'}
            </p>
          </div>

          <p className="text-slate-300 mb-4">{isZh
              ? '对于子流形M上的每一点p和单位切向量u，我们有两条特殊的曲线：'
              : 'For each point p on submanifold M and unit tangent vector u, we have two special curves:'}
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-900 rounded-lg p-4 border-l-4 border-amber-700/45">
              <h3 className="text-cyan-400 font-semibold mb-2">{isZh ? '测地线' : 'Geodesic'} <Math>{'\\gamma_u'}</Math>
              </h3>
              <p className="text-slate-300 text-sm mb-2">{isZh
                  ? '流形M上从p出发沿u方向的测地线'
                  : 'The geodesic on M starting from p in direction u'}
              </p>
              <p className="text-yellow-400 text-xs mb-1">{isZh ? '内蕴视角：只看流形本身' : 'Intrinsic view: only looks at the manifold'}
              </p>
              <p className="text-slate-500 text-xs">{isZh ? '例：蚂蚁沿"直线"爬行的路径' : 'Example: path of an ant crawling "straight"'}
              </p>
            </div>

            <div className="bg-slate-900 rounded-lg p-4 border-l-4 border-amber-700/45">
              <h3 className="text-pink-400 font-semibold mb-2">{isZh ? '法截线' : 'Normal Section'} <Math>{'\\beta_u'}</Math>
              </h3>
              <p className="text-slate-300 text-sm mb-2">{isZh
                  ? '仿射子空间E(p,u)与M的交线'
                  : 'Intersection of affine subspace E(p,u) with M'}
              </p>
              <p className="text-yellow-400 text-xs mb-1">{isZh ? '外蕴视角：从外部切割流形' : 'Extrinsic view: cutting the manifold from outside'}
              </p>
              <p className="text-slate-500 text-xs">{isZh ? '例：用平面切一个球，得到一个圆' : 'Example: slicing a sphere with a plane to get a circle'}
              </p>
            </div>
          </div>

          {/* Real example */}
          <div className="bg-slate-900 rounded-lg p-4 mb-4">
            <p className="text-green-400 font-semibold mb-2">{isZh ? '例子：椭球面（回顾第四章）' : 'Example: Ellipsoid (Recall Chapter 4)'}
            </p>
            <p className="text-slate-300 text-sm mb-2">{isZh
                ? '回忆第四章中椭球面的例子。在椭球面上选一个点，沿某方向出发：'
                : 'Recall the ellipsoid example from Chapter 4. Pick a point on an ellipsoid and head in some direction:'}
            </p>
            <ul className="text-slate-400 text-sm space-y-1">
              <li>• <span className="text-cyan-400">{isZh ? '测地线' : 'Geodesic'}</span>: {isZh ? '椭球面上"最直"的路径——由曲面自身形状决定，在椭球上通常不是平面曲线' : 'The "straightest" path on the ellipsoid—determined by surface shape, usually not a planar curve on an ellipsoid'}</li>
              <li>• <span className="text-pink-400">{isZh ? '法截线' : 'Normal section'}</span>: {isZh ? '用包含法向量和切向量的平面切椭球得到的椭圆' : 'Ellipse from cutting the ellipsoid with the plane spanned by the normal and tangent vectors'}</li>
            </ul>
            <p className="text-slate-300 text-sm mt-2">{isZh
                ? '在椭球的大多数方向上，这两条曲线是不同的（正如第四章可视化所示）。但在某些特殊的流形上，它们可以非常"接近"——这就是高接触数的含义！'
                : 'In most directions on an ellipsoid, these two curves differ (as shown in Chapter 4\'s visualization). But on some special manifolds, they can be very "close"—this is what high contact number means!'}
            </p>
          </div>

          <div className="bg-slate-900 rounded-lg p-4 mb-4 border-2 border-yellow-600">
            <p className="text-yellow-400 font-bold mb-3 text-lg">
              Definition 1.1 (Chen-Li, 2004)
            </p>

            <div className="space-y-4 text-slate-300">
              <p>{isZh
                  ? '子流形M在(p, u)处是k阶接触，如果：'
                  : 'Submanifold M is in contact of order k at (p, u) if:'}
              </p>
              <MathBlock>{'\\gamma_u^{(i)}(0) = \\beta_u^{(i)}(0) \\quad \\text{for } i = 1, 2, \\ldots, k'}</MathBlock>

              <p>{isZh
                  ? 'M是k阶接触，如果对所有 (p, u) ∈ UM 成立。'
                  : 'M is in contact of order k if this holds for all (p, u) ∈ UM.'}
              </p>

              <div className="bg-slate-800 rounded-lg p-3 mt-4">
                <p className="text-cyan-400 font-semibold mb-2">{isZh ? '接触数 c#(M) 定义为：' : 'Contact Number c#(M) is defined as:'}
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>
                    <Math>{'c^\\#(M) = k'}</Math>{isZh
                      ? '如果M是k阶接触但不是(k+1)阶接触'
                      : 'if M is in contact of order k but not k+1'}
                  </li>
                  <li>
                    <Math>{'c^\\#(M) = \\infty'}</Math>{isZh
                      ? '如果M对所有k都是k阶接触'
                      : 'if M is in contact of order k for all k'}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-3 mb-4 text-sm">
            <p className="text-slate-400">{isZh
                ? <>注意：这里的子流形 M 是欧氏空间 E<sup>m</sup> 中的<strong className="text-slate-200">嵌入</strong>子流形（即 M 是 E<sup>m</sup> 的子集，没有自交）。法截线的定义需要用仿射子空间"切割" M，这要求 M 没有自交点。由于浸入在局部都是嵌入，接触数在局部意义上也适用于浸入。</>
                : <>Note: Here M is an <strong className="text-slate-200">embedded</strong> submanifold in E<sup>m</sup> (i.e., M is a subset of E<sup>m</sup> without self-intersections). The normal section definition requires intersecting M with an affine subspace, which needs M to have no self-intersections. Since immersions are locally embeddings, contact number applies locally to immersions as well.</>}
            </p>
          </div>
        </section>

        {/* Interactive visualization - after concepts are introduced */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 id="section-5-cylinder" className="text-xl font-semibold text-cyan-400 mb-4">{isZh ? '圆柱实验：比较两条曲线' : 'Cylinder experiment: Compare the curves'}
          </h2>
          <ContactNumberVizWithControls />
        </section>

        {/* Section 5.3 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 id="section-5.3" className="text-xl font-semibold text-cyan-400 mb-4">{isZh ? '5.3 接触数至少为2' : '5.3 Contact Number is at Least 2'}
          </h2>

          {/* Theorem statement first */}
          <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-lg p-4 border-2 border-green-600 mb-4">
            <p className="text-green-400 font-bold text-lg mb-2">{isZh ? '定理 (Chen-Li)' : 'Theorem (Chen-Li)'}
            </p>
            <p className="mb-3"><ContactPaperLink reference={isZh ? '定理 4.1(1)，第 74 页' : 'Theorem 4.1(1), p. 74'} /></p>
            <p className="text-slate-200">{isZh
                ? '对于欧氏空间中的任何子流形 M（dim ≥ 2），接触数满足：'
                : 'For any submanifold M (dim ≥ 2) in Euclidean space, the contact number satisfies:'}
            </p>
            <MathBlock>{'c^{\\#}(M) \\geq 2'}</MathBlock>
            <p className="text-slate-300 text-sm">{isZh
                ? '也就是说，测地线和法截线至少有前两阶导数相同。这是一个普遍成立的结果——不依赖于流形的特殊性质。'
                : 'That is, geodesics and normal sections always agree up to at least the 2nd derivative. This holds universally—independent of any special properties of the manifold.'}
            </p>
          </div>

          {/* Why question */}
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-yellow-400 font-semibold mb-3">{isZh ? '为什么？让我们逐阶分析：' : 'Why? Let\'s analyze order by order:'}
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

          {/* Detailed Proof */}
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-4 border border-amber-900/20 mb-4">
            <p className="text-blue-400 font-semibold mb-3">{isZh ? '详细证明' : 'Detailed Proof'}
            </p>

            <div className="space-y-4 text-slate-300 text-sm">
              {/* Step 1 */}
              <div>
                <p className="text-cyan-400 font-semibold mb-1">{isZh ? '第一步：0阶和1阶为什么相等？' : 'Step 1: Why are 0th and 1st order equal?'}</p>
                <p>{isZh
                    ? '这是由定义直接保证的！测地线 γ_u 和法截线 β_u 都是从同一点 p 出发、沿同一方向 u 前进的曲线。所以：'
                    : 'This is guaranteed directly by definition! Both geodesic γ_u and normal section β_u start from the same point p and move in direction u. So:'}
                </p>
                <ul className="list-disc list-inside ml-4 mt-1">
                  <li><Math>{'\\gamma_u(0) = p = \\beta_u(0)'}</Math>{isZh ? '（起点相同）' : '(same starting point)'}</li>
                  <li><Math>{'\\gamma_u\'(0) = u = \\beta_u\'(0)'}</Math>{isZh ? '（初始方向相同）' : '(same initial direction)'}</li>
                </ul>
              </div>

              {/* Step 2 */}
              <div>
                <p className="text-cyan-400 font-semibold mb-1">{isZh ? '第二步：二阶导数是什么？' : 'Step 2: What is the second derivative?'}</p>
                <p>{isZh
                    ? '对于任意曲线 c(t)，二阶导数 c\'\'(t) 就是加速度——曲线在该点如何"转弯"。在微分几何中，这与曲线的曲率密切相关。'
                    : 'For any curve c(t), the second derivative c\'\'(t) is acceleration—how the curve "turns" at that point. In differential geometry, this relates to the curve\'s curvature.'}
                </p>
              </div>

              {/* Step 3 */}
              <div>
                <p className="text-cyan-400 font-semibold mb-1">{isZh ? '第三步：计算测地线的二阶导数' : 'Step 3: Compute geodesic\'s second derivative'}</p>
                <p>{isZh
                    ? '测地线的定义是"最短路径"，但等价于：沿测地线走，加速度没有切向分量——你不会在流形上"转弯"。数学上：'
                    : 'A geodesic is defined as "shortest path", but equivalently: walking along it, acceleration has no tangential component—you don\'t "turn" on the manifold. Mathematically:'}
                </p>
                <MathBlock>{`\\nabla_{\\gamma'} \\gamma' = 0 \\quad \\text{${isZh ? '（测地线方程）' : '(geodesic equation)'}}`}</MathBlock>
                <p className="mt-2">{isZh
                    ? '但这是在流形上的导数（∇）。在外部空间ℝ^m中，测地线的加速度是：'
                    : 'But this is the derivative on the manifold (∇). In ambient space ℝ^m, the geodesic\'s acceleration is:'}
                </p>
                <MathBlock>{`\\gamma_u''(0) = h(u, u)`}</MathBlock>
                <p className="mt-1 text-slate-400">{isZh
                    ? '这就是第二基本形式！它测量曲线如何"偏离"流形的切平面。'
                    : 'This is the second fundamental form! It measures how the curve "deviates" from the tangent plane.'}
                </p>
              </div>

              {/* Step 4 */}
              <div>
                <p className="text-cyan-400 font-semibold mb-1">{isZh ? '第四步：计算法截线的二阶导数' : 'Step 4: Compute normal section\'s second derivative'}</p>
                <p>{isZh
                    ? '法截线 β_u 是一条平面曲线：它是子流形 M 与某个平面 π（由 u 和法向量张成）的交集。'
                    : 'Normal section β_u is a plane curve: it\'s the intersection of M with a plane π (spanned by u and normal vectors).'}
                </p>
                <p className="mt-2">{isZh
                    ? '在这个平面 π 中，β_u 的曲率向量（二阶导数）就是它离开切方向 u 的程度。由于 β_u 本身就在 M 上，这个"离开程度"正好是：'
                    : 'In plane π, the curvature vector (second derivative) of β_u is how much it deviates from direction u. Since β_u lies on M, this "deviation" is exactly:'}
                </p>
                <MathBlock>{`\\beta_u''(0) = h(u, u)`}</MathBlock>
              </div>

              {/* Step 5 */}
              <div className="bg-green-900/30 rounded p-3 border border-amber-900/20">
                <p className="text-green-400 font-semibold mb-1">{isZh ? '结论' : 'Conclusion'}</p>
                <p>{isZh
                    ? '因此 γ_u\'\'(0) = h(u,u) = β_u\'\'(0)，二阶导数总是相等！这证明了接触阶数至少为2。'
                    : 'Therefore γ_u\'\'(0) = h(u,u) = β_u\'\'(0), second derivatives are always equal! This proves contact order is at least 2.'}
                </p>
                <MathBlock>{`c^{\\#}(M) \\geq 2 \\quad \\text{✓}`}</MathBlock>
              </div>
            </div>
          </div>

          {/* Intuition */}
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-yellow-400 font-semibold mb-2">{isZh ? '直观理解' : 'Intuitive Understanding'}
            </p>
            <p className="text-slate-300 text-sm">{isZh
                ? '回到山坡的比喻：无论这个山坡长得多么奇形怪状，在你出发的那一刻，你作为居民感觉最直的路和上帝视角切出来的路，不仅前进方向一致，连弯曲程度都完全一样。真正有趣的差异要从第三阶才开始——也就是"转方向盘的平顺度"开始不同。所以接触数至少是2。'
                : 'Back to the hillside: no matter how strangely shaped the hillside is, at the moment of departure, the "straightest path" felt by the resident and the "slice path" from God\'s view not only head the same direction, but bend the same way too. Real differences only begin at third order—the "smoothness of turning the wheel" starts to differ. Hence contact number is at least 2.'}
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-4 border border-amber-900/20">
            <p className="text-purple-400 font-semibold mb-2">{isZh ? '关键要点' : 'Key Takeaway'}
            </p>
            <p className="text-slate-300 text-sm">{isZh
                ? '接触数是一个全局性的数字，它描述的是整个曲面的固有几何品性。它对曲面上的每一点、每一个方向提问："你的内在直路和外在切片之路能在多高阶上保持一致？"然后取其中最保守的答案。既然所有光滑子流形的接触数都至少为2，那真正精彩的故事就从接触数等于3开始了！'
                : 'Contact number is a global number describing the intrinsic geometric character of the entire surface. It asks every point in every direction: "how closely do your inner path and outer slice path match?" and takes the most conservative answer. Since all smooth submanifolds have c# ≥ 2, the truly exciting story begins at contact number 3!'}
            </p>
          </div>
        </section>

        {/* Section 5.4 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 id="section-5.4" className="text-xl font-semibold text-cyan-400 mb-4">{isZh ? '5.4 接触数与第二基本形式的深层联系' : '5.4 Deep Connection with Second Fundamental Form'}
          </h2>

          {/* Why second fundamental form */}
          <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-4 border border-amber-900/20 mb-4">
            <p className="text-yellow-400 font-semibold mb-2">{isZh ? '为什么接触数和第二基本形式有关？' : 'Why is Contact Number Related to Second Fundamental Form?'}
            </p>
            <p className="text-slate-300 text-sm">{isZh
                ? '第二基本形式h测量子流形如何"弯曲地嵌入"外部空间。而接触数比较测地线（内蕴）和法截线（外蕴）的差异。两者都涉及"内蕴vs外蕴"的比较，所以它们通过第二基本形式联系起来是自然的！'
                : 'The second fundamental form h measures how the submanifold "curves into" ambient space. Contact number compares geodesic (intrinsic) with normal section (extrinsic). Both involve "intrinsic vs extrinsic" comparison, so their connection through h is natural!'}
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-800 rounded-lg p-4">
              <p className="text-purple-400 font-semibold mb-2">{isZh ? '接触数 ≥ 3 的条件' : 'Condition for Contact Number ≥ 3'}
              </p>
              <p className="text-slate-300 text-sm mb-2">{isZh
                  ? '涉及h(u,u)的性质（各向同性条件）：'
                  : 'Involves properties of h(u,u) (isotropy condition):'}
              </p>
              <MathBlock>{'\\langle h(u,u), h(u,v) \\rangle = 0 \\quad \\text{for orthogonal } u, v'}</MathBlock>
              <p className="text-slate-400 text-sm mt-2">{isZh ? '→ 下一章将详细解释这是"各向同性"条件' : '→ Next chapter will explain this is the "isotropy" condition'}
              </p>
            </div>

            <div className="bg-slate-800 rounded-lg p-4">
              <p className="text-purple-400 font-semibold mb-2">{isZh ? '接触数 ≥ 4 的条件' : 'Condition for Contact Number ≥ 4'}
              </p>
              <p className="text-slate-300 text-sm mb-2">{isZh
                  ? '涉及h的高阶协变导数（常各向同性条件）：'
                  : 'Involves higher covariant derivatives of h (constant isotropy condition):'}
              </p>
              <MathBlock>{'A_{(\\bar{\\nabla}h)(u^3)} u = 0'}</MathBlock>
              <p className="text-slate-400 text-sm mt-2">{isZh ? '→ 下一章将解释这是"常各向同性"条件' : '→ Next chapter will explain this is the "constant isotropy" condition'}
              </p>
            </div>

            <div className="bg-gradient-to-r from-cyan-900/50 to-purple-900/50 rounded-lg p-4 border border-amber-900/20">
              <p className="text-cyan-400 font-semibold mb-2">{isZh ? '核心洞察' : 'Core Insight'}
              </p>
              <p className="text-slate-300">{isZh
                  ? '接触数越高，子流形的几何结构越"对称"。这种对称性通过第二基本形式及其导数的特殊性质来体现。'
                  : 'Higher contact number means more "symmetric" geometric structure. This symmetry is manifested through special properties of the second fundamental form and its derivatives.'}
              </p>
            </div>
          </div>
        </section>

        {/* Why study contact number */}
        <section className="bg-gradient-to-r from-green-900/30 to-teal-900/30 rounded-xl p-6 border border-amber-900/20">
          <h2 className="text-xl font-semibold text-green-400 mb-4">{isZh ? '为什么研究接触数？' : 'Why Study Contact Number?'}
          </h2>

          <div className="space-y-3 text-slate-300">
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">①</span>
              <div>
                <p className="font-semibold">{isZh ? '分类工具' : 'Classification Tool'}</p>
                <p className="text-sm text-slate-400">{isZh ? '接触数给子流形一个"评分"，可以按此分类研究' : 'Contact number gives submanifolds a "score" for classification'}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">②</span>
              <div>
                <p className="font-semibold">{isZh ? '测量对称性' : 'Measuring Symmetry'}</p>
                <p className="text-sm text-slate-400">{isZh ? '高接触数意味着更"对称"的嵌入方式' : 'Higher contact number means more "symmetric" embedding'}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">③</span>
              <div>
                <p className="font-semibold">{isZh ? '连接不同几何' : 'Connecting Geometries'}</p>
                <p className="text-sm text-slate-400">{isZh ? '桥接内蕴几何和外蕴几何的研究' : 'Bridges intrinsic and extrinsic geometry research'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Chapter Summary */}
        <section className="bg-gradient-to-r from-green-900/50 to-cyan-900/50 rounded-xl p-6 border border-amber-900/20">
          <h2 className="text-xl font-semibold text-green-400 mb-4">{isZh ? '本章小结' : 'Chapter Summary'}
          </h2>
          <ul className="text-slate-300 text-sm space-y-2">
            <li>✓ {isZh ? '接触阶数：两条曲线在接触点处前k阶导数相等' : 'Contact order: two curves have first k derivatives equal at contact point'}</li>
            <li>✓ {isZh ? '接触数c#(M)：测地线γ_u和法截线β_u在所有(p,u)处的最小接触阶数' : 'Contact number c#(M): minimum contact order of geodesic γ_u and normal section β_u over all (p,u)'}</li>
            <li>✓ {isZh ? '任何子流形c# ≥ 2（二阶导数总是相等）' : 'Any submanifold has c# ≥ 2 (2nd derivatives always equal)'}</li>
            <li>✓ {isZh ? '接触数通过第二基本形式h的性质刻画' : 'Contact number is characterized by properties of second fundamental form h'}</li>
            <li>✓ {isZh ? '高接触数 = 更"对称"的几何结构' : 'Higher contact number = more "symmetric" geometric structure'}</li>
          </ul>

          {/* Thinking Questions */}
          <div className="mt-6 bg-slate-900 rounded-lg p-4">
            <p className="text-yellow-400 font-semibold mb-3">{isZh ? '思考题' : 'Questions to Think About'}
            </p>
            <div className="space-y-3">
              <div>
                <p className="text-slate-300 text-sm">{isZh
                    ? '1. 如果一个子流形的接触数是∞，这在几何上意味着什么？'
                    : '1. If a submanifold has contact number ∞, what does this mean geometrically?'}
                </p>
                <details className="mt-1">
                  <summary className="text-cyan-400 text-sm cursor-pointer hover:text-cyan-300">{isZh ? '点击查看答案' : 'Click to see answer'}
                  </summary>
                  <p className="text-slate-400 text-xs mt-1">{isZh
                      ? 'c# = ∞ 意味着测地线和法截线在每一点都完全重合！这种子流形的内蕴几何和外蕴几何完美一致——它以最"自然"的方式嵌入外部空间。'
                      : 'c# = ∞ means geodesics and normal sections coincide completely at every point! The intrinsic and extrinsic geometry are in perfect agreement—the submanifold is embedded in the most "natural" way possible.'}
                  </p>
                </details>
              </div>
              <div>
                <p className="text-slate-300 text-sm">{isZh
                    ? '2. 为什么我们要取"最小接触阶数"来定义c#(M)？'
                    : '2. Why do we take the "minimum contact order" to define c#(M)?'}
                </p>
                <details className="mt-1">
                  <summary className="text-cyan-400 text-sm cursor-pointer hover:text-cyan-300">{isZh ? '点击查看答案' : 'Click to see answer'}
                  </summary>
                  <p className="text-slate-400 text-xs mt-1">{isZh
                      ? '因为我们想刻画整个子流形的"全局"性质。如果某个方向的接触阶数较低，说明那里的几何"不够对称"。取最小值确保我们捕捉到了最"差"的情况，这才能真正反映子流形的几何本质。'
                      : 'Because we want to characterize a "global" property of the entire submanifold. If some direction has lower contact order, it means geometry is "less symmetric" there. Taking minimum ensures we capture the "worst" case, which truly reflects the geometric essence of the submanifold.'}
                  </p>
                </details>
              </div>
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
          >{t('common.next')}: {t('chapters.ch6.title')} →
          </Link>
        </div>
      </div>
    </div>
  );
}
