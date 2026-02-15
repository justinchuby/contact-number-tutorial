import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MathBlock, Math } from '../components';
import { Chapter1Viz } from '../visualizations';

export default function Chapter1() {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <p className="text-cyan-400 text-sm mb-2">{t('nav.chapter', { num: 1 })}</p>
        <h1 className="text-3xl font-bold text-white mb-2">
          {t('chapters.ch1.title')}
        </h1>
        <p className="text-slate-400">{t('chapters.ch1.subtitle')}</p>
      </header>

      <div className="space-y-8">
        {/* Section 1.1 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '1.1 从日常生活到数学抽象' : '1.1 From Daily Life to Mathematical Abstraction'}
          </h2>
          
          <p className="text-slate-300 mb-4">
            {isZh 
              ? '想象你站在地球表面。在你脚下的一小块区域内，地面看起来是平的——就像一张纸。但我们知道，地球实际上是一个球体。这就是流形的核心思想：'
              : "Imagine standing on Earth's surface. The small patch beneath your feet looks flat—like a sheet of paper. But we know Earth is actually a sphere. This is the core idea of a manifold:"}
          </p>
          
          <div className="bg-slate-800 rounded-lg p-4 border-l-4 border-cyan-500 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">
              {isZh ? '直观定义' : 'Intuitive Definition'}
            </p>
            <p className="text-slate-300">
              {isZh 
                ? '流形是一个空间，它在局部看起来像欧氏空间（平坦的），但在整体上可能有复杂的形状。'
                : 'A manifold is a space that locally looks like Euclidean space (flat), but may have a complex global shape.'}
            </p>
          </div>

          <p className="text-slate-300 mb-4">
            {isZh 
              ? '为什么地图会"失真"？因为地球是弯曲的，无法完美地展开成平面。这种"局部像平面，整体不是平面"的性质，正是流形的特征。'
              : 'Why do maps "distort"? Because Earth is curved and cannot be perfectly flattened. This property of "locally flat, globally not flat" is the characteristic of a manifold.'}
          </p>
        </section>

        {/* Section 1.2 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '1.2 流形的正式定义' : '1.2 Formal Definition of a Manifold'}
          </h2>
          
          <p className="text-slate-300 mb-4">
            {isZh 
              ? '数学上，我们用"局部坐标卡"来精确描述这种结构：'
              : 'Mathematically, we use "local coordinate charts" to precisely describe this structure:'}
          </p>

          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">
              {isZh ? '定义（n维流形）' : 'Definition (n-dimensional Manifold)'}
            </p>
            <p className="text-slate-300 mb-2">
              {isZh 
                ? '一个n维流形M是一个拓扑空间，满足：对于M中的每一点p，存在一个包含p的开集U和一个同胚映射：'
                : 'An n-dimensional manifold M is a topological space such that: for every point p in M, there exists an open set U containing p and a homeomorphism:'}
            </p>
            <MathBlock>{'\\varphi: U \\to \\mathbb{R}^n'}</MathBlock>
            <p className="text-slate-300">
              {isZh 
                ? '这个映射 (U, φ) 称为局部坐标卡。'
                : 'This map (U, φ) is called a local coordinate chart.'}
            </p>
          </div>

          <p className="text-slate-300 mb-4">
            {isZh 
              ? '更进一步，如果相邻坐标卡之间的转换映射是光滑的，我们就得到光滑流形。如果还配备了度量（用于测量距离和角度），就得到黎曼流形。'
              : 'Furthermore, if the transition maps between overlapping charts are smooth, we get a smooth manifold. If it also has a metric (for measuring distances and angles), we get a Riemannian manifold.'}
          </p>
        </section>

        {/* Section 1.3 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '1.3 流形的例子' : '1.3 Examples of Manifolds'}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">
                {isZh ? '一维流形' : '1-dimensional Manifolds'}
              </h3>
              <ul className="text-slate-300 list-disc list-inside space-y-1">
                <li>{isZh ? '圆 ' : 'Circle '}<Math>{'S^1'}</Math></li>
                <li>{isZh ? '直线 ' : 'Line '}<Math>{'\\mathbb{R}'}</Math></li>
              </ul>
            </div>
            
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">
                {isZh ? '二维流形' : '2-dimensional Manifolds'}
              </h3>
              <ul className="text-slate-300 list-disc list-inside space-y-1">
                <li>{isZh ? '球面 ' : 'Sphere '}<Math>{'S^2'}</Math></li>
                <li>{isZh ? '环面 ' : 'Torus '}<Math>{'T^2'}</Math></li>
                <li>{isZh ? 'Klein瓶' : 'Klein bottle'}</li>
                <li>{isZh ? 'Möbius带' : 'Möbius strip'}</li>
              </ul>
            </div>
            
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">
                {isZh ? '高维流形' : 'Higher-dimensional Manifolds'}
              </h3>
              <ul className="text-slate-300 list-disc list-inside space-y-1">
                <li>{isZh ? 'n维球面 ' : 'n-sphere '}<Math>{'S^n'}</Math></li>
                <li>{isZh ? '射影空间 ' : 'Projective space '}<Math>{'\\mathbb{R}P^n'}</Math></li>
              </ul>
            </div>
            
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">
                {isZh ? '欧氏空间中的子流形' : 'Submanifolds in Euclidean Space'}
              </h3>
              <ul className="text-slate-300 list-disc list-inside space-y-1">
                <li><Math>{'S^2 \\subset E^3'}</Math></li>
                <li>{isZh ? '曲面 ' : 'Surfaces '}<Math>{'\\subset E^6'}</Math></li>
              </ul>
            </div>
          </div>

          <p className="text-slate-400 text-sm mt-4">
            {isZh 
              ? '💡 在下方的可视化中，你可以旋转探索这些流形！'
              : '💡 In the visualization below, you can rotate and explore these manifolds!'}
          </p>

          {/* Interactive Visualization */}
          <Chapter1Viz />
        </section>

        {/* Section 1.4 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '1.4 为什么流形重要？' : '1.4 Why Are Manifolds Important?'}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">🔬 {isZh ? '物理学' : 'Physics'}</h3>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? '爱因斯坦的广义相对论将时空描述为一个四维流形，弯曲程度由质量决定。'
                  : "Einstein's General Relativity describes spacetime as a 4-dimensional manifold, with curvature determined by mass."}
              </p>
            </div>
            
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">🤖 {isZh ? '机器人学' : 'Robotics'}</h3>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? '机器人的配置空间（所有可能姿态的集合）通常是一个流形。'
                  : 'The configuration space of a robot (all possible poses) is typically a manifold.'}
              </p>
            </div>
            
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">📊 {isZh ? '数据科学' : 'Data Science'}</h3>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? '流形学习假设高维数据实际上位于一个低维流形上。'
                  : 'Manifold learning assumes high-dimensional data actually lies on a low-dimensional manifold.'}
              </p>
            </div>
            
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">📐 {isZh ? '微分几何' : 'Differential Geometry'}</h3>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? '研究流形上的曲率、测地线、子流形等几何结构。'
                  : 'Studies geometric structures on manifolds: curvature, geodesics, submanifolds, etc.'}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-cyan-900/50 to-purple-900/50 rounded-lg p-4 border border-cyan-700">
            <h3 className="text-cyan-400 font-semibold mb-2">
              🎯 {isZh ? '与接触数的联系' : 'Connection to Contact Number'}
            </h3>
            <p className="text-slate-300">
              {isZh 
                ? '接触数（Contact Number）是李世杰教授与陈邦彦教授提出的一个不变量，用于研究欧氏空间中子流形的几何性质。在后续章节中，我们将深入学习这一理论。'
                : 'Contact Number is an invariant proposed by Prof. Shi-Jie Li and Prof. Bang-Yen Chen, used to study the geometric properties of submanifolds in Euclidean space. We will explore this theory in depth in later chapters.'}
            </p>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-end">
          <Link
            to="/chapter/2"
            className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white transition-colors"
          >
            {t('common.next')}: {t('chapters.ch2.title')} →
          </Link>
        </div>
      </div>
    </div>
  );
}
