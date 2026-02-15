import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MathBlock, Math } from '../components';
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
        {/* Interactive visualization */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            🎮 {isZh ? '交互可视化：挠率与Frenet标架' : 'Interactive: Torsion and Frenet Frame'}
          </h2>
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
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '9.1 曲率线是什么？' : '9.1 What are Lines of Curvature?'}
          </h2>
          
          <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-lg p-4 border border-blue-700 mb-4">
            <p className="text-blue-400 font-semibold mb-2">
              🌊 {isZh ? '海浪类比' : 'Wave Analogy'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '想象曲面是一片起伏的海面。在每一点，有两个特殊方向：弯曲最大的方向和弯曲最小的方向。沿着这些方向画线，就得到曲率线。'
                : 'Imagine the surface as an undulating sea. At each point, there are two special directions: maximum bending and minimum bending. Drawing lines along these directions gives lines of curvature.'}
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">
              {isZh ? '定义' : 'Definition'}
            </p>
            <p className="text-slate-300 text-sm mb-2">
              {isZh 
                ? '曲率线是曲面上处处与主曲率方向相切的曲线。在每一点，形状算子的特征向量给出主曲率方向。'
                : 'Lines of curvature are curves on a surface that are everywhere tangent to principal curvature directions. At each point, eigenvectors of the shape operator give principal directions.'}
            </p>
            <p className="text-slate-400 text-sm">
              {isZh ? 'Rodrigues公式：' : 'Rodrigues formula:'} <Math>{'dn = -\\kappa \\cdot dr'}</Math>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-cyan-400 font-semibold mb-2">
                {isZh ? '例：椭球面' : 'Example: Ellipsoid'}
              </h3>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? '椭球面的曲率线是经线和纬线（类似地球的经纬网）。'
                  : 'Lines of curvature on an ellipsoid are meridians and parallels (like Earth\'s latitude-longitude grid).'}
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-purple-400 font-semibold mb-2">
                {isZh ? '例：环面' : 'Example: Torus'}
              </h3>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? '环面的曲率线是"圈圈"（两个方向）。'
                  : 'Lines of curvature on a torus are "circles" (in two directions).'}
              </p>
            </div>
          </div>
        </section>

        {/* Section 9.2 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '9.2 什么是挠率？' : '9.2 What is Torsion?'}
          </h2>
          
          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-4 border border-purple-700 mb-4">
            <p className="text-purple-400 font-semibold mb-2">
              🎢 {isZh ? '过山车类比' : 'Roller Coaster Analogy'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '坐过山车时，轨道不仅会左右转弯（曲率），还会让你"翻滚"——这种翻滚感就是挠率！挠率测量曲线离开其密切平面的速度。'
                : 'On a roller coaster, the track not only turns left-right (curvature), but also makes you "roll"—this rolling sensation is torsion! Torsion measures how fast a curve leaves its osculating plane.'}
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">
              {isZh ? '空间曲线的挠率' : 'Torsion of Space Curve'}
            </p>
            <MathBlock>{'\\tau = \\frac{(\\gamma\' \\times \\gamma\'\') \\cdot \\gamma\'\'\'}{|\\gamma\' \\times \\gamma\'\'|^2}'}</MathBlock>
            <ul className="text-slate-300 text-sm mt-2 space-y-1">
              <li>• τ = 0: {isZh ? '曲线在平面内' : 'curve lies in a plane'}</li>
              <li>• τ &gt; 0: {isZh ? '向右"螺旋"' : 'spirals right'}</li>
              <li>• τ &lt; 0: {isZh ? '向左"螺旋"' : 'spirals left'}</li>
            </ul>
          </div>

          <div className="bg-slate-800 rounded-lg p-4">
            <p className="text-green-400 font-semibold mb-2">
              🔧 {isZh ? '全挠率' : 'Total Torsion'}
            </p>
            <MathBlock>{'T = \\oint_C \\tau \\, ds'}</MathBlock>
            <p className="text-slate-400 text-sm mt-2">
              {isZh 
                ? '沿闭曲线积分挠率，得到"总共翻滚了多少"。'
                : 'Integrating torsion along a closed curve gives "total amount of rolling".'}
            </p>
          </div>
        </section>

        {/* Section 9.3 - Main Theorem */}
        <section className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-xl p-6 border-2 border-yellow-600">
          <h2 className="text-xl font-semibold text-yellow-400 mb-4">
            ⭐ {isZh ? '9.3 Qin-Li 全挠率定理' : '9.3 Qin-Li Total Torsion Theorem'}
          </h2>
          
          <div className="bg-slate-900 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">
              {isZh ? '定理1 (Qin-Li 2002)' : 'Theorem 1 (Qin-Li 2002)'}
            </p>
            <p className="text-slate-300">
              {isZh 
                ? '设 C 是 E³ 中曲面上的闭曲率线。则 C 的全挠率是 π 的整数倍：'
                : 'Let C be a closed line of curvature on a surface in E³. Then the total torsion of C is an integer multiple of π:'}
            </p>
            <MathBlock>{'T = \\oint_C \\tau \\, ds = k\\pi, \\quad k \\in \\mathbb{Z}'}</MathBlock>
          </div>

          <div className="bg-slate-900 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">
              {isZh ? '定理2 (Qin-Li 2002)' : 'Theorem 2 (Qin-Li 2002)'}
            </p>
            <p className="text-slate-300">
              {isZh 
                ? '设 C 是卵形面(ovaloid)上的闭曲率线。则：'
                : 'Let C be a closed line of curvature on an ovaloid. Then:'}
            </p>
            <MathBlock>{'T = 0'}</MathBlock>
          </div>

          <div className="bg-slate-900 rounded-lg p-4">
            <p className="text-green-400 font-semibold mb-2">
              🥚 {isZh ? '什么是卵形面？' : 'What is an Ovaloid?'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '卵形面是Gauss曲率处处为正的紧致凸曲面，就像鸡蛋的表面。球面是最对称的卵形面。'
                : 'An ovaloid is a compact convex surface with positive Gaussian curvature everywhere, like the surface of an egg. The sphere is the most symmetric ovaloid.'}
            </p>
          </div>
        </section>

        {/* Section 9.4 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
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
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
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
              ? '曲率线和测地线是曲面上两类重要的曲线。全脐曲面（接触数∞）的所有曲线既是测地线又是曲率线。Qin-Li对曲率线全挠率的研究，与李世杰教授在接触数理论中对测地线和法截面关系的研究，都属于曲面几何的核心问题。'
              : 'Lines of curvature and geodesics are two important types of curves on surfaces. On totally umbilical surfaces (contact number ∞), all curves are both geodesics and lines of curvature. Qin-Li\'s study of total torsion of lines of curvature, like Prof. Li\'s study of geodesic-normal section relations in contact number theory, are both core problems in surface geometry.'}
          </p>
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
