import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Chapter12() {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <p className="text-cyan-400 text-sm mb-2">{t('nav.chapter', { num: 12 })}</p>
        <h1 className="text-3xl font-bold text-white mb-2">{t('chapters.ch12.title')}</h1>
        <p className="text-slate-400">{t('chapters.ch12.subtitle')}</p>
      </header>

      <div className="space-y-8">
        {/* Academic Contributions */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            🎓 {isZh ? '学术贡献' : 'Academic Contributions'}
          </h2>
          
          <div className="space-y-4">
            {/* Periodic table metaphor */}
            <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-4 border border-purple-700">
              <h3 className="text-purple-400 font-semibold mb-2">
                🧪 {isZh ? '几何世界的"元素周期表"' : 'A "Periodic Table" for Geometry'}
              </h3>
              <p className="text-slate-300 text-sm mb-2">
                {isZh 
                  ? '接触数理论就像在为几何世界绘制一张元素周期表。每个接触数对应着一类独特的几何"物种"：c#=2是最普通的元素，c#=3是各向同性家族，c#=4是常各向同性家族，c#=∞是完美的球面。论文中已给出了c#=6的例子——但c#=5、7或更高的奇数和偶数，它们各自对应着什么样的未知几何特性？这张表上还有大量空白位置，等待未来的数学家去发现和命名。'
                  : 'Contact number theory is like drawing a periodic table for geometry. Each contact number corresponds to a unique geometric "species": c#=2 is the most common element, c#=3 is the isotropic family, c#=4 the constant isotropic family, c#=∞ the perfect spheres. The paper gives examples with c#=6—but what geometric properties correspond to c#=5, 7, or higher? Many positions on this table remain blank, awaiting future mathematicians to discover and name.'}
              </p>
            </div>

            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-green-400 font-semibold mb-2">
                {isZh ? '新的子流形分类不变量' : 'New Submanifold Classification Invariant'}
              </h3>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? 'Contact Number提供了一种全新的方式来分类欧氏空间中的子流形，与经典的各向同性概念建立了深刻联系。'
                  : 'Contact Number provides a novel way to classify submanifolds in Euclidean space, establishing deep connections with the classical concept of isotropy.'}
              </p>
            </div>
            
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-purple-400 font-semibold mb-2">
                {isZh ? '连接微分几何与复几何' : 'Connecting Differential and Complex Geometry'}
              </h3>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? '曲面c#=3与C²中全纯曲线的等价性，架起了两个数学分支之间的桥梁。'
                  : 'The equivalence between surfaces with c#=3 and holomorphic curves in C² bridges two branches of mathematics.'}
              </p>
            </div>
            
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-orange-400 font-semibold mb-2">
                {isZh ? '发现新的几何对象' : 'Discovery of New Geometric Objects'}
              </h3>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? '首次给出non-spherical pseudo-umbilical曲面的显式例子，这在之前的文献中是不存在的。'
                  : 'First explicit examples of non-spherical pseudo-umbilical surfaces, which did not exist in previous literature.'}
              </p>
            </div>
          </div>
        </section>

        {/* Real-world Applications */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            🌍 {isZh ? '现实应用' : 'Real-world Applications'}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">💻 {isZh ? '计算机图形学' : 'Computer Graphics'}</h3>
              <p className="text-slate-400 text-sm">
                {isZh 
                  ? '接触数可用于评估曲面的光滑程度和质量。'
                  : 'Contact number can be used to evaluate surface smoothness and quality.'}
              </p>
            </div>
            
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">🏭 {isZh ? '工业设计' : 'Industrial Design'}</h3>
              <p className="text-slate-400 text-sm">
                {isZh 
                  ? '高接触数的曲面更适合用于精密制造。'
                  : 'Surfaces with high contact numbers are better suited for precision manufacturing.'}
              </p>
            </div>
            
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">🤖 {isZh ? '机器人学' : 'Robotics'}</h3>
              <p className="text-slate-400 text-sm">
                {isZh 
                  ? '测地线在路径规划中的应用。'
                  : 'Applications of geodesics in path planning.'}
              </p>
            </div>
            
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">🏥 {isZh ? '医学成像' : 'Medical Imaging'}</h3>
              <p className="text-slate-400 text-sm">
                {isZh 
                  ? '器官表面的几何分析与重建。'
                  : 'Geometric analysis and reconstruction of organ surfaces.'}
              </p>
            </div>
          </div>
        </section>

        {/* Tribute to Prof. Li */}
        <section className="bg-gradient-to-r from-cyan-900/50 to-purple-900/50 rounded-xl p-6 border border-cyan-700">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            🙏 {isZh ? '致敬李世杰教授' : 'Tribute to Prof. Shi-Jie Li'}
          </h2>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <div className="bg-slate-800 rounded-lg p-4 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                  👨‍🏫
                </div>
                <h3 className="text-white font-semibold">{isZh ? '李世杰 教授' : 'Prof. Shi-Jie Li'}</h3>
                <p className="text-slate-400 text-sm">{isZh ? '华南师范大学数学系' : 'South China Normal University'}</p>
              </div>
            </div>
            
            <div className="md:w-2/3 space-y-4">
              <p className="text-slate-300">
                {isZh 
                  ? '李世杰教授是华南师范大学数学系的资深教授，长期从事微分几何研究。他与密歇根州立大学的陳邦彥教授合作，在子流形几何领域做出了重要贡献。'
                  : 'Prof. Shi-Jie Li is a senior professor at the Department of Mathematics, South China Normal University. He has collaborated with Prof. Bang-Yen Chen of Michigan State University and made significant contributions to submanifold geometry.'}
              </p>
              
              <div className="bg-slate-800 rounded-lg p-4">
                <h4 className="text-cyan-400 font-semibold mb-2">{isZh ? '主要合作论文' : 'Key Collaborative Papers'}</h4>
                <ul className="text-slate-300 text-sm space-y-2">
                  <li>• Chen, B.-Y. & Li, S.-J. (2004). "The Contact Number of a Euclidean Submanifold"</li>
                  <li>• Wang, M.-J. & Li, S.-J. (1998). "Submanifolds with Parallel Mean Curvature Vector"</li>
                  <li>• Qin, Y.-A. & Li, S.-J. (2002). "Total Torsion of Closed Lines of Curvature"</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* References */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            📚 {isZh ? '参考文献' : 'References'}
          </h2>
          
          <div className="space-y-3 text-slate-300 text-sm">
            <div className="bg-slate-800 rounded-lg p-3">
              <p className="font-mono">
                [1] Chen, B.-Y., & Li, S.-J. (2004). The contact number of a Euclidean submanifold. 
                <span className="text-cyan-400"> Proceedings of the Edinburgh Mathematical Society, 47</span>(1), 69-100.
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-3">
              <p className="font-mono">
                [2] Wang, M.-J., & Li, S.-J. (1998). Submanifolds with parallel mean curvature vector in a sphere. 
                <span className="text-cyan-400"> Kodai Mathematical Journal, 21</span>, 201-207.
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-3">
              <p className="font-mono">
                [3] Qin, Y.-A., & Li, S.-J. (2002). Total torsion of closed lines of curvature. 
                <span className="text-cyan-400"> Bulletin of the Australian Mathematical Society, 65</span>(1), 73-78.
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-3">
              <p className="font-mono">
                [4] Cabrerizo, J. L., Fernández, M., & Gómez, J. S. (2008). The contact number of a pseudo-Euclidean submanifold. 
                <span className="text-cyan-400"> Taiwanese Journal of Mathematics, 12</span>(7).
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-3">
              <p className="font-mono">
                [5] Raffaelli, M. (2023). Total torsion of three-dimensional lines of curvature. 
                <span className="text-cyan-400"> Geometriae Dedicata, 217</span>, Article 96.
              </p>
            </div>
          </div>
        </section>

        {/* Final Message */}
        <section className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 rounded-xl p-6 border border-green-700 text-center">
          <p className="text-2xl mb-4">🎉</p>
          <h2 className="text-xl font-semibold text-green-400 mb-4">
            {isZh ? '恭喜完成学习！' : 'Congratulations on Completing the Tutorial!'}
          </h2>
          <p className="text-slate-300">
            {isZh 
              ? '你现在已经了解了接触数理论的核心概念。希望这个教程能帮助你更好地理解李世杰教授的研究贡献。'
              : "You now understand the core concepts of contact number theory. We hope this tutorial helps you appreciate Prof. Shi-Jie Li's research contributions."}
          </p>
        </section>

        {/* Navigation */}
        <div className="flex justify-start">
          <Link
            to="/chapter/11"
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors"
          >
            ← {t('common.prev')}
          </Link>
        </div>
      </div>
    </div>
  );
}
