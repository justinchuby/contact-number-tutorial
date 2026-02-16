import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
// Math components not used here

export default function Chapter11() {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded">{isZh ? '学术传承' : 'Academic Legacy'}</span>
          <p className="text-cyan-400 text-sm">{t('nav.chapter', { num: 11 })}</p>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">{t('chapters.ch11.title')}</h1>
        <p className="text-slate-400">{t('chapters.ch11.subtitle')}</p>
      </header>

      <div className="space-y-8">
        {/* Chapter Overview */}
        <section className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-xl p-6 border border-purple-700">
          <h2 className="text-xl font-semibold text-purple-400 mb-4">
            📋 {isZh ? '本章概览' : 'Chapter Overview'}
          </h2>
          <p className="text-slate-300 mb-4">
            {isZh 
              ? '学术研究不是孤立的——每一项工作都会启发后来者的探索。本章展示Chen-Li接触数理论以及李世杰教授其他工作如何影响了数学界，以及这些想法如何被后续研究者发展和推广。'
              : 'Academic research isn\'t isolated—each work inspires further exploration. This chapter shows how Chen-Li\'s contact number theory and Prof. Li\'s other work influenced mathematics, and how these ideas were developed and extended by later researchers.'}
          </p>
          <div className="grid md:grid-cols-4 gap-3">
            <div className="bg-slate-800 rounded-lg p-3 text-center">
              <div className="text-2xl mb-1">🌐</div>
              <p className="text-slate-300 text-xs">{isZh ? '伪欧氏推广' : 'Pseudo-Euclidean'}</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-3 text-center">
              <div className="text-2xl mb-1">📐</div>
              <p className="text-slate-300 text-xs">{isZh ? '高接触数曲面' : 'High Contact'}</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-3 text-center">
              <div className="text-2xl mb-1">🎓</div>
              <p className="text-slate-300 text-xs">{isZh ? '学术传承' : 'Academic Legacy'}</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-3 text-center">
              <div className="text-2xl mb-1">📅</div>
              <p className="text-slate-300 text-xs">{isZh ? '研究时间线' : 'Timeline'}</p>
            </div>
          </div>
        </section>

        {/* How research evolves */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-slate-400 mb-4">
            🔄 {isZh ? '数学研究如何发展' : 'How Mathematical Research Evolves'}
          </h2>
          <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-lg p-4 border border-blue-700 mb-4">
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '一项数学研究的影响通常表现在几个方面：(1) 概念被推广到更广泛的情形；(2) 方法被应用到新的问题；(3) 结果被其他研究者引用和发展；(4) 形成新的研究方向。Chen-Li的接触数理论在这些方面都有体现。'
                : 'A mathematical work\'s impact typically manifests in several ways: (1) concepts are generalized to broader settings; (2) methods are applied to new problems; (3) results are cited and developed by others; (4) new research directions emerge. Chen-Li\'s contact number theory demonstrates all of these.'}
            </p>
          </div>
        </section>

        {/* Intro */}
        <section className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-xl p-6 border border-blue-700">
          <h2 className="text-xl font-semibold text-blue-400 mb-4">
            🌟 {isZh ? '学术影响力' : 'Academic Impact'}
          </h2>
          <p className="text-slate-300">
            {isZh 
              ? 'Chen-Li的接触数理论发表于2004年，至今已经启发了多项后续研究。以下我们详细介绍这些发展，展示李世杰教授工作的持久影响。'
              : 'Chen-Li\'s contact number theory, published in 2004, has inspired numerous subsequent studies. Below we detail these developments, showing the lasting impact of Prof. Li\'s work.'}
          </p>
        </section>

        {/* Section 11.1 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 id="section-11.1" className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '11.1 伪欧氏空间的接触数 (2008)' : '11.1 Contact Number in Pseudo-Euclidean Spaces (2008)'}
          </h2>
          
          {/* What is pseudo-Euclidean */}
          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-4 border border-purple-700 mb-4">
            <p className="text-purple-400 font-semibold mb-2">
              🌌 {isZh ? '什么是伪欧氏空间？' : 'What is Pseudo-Euclidean Space?'}
            </p>
            <p className="text-slate-300 text-sm mb-2">
              {isZh 
                ? '伪欧氏空间是欧氏空间的推广，其中内积可以取负值。最著名的例子是Lorentz-Minkowski空间，它是爱因斯坦相对论的数学基础。'
                : 'Pseudo-Euclidean space generalizes Euclidean space to allow inner products to be negative. The most famous example is Lorentz-Minkowski space, the mathematical foundation of Einstein\'s relativity.'}
            </p>
            <p className="text-slate-400 text-sm">
              {isZh 
                ? '例如：在4维Minkowski空间中，内积定义为 ⟨x,y⟩ = -x₀y₀ + x₁y₁ + x₂y₂ + x₃y₃'
                : 'Example: In 4D Minkowski space, inner product is ⟨x,y⟩ = -x₀y₀ + x₁y₁ + x₂y₂ + x₃y₃'}
            </p>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-slate-300 font-semibold">Cabrerizo, J.L., Fernández, M., & Gómez, J.S.</p>
            <p className="text-cyan-400">"The Contact Number of a Pseudo-Euclidean Submanifold"</p>
            <p className="text-slate-400 text-sm">Taiwanese Journal of Mathematics, 12(7), 2008</p>
          </div>

          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-green-400 font-semibold mb-2">
              🔬 {isZh ? '主要贡献' : 'Main Contribution'}
            </p>
            <ul className="text-slate-300 text-sm space-y-2">
              <li>• {isZh 
                ? '将Chen-Li的接触数概念从欧氏空间推广到伪欧氏空间（如Lorentz-Minkowski空间）'
                : 'Extended Chen-Li\'s contact number concept from Euclidean to pseudo-Euclidean spaces (like Lorentz-Minkowski space)'}
              </li>
              <li>• {isZh 
                ? '研究类空子流形的接触数性质'
                : 'Studied contact number properties of spacelike submanifolds'}
              </li>
              <li>• {isZh 
                ? '建立了新的分类定理'
                : 'Established new classification theorems'}
              </li>
            </ul>
          </div>

          <div className="bg-slate-800 rounded-lg p-4">
            <p className="text-yellow-400 font-semibold mb-2">
              💡 {isZh ? '为什么这很重要？' : 'Why is This Important?'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '这项工作说明Chen-Li的接触数概念不仅适用于经典几何，还能推广到物理学相关的伪黎曼几何。这扩大了理论的适用范围和潜在应用。'
                : 'This work shows Chen-Li\'s contact number concept applies not only to classical geometry, but extends to pseudo-Riemannian geometry relevant to physics. This broadens the theory\'s scope and potential applications.'}
            </p>
          </div>
        </section>

        {/* Section 11.2 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 id="section-11.2" className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '11.2 高接触数曲面的特征 (2006)' : '11.2 Characterization of High Contact Number Surfaces (2006)'}
          </h2>
          
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-400">{isZh ? '发表于' : 'Published in'} Annali di Matematica Pura ed Applicata</p>
          </div>

          <div className="bg-slate-800 rounded-lg p-4">
            <p className="text-purple-400 font-semibold mb-2">
              📐 {isZh ? '研究内容' : 'Research Content'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '构造了具有高接触数的曲面的显式例子，深入研究了这些曲面的几何特征。'
                : 'Constructed explicit examples of surfaces with high contact numbers and studied their geometric characteristics in depth.'}
            </p>
          </div>
        </section>

        {/* Section 11.3 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 id="section-11.3" className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '11.3 陳邦彥教授的持续贡献' : '11.3 Prof. Chen\'s Continued Contributions'}
          </h2>
          
          <div className="space-y-4">
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-yellow-400 font-semibold mb-2">
                δ-{isZh ? '不变量的发展' : 'Invariants Development'}
              </h3>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? '陳邦彥的δ-不变量是子流形几何中的重要工具，与接触数理论密切相关。'
                  : 'Bang-Yen Chen\'s δ-invariants are important tools in submanifold geometry, closely related to contact number theory.'}
              </p>
            </div>
            
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-orange-400 font-semibold mb-2">
                {isZh ? '有限型子流形理论' : 'Finite Type Submanifold Theory'}
              </h3>
              <p className="text-slate-300 text-sm mb-2">
                {isZh 
                  ? '陈教授发展了有限型子流形的完整理论，提出了重要猜想。'
                  : 'Prof. Chen developed a complete theory of finite type submanifolds and proposed important conjectures.'}
              </p>
              <p className="text-slate-500 text-sm">arXiv:1307.6582</p>
            </div>
            
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-green-400 font-semibold mb-2">
                Chen-Ricci {isZh ? '不等式 30 年' : 'Inequality: 30 Years'}
              </h3>
              <p className="text-slate-300 text-sm mb-2">
                {isZh 
                  ? '2024年，Chen与Blaga发表综述文章，回顾Chen-Ricci不等式30年的发展历程。'
                  : 'In 2024, Chen and Blaga published a survey reviewing 30 years of Chen-Ricci inequality development.'}
              </p>
              <p className="text-slate-500 text-sm">
                In: <em>Geometry of Submanifolds and Applications</em>, Springer 2024
              </p>
            </div>
          </div>
        </section>

        {/* Section 11.4 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 id="section-11.4" className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '11.4 曲率线全挠率的推广 (2023)' : '11.4 Generalization of Total Torsion (2023)'}
          </h2>
          
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-slate-300 font-semibold">Raffaelli, M.</p>
            <p className="text-cyan-400">"Total torsion of three-dimensional lines of curvature"</p>
            <p className="text-slate-400 text-sm">Geometriae Dedicata, 217, Article 96 (2023)</p>
            <p className="text-slate-500 text-sm">arXiv:2308.12684</p>
          </div>

          <div className="bg-slate-800 rounded-lg p-4">
            <p className="text-green-400 font-semibold mb-2">
              📈 {isZh ? '进展' : 'Progress'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? 'Raffaelli将Qin-Li的全挠率定理推广到三维情形，证明了更强的整数倍定理，引用了Qin-Li 2002年的原始论文。'
                : 'Raffaelli extended Qin-Li\'s total torsion theorem to three dimensions, proving stronger integer multiple theorems, citing Qin-Li\'s 2002 original paper.'}
            </p>
          </div>
        </section>

        {/* Section 11.5 */}
        <section className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-6 border border-purple-700">
          <h2 id="section-11.5" className="text-xl font-semibold text-purple-400 mb-4">
            🎓 {isZh ? '11.5 学术传承' : '11.5 Academic Legacy'}
          </h2>
          
          <div className="space-y-4">
            <div className="bg-slate-900 rounded-lg p-4">
              <h3 className="text-cyan-400 font-semibold mb-2">
                {isZh ? '华南师范大学数学系' : 'South China Normal University Mathematics'}
              </h3>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? '李世杰教授在华南师范大学培养了多位研究生，继续推动子流形几何的研究。'
                  : 'Prof. Li trained multiple graduate students at South China Normal University, continuing to advance submanifold geometry research.'}
              </p>
            </div>
            
            <div className="bg-slate-900 rounded-lg p-4">
              <h3 className="text-yellow-400 font-semibold mb-2">
                {isZh ? '国际合作' : 'International Collaboration'}
              </h3>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? '与密歇根州立大学陳邦彥教授的长期合作，为中美数学交流做出了贡献。'
                  : 'Long-term collaboration with Prof. Bang-Yen Chen at Michigan State University contributed to Sino-American mathematical exchange.'}
              </p>
            </div>
            
            <div className="bg-slate-900 rounded-lg p-4">
              <h3 className="text-green-400 font-semibold mb-2">
                AMS {isZh ? '论文集 (2020)' : 'Proceedings (2020)'}
              </h3>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? '《Geometry of Submanifolds》(AMS Contemporary Mathematics, Vol. 756) 是致敬陳邦彥教授贡献的论文集，其中多篇文章引用了Chen-Li的接触数工作。'
                  : '"Geometry of Submanifolds" (AMS Contemporary Mathematics, Vol. 756) is a collection honoring Prof. Chen\'s contributions, with multiple papers citing Chen-Li\'s contact number work.'}
              </p>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            📅 {isZh ? '研究时间线' : 'Research Timeline'}
          </h2>
          
          <div className="space-y-4">
            {[
              { year: '1998', event: isZh ? 'Wang-Li: 球面中平行平均曲率向量子流形' : 'Wang-Li: Parallel mean curvature vector submanifolds in spheres' },
              { year: '2002', event: isZh ? 'Qin-Li: 曲率线全挠率定理' : 'Qin-Li: Total torsion of lines of curvature theorem' },
              { year: '2003', event: isZh ? '王霞-李世杰: 平行等周截面; 陈员龙-李世杰: Ricci曲率Pinching' : 'Wang-Li: Parallel isoperimetric sections; Chen-Li: Ricci curvature pinching' },
              { year: '2004', event: isZh ? 'Chen-Li: 接触数理论 ⭐' : 'Chen-Li: Contact Number Theory ⭐', highlight: true },
              { year: '2006', event: isZh ? '高接触数曲面特征研究' : 'High contact number surface characterization' },
              { year: '2008', event: isZh ? 'Cabrerizo等: 伪欧氏接触数' : 'Cabrerizo et al.: Pseudo-Euclidean contact number' },
              { year: '2020', event: isZh ? 'AMS论文集致敬陳邦彥' : 'AMS proceedings honoring Chen' },
              { year: '2023', event: isZh ? 'Raffaelli: 推广Qin-Li全挠率定理' : 'Raffaelli: Generalizing Qin-Li total torsion theorem' },
              { year: '2024', event: isZh ? 'Chen-Blaga: Chen-Ricci不等式30年综述' : 'Chen-Blaga: 30-year Chen-Ricci inequality survey' },
            ].map((item, index) => (
              <div key={index} className={`flex items-start gap-4 ${item.highlight ? 'bg-yellow-900/30 rounded-lg p-3 border border-yellow-700' : ''}`}>
                <div className={`text-sm font-mono ${item.highlight ? 'text-yellow-400' : 'text-cyan-400'}`}>
                  {item.year}
                </div>
                <div className={`text-sm ${item.highlight ? 'text-yellow-200 font-semibold' : 'text-slate-300'}`}>
                  {item.event}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Chapter Summary */}
        <section className="bg-gradient-to-r from-green-900/50 to-cyan-900/50 rounded-xl p-6 border border-green-700">
          <h2 className="text-xl font-semibold text-green-400 mb-4">
            ✅ {isZh ? '本章小结' : 'Chapter Summary'}
          </h2>
          <ul className="text-slate-300 text-sm space-y-2">
            <li>✓ {isZh ? '接触数概念已被推广到伪欧氏空间（2008年Cabrerizo等）' : 'Contact number concept extended to pseudo-Euclidean spaces (Cabrerizo et al. 2008)'}</li>
            <li>✓ {isZh ? '高接触数曲面得到了深入研究和显式构造' : 'High contact number surfaces studied in depth with explicit constructions'}</li>
            <li>✓ {isZh ? 'Qin-Li全挠率定理被推广到三维情形（2023年Raffaelli）' : 'Qin-Li total torsion theorem generalized to 3D (Raffaelli 2023)'}</li>
            <li>✓ {isZh ? 'Chen-Ricci不等式30年发展综述（2024年）' : 'Chen-Ricci inequality 30-year development surveyed (2024)'}</li>
            <li>✓ {isZh ? '李世杰教授的工作继续影响国际数学研究' : 'Prof. Li\'s work continues to influence international mathematical research'}</li>
          </ul>
        </section>

        {/* Navigation */}
        <div className="flex justify-between">
          <Link to="/chapter/10" className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors">
            ← {t('common.prev')}
          </Link>
          <Link to="/chapter/12" className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white transition-colors">
            {t('common.next')}: {t('chapters.ch12.title')} →
          </Link>
        </div>
      </div>
    </div>
  );
}
