import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MathBlock, Math, Tooltip } from '../components';
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
                ? <>
                    <Tooltip term="manifold">流形</Tooltip>是一个空间，它在局部看起来像<Tooltip term="euclidean-space">欧氏空间</Tooltip>（平坦的），但在整体上可能有复杂的形状。
                  </>
                : <>
                    A <Tooltip term="manifold">manifold</Tooltip> is a space that locally looks like <Tooltip term="euclidean-space">Euclidean space</Tooltip> (flat), but may have a complex global shape.
                  </>}
            </p>
          </div>

          {/* Fun analogy box */}
          <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-4 border border-yellow-700 mb-4">
            <p className="text-yellow-400 font-semibold mb-2">
              🎮 {isZh ? '游戏类比' : 'Gaming Analogy'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '想象《吃豆人》游戏：当吃豆人从屏幕右边走出去，它会从左边出现。这个游戏屏幕其实是一个环面（甜甜圈形状）！局部看起来是平的格子，但整体却是弯曲的。'
                : 'Think of Pac-Man: when Pac-Man exits the right side of the screen, he appears on the left. The game screen is actually a torus (donut shape)! Locally it looks like a flat grid, but globally it\'s curved.'}
            </p>
          </div>

          <p className="text-slate-300 mb-4">
            {isZh 
              ? '为什么地图会"失真"？因为地球是弯曲的，无法完美地展开成平面。格陵兰岛在世界地图上看起来和非洲差不多大，但实际上非洲是格陵兰的14倍！这种"局部像平面，整体不是平面"的性质，正是流形的特征。'
              : 'Why do maps "distort"? Because Earth is curved and cannot be perfectly flattened. Greenland looks almost as big as Africa on world maps, but Africa is actually 14 times larger! This property of "locally flat, globally not flat" is the characteristic of a manifold.'}
          </p>

          {/* More examples */}
          <div className="bg-slate-800 rounded-lg p-4">
            <p className="text-green-400 font-semibold mb-2">
              🌟 {isZh ? '生活中的流形' : 'Manifolds in Daily Life'}
            </p>
            <ul className="text-slate-300 text-sm space-y-2">
              <li>• <span className="text-cyan-400">{isZh ? '橙子皮' : 'Orange peel'}</span>: {isZh ? '剥下来可以近似展平，但会有裂缝——这就是球面！' : 'Can be approximately flattened when peeled, but with cracks—this is a sphere!'}</li>
              <li>• <span className="text-cyan-400">{isZh ? '甜甜圈表面' : 'Donut surface'}</span>: {isZh ? '局部平坦，但整体有一个"洞"——这是环面。' : 'Locally flat, but globally has a "hole"—this is a torus.'}</li>
              <li>• <span className="text-cyan-400">{isZh ? '纸带扭一下再粘起来' : 'Paper strip twisted and glued'}</span>: {isZh ? '这就是著名的莫比乌斯带，只有一个面！' : 'This is the famous Möbius strip, with only one side!'}</li>
              <li>• <span className="text-cyan-400">{isZh ? '你的手臂可以转到的所有位置' : 'All positions your arm can reach'}</span>: {isZh ? '这是一个高维流形，叫做配置空间！' : 'This is a high-dimensional manifold called configuration space!'}</li>
            </ul>
          </div>
        </section>

        {/* Section 1.2 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '1.2 流形的正式定义' : '1.2 Formal Definition of a Manifold'}
          </h2>

          {/* Analogy first */}
          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-4 border border-purple-700 mb-4">
            <p className="text-purple-400 font-semibold mb-2">
              🗺️ {isZh ? '地图册类比' : 'Atlas Analogy'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? <>
                    想象一本世界地图册：每一页都是地球的一小块区域的平面地图。虽然每一页都是平的，但把它们"缝合"在一起，就能描述整个弯曲的地球。数学上，这本"地图册"就叫做<Tooltip term="atlas">Atlas（图册）</Tooltip>，每一页叫做<Tooltip term="chart">Chart（坐标卡）</Tooltip>。
                  </>
                : <>
                    Imagine a world atlas: each page is a flat map of a small region of Earth. Although each page is flat, "stitching" them together describes the entire curved Earth. In mathematics, this "atlas" is literally called an <Tooltip term="atlas">Atlas</Tooltip>, and each page is called a <Tooltip term="chart">Chart</Tooltip>.
                  </>}
            </p>
          </div>
          
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
                ? <>
                    一个n维<Tooltip term="manifold">流形</Tooltip>M是一个<Tooltip term="topological-space">拓扑空间</Tooltip>，满足：对于M中的每一点p，存在一个包含p的<Tooltip term="open-set">开集</Tooltip>U和一个<Tooltip term="homeomorphism">同胚映射</Tooltip>：
                  </>
                : <>
                    An n-dimensional <Tooltip term="manifold">manifold</Tooltip> M is a <Tooltip term="topological-space">topological space</Tooltip> such that: for every point p in M, there exists an <Tooltip term="open-set">open set</Tooltip> U containing p and a <Tooltip term="homeomorphism">homeomorphism</Tooltip>:
                  </>}
            </p>
            <MathBlock>{'\\varphi: U \\to \\mathbb{R}^n'}</MathBlock>
            <p className="text-slate-300">
              {isZh 
                ? <>这个映射 (U, φ) 称为<Tooltip term="chart">局部坐标卡</Tooltip>。</>
                : <>This map (U, φ) is called a <Tooltip term="chart">local coordinate chart</Tooltip>.</>}
            </p>
          </div>

          <p className="text-slate-300 mb-4">
            {isZh 
              ? <>
                  更进一步，如果相邻<Tooltip term="chart">坐标卡</Tooltip>之间的转换映射是光滑的，我们就得到<Tooltip term="smooth-manifold">光滑流形</Tooltip>。如果还配备了度量（用于测量距离和角度），就得到<Tooltip term="riemannian-manifold">黎曼流形</Tooltip>。
                </>
              : <>
                  Furthermore, if the transition maps between overlapping <Tooltip term="chart">charts</Tooltip> are smooth, we get a <Tooltip term="smooth-manifold">smooth manifold</Tooltip>. If it also has a metric (for measuring distances and angles), we get a <Tooltip term="riemannian-manifold">Riemannian manifold</Tooltip>.
                </>}
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
                <li>{isZh ? <>n维<Tooltip term="hypersphere">球面</Tooltip> </> : <>n-<Tooltip term="hypersphere">sphere</Tooltip> </>}<Math>{'S^n'}</Math></li>
                <li>{isZh ? '射影空间 ' : 'Projective space '}<Math>{'\\mathbb{R}P^n'}</Math></li>
              </ul>
            </div>
            
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">
                {isZh ? <><Tooltip term="euclidean-space">欧氏空间</Tooltip>中的<Tooltip term="submanifold">子流形</Tooltip></> : <><Tooltip term="submanifold">Submanifolds</Tooltip> in <Tooltip term="euclidean-space">Euclidean Space</Tooltip></>}
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
                  ? <>爱因斯坦的广义相对论将时空描述为一个四维<Tooltip term="riemannian-manifold">黎曼流形</Tooltip>，<Tooltip term="curvature">曲率</Tooltip>由质量决定。</>
                  : <>Einstein's General Relativity describes spacetime as a 4-dimensional <Tooltip term="riemannian-manifold">Riemannian manifold</Tooltip>, with <Tooltip term="curvature">curvature</Tooltip> determined by mass.</>}
              </p>
            </div>
            
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">🤖 {isZh ? '机器人学' : 'Robotics'}</h3>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? <>机器人的配置空间（所有可能姿态的集合）通常是一个<Tooltip term="manifold">流形</Tooltip>。</>
                  : <>The configuration space of a robot (all possible poses) is typically a <Tooltip term="manifold">manifold</Tooltip>.</>}
              </p>
            </div>
            
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">📊 {isZh ? '数据科学' : 'Data Science'}</h3>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? <>流形学习假设高维数据实际上位于一个低维<Tooltip term="manifold">流形</Tooltip>上。</>
                  : <>Manifold learning assumes high-dimensional data actually lies on a low-dimensional <Tooltip term="manifold">manifold</Tooltip>.</>}
              </p>
            </div>
            
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">📐 {isZh ? '微分几何' : 'Differential Geometry'}</h3>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? <>研究流形上的<Tooltip term="curvature">曲率</Tooltip>、<Tooltip term="geodesic">测地线</Tooltip>、<Tooltip term="submanifold">子流形</Tooltip>等几何结构。</>
                  : <>Studies geometric structures on manifolds: <Tooltip term="curvature">curvature</Tooltip>, <Tooltip term="geodesic">geodesics</Tooltip>, <Tooltip term="submanifold">submanifolds</Tooltip>, etc.</>}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-cyan-900/50 to-purple-900/50 rounded-lg p-4 border border-cyan-700">
            <h3 className="text-cyan-400 font-semibold mb-2">
              📣 {isZh ? '预告' : 'Preview'}
            </h3>
            <p className="text-slate-300">
              {isZh 
                ? <>这些基础概念（流形、子流形、嵌入）是理解陈邦彦教授与李世杰教授工作的基石。在第五章，我们将利用这些概念来定义一个新的几何不变量——它能精确测量子流形的"对称程度"。</>
                : <>These foundational concepts (manifolds, submanifolds, embeddings) are the building blocks for understanding the work of Prof. Chen and Prof. Li. In Chapter 5, we'll use them to define a new geometric invariant that precisely measures the "degree of symmetry" of submanifolds.</>}
            </p>
          </div>

          {/* Thinking Questions */}
          <div className="mt-6 bg-slate-800 rounded-lg p-4">
            <p className="text-yellow-400 font-semibold mb-3">
              🤔 {isZh ? '思考题' : 'Questions to Think About'}
            </p>
            <div className="space-y-3">
              <div>
                <p className="text-slate-300 text-sm">
                  {isZh 
                    ? '1. 为什么地图总是会失真？能否画一张完美的世界地图？'
                    : '1. Why do maps always distort? Is it possible to draw a perfect world map?'}
                </p>
                <details className="mt-1">
                  <summary className="text-cyan-400 text-sm cursor-pointer hover:text-cyan-300">
                    {isZh ? '点击查看答案' : 'Click to see answer'}
                  </summary>
                  <p className="text-slate-400 text-xs mt-1">
                    {isZh 
                      ? '不能！因为地球是球面（2维流形），而地图是平面（欧氏空间）。球面无法在不拉伸或撕裂的情况下展平——这就是流形的"整体不平"性质。'
                      : 'No! Because Earth is a sphere (2-manifold) and maps are flat (Euclidean). A sphere cannot be flattened without stretching or tearing—this is the "globally not flat" property of manifolds.'}
                  </p>
                </details>
              </div>
              <div>
                <p className="text-slate-300 text-sm">
                  {isZh 
                    ? '2. 莫比乌斯带有几个面？它是流形吗？'
                    : '2. How many sides does a Möbius strip have? Is it a manifold?'}
                </p>
                <details className="mt-1">
                  <summary className="text-cyan-400 text-sm cursor-pointer hover:text-cyan-300">
                    {isZh ? '点击查看答案' : 'Click to see answer'}
                  </summary>
                  <p className="text-slate-400 text-xs mt-1">
                    {isZh 
                      ? '莫比乌斯带只有一个面！是的，它是2维流形（局部像平面），但它是"不可定向"的——你无法一致地区分"正面"和"背面"。'
                      : 'The Möbius strip has only one side! Yes, it\'s a 2-manifold (locally flat), but it\'s "non-orientable"—you can\'t consistently distinguish "front" from "back".'}
                  </p>
                </details>
              </div>
            </div>
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
