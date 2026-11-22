import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ContactPaperLink from '../components/ContactPaperLink';
import { MathBlock, Tooltip } from '../components';
import { PseudoUmbilicalViz, NonSphericalPUViz } from '../visualizations';

export default function Chapter7() {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="chapter-anchor" aria-hidden="true">🧩</span>
          <p className="text-cyan-400 text-sm">{t('nav.chapter', { num: 7 })}</p>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">{t('chapters.ch7.title')}</h1>
        <p className="text-slate-400">{t('chapters.ch7.subtitle')}</p>
      </header>

      <div className="space-y-8">
        {/* Chapter Overview */}
        <section className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-6 border border-amber-900/20">
          <h2 className="text-xl font-semibold text-purple-400 mb-4">{isZh ? '本章概览' : 'Chapter Overview'}
          </h2>
          <p className="text-slate-300 mb-4">{isZh
              ? '本章介绍Chen-Li论文的具体分类定理和重大发现。我们将看到接触数理论如何给出子流形的完整分类，以及如何发现新的几何对象。'
              : 'This chapter presents specific classification theorems and major discoveries from Chen-Li\'s paper. We\'ll see how contact number theory provides complete classifications of submanifolds and leads to discovering new geometric objects.'}
          </p>
          <div className="grid md:grid-cols-3 gap-3">
            <div className="bg-slate-800 rounded-lg p-3 text-center">
              <div className="text-xs font-serif tracking-[0.18em] text-teal-800/70 mb-1">§</div>
              <p className="text-slate-300 text-sm">{isZh ? '余维数2分类' : 'Codim-2 Classification'}</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-3 text-center">
              <div className="text-xs font-serif tracking-[0.18em] text-teal-800/70 mb-1">§</div>
              <p className="text-slate-300 text-sm">{isZh ? '全纯曲线' : 'Holomorphic Curves'}</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-3 text-center">
              <div className="text-xs font-serif tracking-[0.18em] text-teal-800/70 mb-1">§</div>
              <p className="text-slate-300 text-sm">{isZh ? 'Pseudo-umbilical发现' : 'Pseudo-umbilical Discovery'}</p>
            </div>
          </div>
        </section>

        {/* Section 7.1 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 id="section-7.1" className="text-xl font-semibold text-cyan-400 mb-4">{isZh ? '7.1 余维数为2的子流形分类' : '7.1 Classification of Codimension-2 Submanifolds'}
          </h2>

          <p className="text-slate-300 mb-4">{isZh
              ? '当余维数（codimension = m - n）为2时，即子流形嵌入的"额外维度"只有2个，Chen-Li给出了完整的分类：'
              : 'When codimension (= m - n) is 2, meaning the submanifold is embedded with only 2 "extra dimensions", Chen-Li provide a complete classification:'}
          </p>

          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">{isZh ? '定理 (Chen-Li)' : 'Theorem (Chen-Li)'}
            </p>
            <p className="mb-3"><ContactPaperLink reference={isZh ? '定理 5.1，第 76 页' : 'Theorem 5.1, p. 76'} /></p>
            <p className="text-slate-300 text-sm">{isZh
                ? '设 M 是 E^(n+2) 中的 n 维子流形，c#(M) ≥ 3。则 M 是以下之一：'
                : 'Let M be an n-dimensional submanifold of E^(n+2) with c#(M) ≥ 3. Then M is one of:'}
            </p>
            <ul className="text-slate-300 text-sm mt-2 space-y-1 list-disc list-inside">
              <li>{isZh ? 'n = 2，M 是 C² 中的非平面全纯曲线，c# = 3。这里的 C² 来自 E⁴ 上的某个正交复结构。' : 'For n = 2, a non-planar holomorphic curve in C² with c# = 3, for some orthogonal complex structure on E⁴.'}</li>
              <li>{isZh ? 'n 维仿射平面的开子集，c# = ∞。' : 'An open subset of an affine n-plane, with c# = ∞.'}</li>
              <li>{isZh ? '位于某个超平面内的 n 维球面的开子集，c# = ∞。' : 'An open subset of an n-sphere lying in a hyperplane, with c# = ∞.'}</li>
            </ul>
          </div>

          {/* Why codim 2 */}
          <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-lg p-4 border border-amber-900/20 mb-4">
            <p className="text-blue-400 font-semibold mb-2">{isZh ? '为什么是余维数2？' : 'Why Codimension 2?'}
            </p>
            <p className="text-slate-300 text-sm">{isZh
                ? '余维数2是一个"甜蜜点"：足够复杂以产生有趣的现象，又足够简单可以完全分类。余维数1（超曲面）太特殊，余维数≥3则太复杂。'
                : 'Codimension 2 is a "sweet spot": complex enough for interesting phenomena, yet simple enough for complete classification. Codim 1 (hypersurfaces) is too special, codim ≥3 is too complex.'}
            </p>
          </div>

          {/* Examples of the three cases */}
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-purple-400 font-semibold mb-2">{isZh ? '为什么余维数为 2 时还有全纯曲线？' : 'Where do holomorphic curves fit in codimension 2?'}
            </p>
            <p className="text-slate-300 text-sm">{isZh
                ? '例如 z ↦ (z, z²) 只用一个复参数，但一个复参数有两个实自由度。因此它在四维实空间 E⁴ 中是一张二维曲面，余维数正好为 2。'
                : 'For example, z ↦ (z, z²) uses one complex parameter, which has two real degrees of freedom. It gives a real surface in E⁴, of codimension 2.'}
            </p>
          </div>
        </section>

        {/* Section 7.2 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 id="section-7.2" className="text-xl font-semibold text-cyan-400 mb-4">{isZh ? '7.2 E⁶中的曲面' : '7.2 Surfaces in E⁶'}
          </h2>

          <p className="text-slate-300 mb-4">{isZh
              ? 'Chen-Li特别研究了6维欧氏空间中的曲面（2维子流形）。这里余维数为4，几何更加丰富。'
              : 'Chen-Li specifically studied surfaces (2-dimensional submanifolds) in 6-dimensional Euclidean space. Here codimension is 4, and geometry is richer.'}
          </p>

          {/* Why E6 */}
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-green-400 font-semibold mb-2">{isZh ? '为什么研究E⁶？' : 'Why Study E⁶?'}
            </p>
            <p className="text-slate-300 text-sm mb-3">{isZh
                ? 'E⁶ = ℝ⁶ 可以看作 C³（3维复空间）：'
                : 'E⁶ = ℝ⁶ can be viewed as C³ (3-dimensional complex space):'}
            </p>
            <div className="bg-slate-700 rounded-lg p-3 mb-3">
              <p className="text-slate-300 text-sm">
                (x₁, y₁, x₂, y₂, x₃, y₃) ↔ (x₁ + iy₁, x₂ + iy₂, x₃ + iy₃) = (z₁, z₂, z₃) ∈ C³
              </p>
            </div>
            <p className="text-slate-400 text-sm">{isZh
                ? '这建立了与复几何的深刻联系。曲面在C³中的行为与全纯函数理论相关。'
                : 'This establishes deep connections with complex geometry. Surface behavior in C³ relates to holomorphic function theory.'}
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-4">
            <p className="text-cyan-300 font-semibold mb-2">{isZh ? '定理：c# ≥ 4 的曲面' : 'Theorem: Surfaces with c# ≥ 4'}
            </p>
            <p className="text-slate-300 text-sm">{isZh
                ? 'E⁶ 中 c# ≥ 4 的曲面必须是常各向同性的，且具有非常特殊的几何结构。这些曲面的第二基本形式满足严格的代数约束。'
                : 'Surfaces in E⁶ with c# ≥ 4 must be constant isotropic and have very special geometric structure. The second fundamental form of these surfaces satisfies strict algebraic constraints.'}
            </p>
            <p className="mt-3 text-slate-300 text-sm">{isZh
                ? '若曲面还具有常平均曲率或常高斯曲率，原文进一步给出分类，此时接触数只有 4 或 ∞。'
                : 'With constant mean curvature or constant Gaussian curvature, the paper gives a further classification. The contact number is then either 4 or ∞.'}
            </p>
            <p className="mt-3"><ContactPaperLink reference={isZh ? '定理 7.1，第 84–85 页' : 'Theorem 7.1, pp. 84–85'} /></p>
          </div>
        </section>

        {/* Section 7.3 - Major discovery */}
        <section className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-xl p-6 border-2 border-yellow-600">
          <h2 id="section-7.3" className="text-xl font-semibold text-yellow-400 mb-4">{isZh ? '7.3 重大发现：首例非球面 Pseudo-Umbilical 曲面' : '7.3 Major Discovery: First Non-Spherical Pseudo-Umbilical Surfaces'}
          </h2>
          <p className="mb-4"><ContactPaperLink reference={isZh ? '第 10 节，公式 (10.20) 与备注 10.2，第 96–99 页' : 'Section 10, Eq. (10.20) and Remark 10.2, pp. 96–99'} /></p>

          <div className="space-y-4">
            {/* Umbilical review */}
            <div className="bg-slate-900 rounded-lg p-4">
              <h3 className="text-blue-400 font-semibold mb-2">{isZh ? '前置知识：什么是脐点（Umbilical Point）？' : 'Prerequisite: What is an Umbilical Point?'}
              </h3>
              <p className="text-slate-300 text-sm mb-3">{isZh
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
              <p className="text-slate-400 text-sm mt-2">{isZh
                  ? '全脐子流形（totally umbilical）= 每个点都是脐点 → c# = ∞'
                  : 'Totally umbilical submanifold = every point is umbilical → c# = ∞'}
              </p>
            </div>

            {/* Pseudo-umbilical definition */}
            <div className="bg-slate-900 rounded-lg p-4">
              <h3 className="text-cyan-400 font-semibold mb-2">{isZh ? '什么是 Pseudo-Umbilical（伪脐）？' : 'What is Pseudo-Umbilical?'}
              </h3>
              <p className="text-slate-300 text-sm mb-3">{isZh
                  ? 'Pseudo-umbilical 是比 umbilical 更弱的条件，只要求沿平均曲率向量H方向的形状算子是恒等映射的倍数。'
                  : 'Pseudo-umbilical is weaker than umbilical, only requiring the shape operator in mean curvature direction H to be a scalar multiple of identity.'}
              </p>
              <div className="bg-slate-800 rounded-lg p-3 mb-3">
                <p className="text-yellow-400 font-semibold mb-1">{isZh ? '数学定义' : 'Mathematical Definition'}</p>
                <MathBlock>{'A_H = \\lambda \\cdot I'}</MathBlock>
                <p className="text-slate-400 text-xs mt-1">{isZh
                    ? 'A_H 是沿 H 方向的形状算子，I 是恒等映射，λ 是逐点的比例因子。'
                    : 'A_H is the shape operator in the H direction, I is the identity, and λ is a pointwise scalar.'}
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
              <h3 className="text-red-400 font-semibold mb-2">{isZh ? '历史背景：之前的困境' : 'Historical Context: Previous Dilemma'}
              </h3>
              <p className="text-slate-300 text-sm">{isZh
                  ? '欧氏空间中的极小曲面，以及在超球面内极小的曲面，都提供了伪脐曲面的例子。Chen 和 Li 研究了这两类之外的例子。'
                  : 'Minimal surfaces in Euclidean space and surfaces that are minimal in a hypersphere both give examples of pseudo-umbilical surfaces. Chen and Li studied examples outside these two classes.'}
              </p>
              <p className="text-yellow-400 text-sm mt-2 italic">
                {isZh ? '能否显式构造既不极小、也不在任何超球面内极小的伪脐曲面？' : 'Can we explicitly construct a pseudo-umbilical surface that is neither minimal nor minimal in a hypersphere?'}
              </p>
            </div>

            {/* Breakthrough */}
            <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-lg p-4 border border-green-600">
              <h3 className="text-green-400 font-semibold mb-2">{isZh ? 'Chen-Li的突破' : 'Chen-Li\'s Breakthrough'}
              </h3>
              <p className="text-slate-300 text-sm mb-3">{isZh
                  ? 'Chen-Li构造出了显式的非球面pseudo-umbilical曲面例子！'
                  : 'Chen-Li constructed explicit examples of non-spherical pseudo-umbilical surfaces!'}
              </p>
              <ul className="text-slate-300 text-sm space-y-2">
                <li>• {isZh ? '论文中的这些例子构造于 E⁶ 中' : 'The paper constructs these examples in E⁶'}</li>
                <li>• {isZh ? '它们是c# = 4的常各向同性曲面' : 'They are constant isotropic surfaces with c# = 4'}</li>
                <li>• {isZh ? '证明了pseudo-umbilical性质不蕴含球面性质' : 'Proved pseudo-umbilical does NOT imply spherical'}</li>
                <li>• {isZh ? '这是接触数理论的一个重要应用' : 'This is an important application of contact number theory'}</li>
              </ul>
            </div>

            {/* Donut in 6D */}
            <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 rounded-lg p-4 border border-amber-900/20">
              <p className="text-green-400 font-semibold mb-2">{isZh ? '甜甜圈的"变身"' : 'The Donut\'s Transformation'}
              </p>
              <p className="text-slate-300 text-sm">{isZh
                  ? '一个普通的三维空间里的甜甜圈（环面），接触数并不高。为什么？因为在甜甜圈的内圈，曲率像马鞍面一样；在外圈，曲率是正的，像球面。不同位置的弯曲完全不同，当然不是常各向同性的。但Chen-Li发现，把这个甜甜圈放进六维空间，用一种特殊的方式让它弯曲和折叠，就能精确调整它的几何属性，使得它处处对称（各向同性）、对称程度处处相等（常各向同性），但又没有完美到让测地线和法截线完全重合。结果：接触数不多不少，正好是4。'
                  : 'An ordinary donut (torus) in 3D doesn\'t have a high contact number. Why? Because at the inner ring, curvature is saddle-like; at the outer ring, it\'s positive like a sphere. Bending varies wildly—definitely not constant isotropic. But Chen-Li discovered that by placing this donut into 6D and bending it in a special way, they could precisely tune its geometry to be isotropic everywhere, with equal isotropy at every point, yet not so perfect that geodesics and normal sections completely coincide. Result: contact number is exactly 4.'}
              </p>
            </div>

            {/* How Contact Number Helped */}
            <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-4 border border-amber-900/20">
              <h3 className="text-yellow-400 font-semibold mb-3">{isZh ? '接触数理论如何帮助发现？' : 'How Did Contact Number Theory Help?'}
              </h3>

              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-cyan-400 font-semibold mb-1">{isZh ? '1. 提供新视角' : '1. Provided New Perspective'}</p>
                  <p className="text-slate-300">{isZh
                      ? 'Chen-Li 发现 c# ≥ 3 等价于各向同性条件。这意味着可以用接触数来"筛选"具有特殊对称性的子流形。'
                      : 'Chen-Li discovered c# ≥ 3 is equivalent to isotropy condition. This means contact number can "filter" submanifolds with special symmetry.'}
                  </p>
                </div>

                <div>
                  <p className="text-cyan-400 font-semibold mb-1">{isZh ? '2. 揭示关键联系' : '2. Revealed Key Connections'}</p>
                  <p className="text-slate-300">{isZh
                      ? 'Pseudo-umbilical 条件要求形状算子 A_H = λI，这与接触数 c# ≥ 3 密切相关。但 c# = 3 或 4 的曲面不一定是球面！'
                      : 'Pseudo-umbilical requires shape operator A_H = λI, closely related to c# ≥ 3. But surfaces with c# = 3 or 4 are not necessarily spheres!'}
                  </p>
                </div>

                <div>
                  <p className="text-cyan-400 font-semibold mb-1">{isZh ? '3. 指明构造方向' : '3. Pointed to Construction Path'}</p>
                  <p className="text-slate-300">{isZh
                      ? 'Chen 和 Li 先研究 E⁶ 中具有指定接触数的曲面，再用相应的微分方程构造出显式例子。'
                      : 'Chen and Li first studied surfaces in E⁶ with prescribed contact number, then used the resulting differential equations to construct explicit examples.'}
                  </p>
                </div>

                <div className="bg-slate-800 rounded p-3 mt-2">
                  <p className="text-green-400 font-semibold mb-1">{isZh ? '关键洞察' : 'Key Insight'}</p>
                  <p className="text-slate-300">{isZh
                      ? '接触数理论不只是分类工具——它能指导新对象的构造！同一个框架既解释了为什么低维不行（必须是球面），又指出了高维的可能性（余维数 ≥ 4 时可以非球面）。'
                      : 'Contact number theory is not just a classification tool—it guides construction of new objects! The same framework explains why lower dimensions fail (must be spheres) and points to higher dimensional possibilities (non-spherical when codim ≥ 4).'}
                  </p>
                </div>
              </div>
            </div>

            {/* Why important */}
            <div className="bg-slate-900 rounded-lg p-4">
              <h3 className="text-purple-400 font-semibold mb-2">{isZh ? '为什么这个发现重要？' : 'Why is This Discovery Important?'}
              </h3>
              <p className="text-slate-300 text-sm">{isZh
                  ? '这个发现展示了接触数理论的威力：它不仅能分类已知对象，还能发现新的几何对象！高维空间中存在我们在低维无法想象的几何结构。'
                  : 'This discovery demonstrates the power of contact number theory: it not only classifies known objects but also discovers new geometric objects! Higher dimensional spaces contain geometric structures we cannot imagine in lower dimensions.'}
              </p>
            </div>

            {/* What does it look like - NEW SECTION */}
            <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-lg p-4 border border-amber-900/20">
              <h3 className="text-cyan-400 font-semibold mb-3">{isZh ? '非球面 Pseudo-Umbilical 曲面长什么样？' : 'What Do Non-Spherical Pseudo-Umbilical Surfaces Look Like?'}
              </h3>

              <p className="text-slate-300 text-sm mb-4">{isZh
                  ? '这是一个很好的问题！由于这些曲面存在于6维空间中，我们无法直接"看到"它们。但我们可以通过以下方式理解：'
                  : 'Great question! Since these surfaces exist in 6-dimensional space, we cannot directly "see" them. But we can understand them through:'}
              </p>

              {/* Analogy 1 */}
              <div className="bg-slate-800 rounded-lg p-3 mb-3">
                <p className="text-yellow-400 font-semibold mb-2">{isZh ? '🎈 类比1：变形但不裂开的气球' : '🎈 Analogy 1: Deformed But Unbroken Balloon'}
                </p>
                <p className="text-slate-300 text-sm mb-2">{isZh
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
                <p className="text-green-400 text-xs mt-2">{isZh
                    ? '就像一个气球被特殊力量拉扯变形，但在某个特定方向看过去，它仍然"各处一样"！'
                    : 'Like a balloon deformed by special forces, but from a specific direction, it still "looks uniform everywhere"!'}
                </p>
              </div>

              {/* Analogy 2 */}
              <div className="bg-slate-800 rounded-lg p-3 mb-3">
                <p className="text-purple-400 font-semibold mb-2">{isZh ? '🌊 类比2：高维空间中的"波浪"' : '🌊 Analogy 2: "Waves" in High Dimensions'}
                </p>
                <p className="text-slate-300 text-sm">{isZh
                    ? '在E³中，曲面弯曲只能"向上或向下"（只有1个法方向）。在E⁶中，曲面有4个独立的法方向可以弯曲！Chen-Li的曲面像是：'
                    : 'In E³, surfaces can only bend "up or down" (just 1 normal direction). In E⁶, surfaces have 4 independent normal directions to bend! Chen-Li\'s surface is like:'}
                </p>
                <ul className="text-slate-400 text-xs space-y-1 ml-4 mt-2">
                  <li>• {isZh ? '在某些法方向上弯曲得像球（均匀）' : 'Bending like a sphere (uniform) in some normal directions'}</li>
                  <li>• {isZh ? '在其他法方向上弯曲得不均匀（像马鞍或波浪）' : 'Bending non-uniformly in other directions (like saddle or waves)'}</li>
                  <li>• {isZh ? '但"平均"起来恰好满足pseudo-umbilical条件！' : 'But "on average" it exactly satisfies the pseudo-umbilical condition!'}</li>
                </ul>
              </div>

              <div className="bg-slate-800 rounded-lg p-3">
                <p className="text-green-400 font-semibold mb-2">{isZh ? '从两个参数到六个坐标' : 'From two parameters to six coordinates'}
                </p>
                <p className="text-slate-300 text-sm mb-2">{isZh
                    ? '公式 (10.20) 用两个实参数 (u, v) 计算六个坐标。下方的交互图把这六个坐标投影到三维。切换投影可以从不同方向观察同一个曲面。'
                    : 'Equation (10.20) computes six coordinates from two real parameters (u, v). The interactive figure below projects those coordinates into three dimensions. Switching projections gives different views of the same surface.'}
                </p>
              </div>

              {/* Take-away */}
              <div className="mt-4 p-3 bg-yellow-900/30 border border-amber-900/20 rounded-lg">
                <p className="text-yellow-400 font-semibold text-sm">{isZh ? '直观总结' : 'Intuitive Summary'}
                </p>
                <p className="text-slate-300 text-sm mt-1">{isZh
                    ? '在这个例子中，沿平均曲率向量 H 测得的弯曲与切方向无关。其他法方向还保留了更多关于曲面嵌入方式的信息。'
                    : 'In this example, the bending measured along the mean curvature vector H is independent of the tangent direction. Other normal directions retain more information about the immersion.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Visualization: Pseudo-umbilical torus from paper */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">{isZh ? '可视化：论文中的平坦环面 τₐ (Example 6.6)' : 'Visualization: Flat Torus τₐ from the Paper (Example 6.6)'}
          </h2>
          <p className="text-slate-300 text-sm mb-3">{isZh
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
              <p className="text-slate-400 text-xs">{isZh
                  ? '在3维空间中，环面的弯曲在内圈和外圈完全不同，无法实现常各向同性。6维空间提供了4个法方向，足以"隐藏"这种不均匀性。'
                  : 'In 3D, a torus bends differently on inner and outer rings—impossible to be constant isotropic. 6D provides 4 normal directions, enough to "hide" this non-uniformity.'}
              </p>
            </div>
            <div className="bg-slate-800 rounded p-3">
              <p className="text-cyan-400 font-semibold mb-1">{isZh ? '青色曲线' : 'Cyan Curve'}</p>
              <p className="text-slate-400 text-xs">{isZh
                  ? '青色线条是环面上的一条测地线（u-参数曲线）的投影。在这个平坦环面上，测地线就是"直线"——但投影到3维后看起来是弯曲的。'
                  : 'The cyan line is a geodesic (u-parameter curve) on the torus, projected to 3D. On this flat torus, geodesics are "straight"—but appear curved when projected to 3D.'}
              </p>
            </div>
          </div>
        </section>

        {/* Visualization: Non-spherical pseudo-umbilical surface (10.20) */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-orange-400 mb-4">{isZh ? '可视化：首例非球面 Pseudo-Umbilical 曲面 (公式 10.20)' : 'Visualization: First Non-Spherical Pseudo-Umbilical Surface (Formula 10.20)'}
          </h2>
          <p className="text-slate-300 text-sm mb-3">{isZh
              ? <>这是 Chen–Li 论文第 10 节所给出的<strong className="text-orange-400">非球面伪脐曲面</strong>的三维投影。它把 S²(√3/a) 的一个开子集等距浸入 E⁶，具有<strong>非平行的平均曲率向量</strong>，也不包含在任何超球面中。</>
              : <>This is a 3D projection of the <strong className="text-orange-400">non-spherical pseudo-umbilical surface</strong> from Section 10 of Chen–Li. It is an isometric immersion of an open subset of S²(√3/a) into E⁶, with <strong>non-parallel mean curvature vector</strong>, and it lies in no hypersphere.</>}
          </p>
          <div className="bg-slate-800 rounded-lg p-3 mb-3 overflow-x-auto">
            <MathBlock>{String.raw`\psi(u,v) = \cos^2\!\frac{au}{\sqrt{3}} \cdot \begin{pmatrix} \frac{\sqrt{3}}{a}\tan\!\frac{au}{\sqrt{3}}\cos\!\frac{av}{\sqrt{3}} \\[4pt] \frac{\sqrt{3}}{a}\tan\!\frac{au}{\sqrt{3}}\sin\!\frac{av}{\sqrt{3}} \\[4pt] \text{(振荡项 } \sin/\cos \text{ 组合)} \\[4pt] \vdots \end{pmatrix}`}</MathBlock>
            <MathBlock>{String.raw`\beta = \frac{2(a^2+6c^2)}{3},\quad \delta = \frac{2}{3}\sqrt{a^4+6a^2c^2+36c^4},\quad a=1,\; c=0.5`}</MathBlock>
          </div>
          <NonSphericalPUViz />
          <div className="mt-3 grid md:grid-cols-2 gap-3 text-sm">
            <div className="bg-slate-800 rounded p-3">
              <p className="text-orange-400 font-semibold mb-1">{isZh ? '为什么这个例子重要？' : 'Why is This Example Important?'}</p>
              <p className="text-slate-400 text-xs">{isZh
                  ? '论文的备注 10.2 指出，这些是首批显式构造的伪脐曲面，既不在欧氏空间中极小，也不在任何超球面内极小。'
                  : 'Remark 10.2 identifies these as the first explicit pseudo-umbilical examples that are neither minimal in Euclidean space nor minimal in any hypersphere.'}
              </p>
            </div>
            <div className="bg-slate-800 rounded p-3">
              <p className="text-green-400 font-semibold mb-1">{isZh ? '绿色曲线' : 'Green Curve'}</p>
              <p className="text-slate-400 text-xs">{isZh
                  ? <>绿色线条是曲面"赤道"(u=0)处的曲线投影。注意这个曲面不是封闭的——它是<Tooltip term="open-subset-image">S²的一个开子集的像</Tooltip>，在两极(u→±√3π/2a)处趋于无穷。</>
                  : <>The green line is the projection of the "equator" curve (u=0). Note this surface is not closed—it's the <Tooltip term="open-subset-image">image of an open subset of S²</Tooltip>, approaching infinity near the poles.</>}
              </p>
            </div>
          </div>
        </section>

        {/* Section 7.4 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 id="section-7.4" className="text-xl font-semibold text-cyan-400 mb-4">{isZh ? '7.4 与复几何的联系' : '7.4 Connection with Complex Geometry'}
          </h2>

          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">{isZh ? '全纯曲线定理回顾' : 'Holomorphic Curve Theorem Review'}
            </p>
            <p className="text-slate-300 text-sm">{isZh
                ? '曲面 M² ⊂ E⁴ = C² 满足 c#(M) = 3 当且仅当 M 是非平面全纯曲线。'
                : 'A surface M² ⊂ E⁴ = C² has c#(M) = 3 if and only if M is a non-planar holomorphic curve.'}
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-4">
            <p className="text-purple-400 font-semibold mb-2">{isZh ? '意义：数学的统一' : 'Significance: Unity of Mathematics'}
            </p>
            <p className="text-slate-300 text-sm">{isZh
                ? '这个定理在微分几何和复分析之间架起了桥梁。接触数3的条件完全等价于曲面满足Cauchy-Riemann方程！这说明看似不同的数学分支其实深刻地联系在一起。'
                : 'This theorem bridges differential geometry and complex analysis. The contact number 3 condition is completely equivalent to the surface satisfying Cauchy-Riemann equations! This shows seemingly different mathematical branches are deeply connected.'}
            </p>
          </div>
        </section>

        {/* Chapter Summary */}
        <section className="bg-gradient-to-r from-green-900/50 to-cyan-900/50 rounded-xl p-6 border border-amber-900/20">
          <h2 className="text-xl font-semibold text-green-400 mb-4">
            ✓ {isZh ? '本章小结' : 'Chapter Summary'}
          </h2>
          <ul className="text-slate-300 text-sm space-y-2">
            <li>✓ {isZh ? '余维数为 2 且 c# ≥ 3 时，只有三类：平面的开子集、球面的开子集、C² 中的非平面全纯曲线。' : 'In codimension 2, c# ≥ 3 gives exactly three cases: open subsets of planes or spheres, and non-planar holomorphic curves in C².'}</li>
            <li>✓ {isZh ? 'Pseudo-umbilical：沿H方向的形状算子是恒等的倍数' : 'Pseudo-umbilical: shape operator in H direction is scalar multiple of identity'}</li>
            <li>✓ {isZh ? 'Chen-Li发现了首例非球面pseudo-umbilical曲面（在E⁶中）' : 'Chen-Li discovered first non-spherical pseudo-umbilical surfaces (in E⁶)'}</li>
            <li>✓ {isZh ? '接触数理论不仅分类已知对象，还能发现新几何对象' : 'Contact number theory not only classifies known objects but discovers new ones'}</li>
            <li>✓ {isZh ? '接触数就像几何世界的"元素周期表"——每个数对应一类独特的几何"物种"，而表上还有大量位置等待发现' : 'Contact number is like a "periodic table" for geometry—each number corresponds to a unique geometric "species", with many positions still awaiting discovery'}</li>
          </ul>
          <div className="mt-6 bg-slate-900 rounded-lg p-4">
            <p className="text-yellow-400 font-semibold mb-3">{isZh ? '思考题' : 'Questions to Think About'}
            </p>
            <div className="space-y-3">
              <div>
                <p className="text-slate-300 text-sm">{isZh
                    ? '1. E⁶ 中的曲面有几个独立的法方向？伪脐条件约束其中哪个方向？'
                    : '1. How many independent normal directions does a surface in E⁶ have, and which one does pseudo-umbilicity constrain?'}
                </p>
                <details className="mt-1">
                  <summary className="text-cyan-400 text-sm cursor-pointer hover:text-cyan-300">{isZh ? '点击查看答案' : 'Click to see answer'}
                  </summary>
                  <p className="text-slate-400 text-xs mt-1">{isZh
                      ? '法空间是四维的。伪脐条件要求平均曲率向量 H 对应的形状算子是恒等映射的倍数。'
                      : 'The normal space is four-dimensional. Pseudo-umbilicity requires the shape operator associated with H to be a scalar multiple of the identity.'}
                  </p>
                </details>
              </div>
              <div>
                <p className="text-slate-300 text-sm">{isZh
                    ? '2. 为什么一条复曲线在 E⁴ 中是实曲面？'
                    : '2. Why is a complex curve in E⁴ a real surface?'}
                </p>
                <details className="mt-1">
                  <summary className="text-cyan-400 text-sm cursor-pointer hover:text-cyan-300">{isZh ? '点击查看答案' : 'Click to see answer'}
                  </summary>
                  <p className="text-slate-400 text-xs mt-1">{isZh
                      ? '局部参数 z = x + iy 提供两个独立的实方向；只要参数化在该点是浸入，就得到一张实二维曲面。'
                      : 'The local parameter z = x + iy gives two independent real directions. At an immersed point, this gives a real two-dimensional surface.'}
                  </p>
                </details>
              </div>
            </div>
          </div>
        </section>

        {/* Citation */}
        <section className="bg-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-slate-400 mb-4">{isZh ? '论文引用' : 'Paper Citation'}
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
          <Link to="/chapter/8" className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white transition-colors">{t('common.next')}: {t('chapters.ch8.title')} →
          </Link>
        </div>
      </div>
    </div>
  );
}
