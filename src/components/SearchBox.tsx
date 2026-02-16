import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// Search index - concepts and keywords with their locations
const searchIndex = {
  zh: [
    // Chapter 1
    { term: '流形', chapter: 1, section: '1.1', description: '局部看起来像欧氏空间的空间' },
    { term: '拓扑空间', chapter: 1, section: '1.2', description: '研究连续性的抽象框架' },
    { term: '同胚映射', chapter: 1, section: '1.2', description: '保持拓扑结构的双射' },
    { term: '光滑流形', chapter: 1, section: '1.2', description: '转换映射是光滑的流形' },
    { term: '黎曼流形', chapter: 1, section: '1.2', description: '带有度量的光滑流形' },
    { term: '坐标卡', chapter: 1, section: '1.2', description: '局部坐标映射' },
    { term: '图册', chapter: 1, section: '1.2', description: '坐标卡的集合' },
    
    // Chapter 2
    { term: '切空间', chapter: 2, section: '2.1', description: '在点p处与M相切的向量空间' },
    { term: '法空间', chapter: 2, section: '2.1', description: '与切空间正交的向量空间' },
    { term: '嵌入', chapter: 2, section: '2.2', description: '保持拓扑结构的映射' },
    { term: '浸入', chapter: 2, section: '2.2', description: '允许自交的局部嵌入' },
    { term: '子流形', chapter: 2, section: '2.2', description: '住在另一个流形里的流形' },
    { term: '欧氏空间', chapter: 2, section: '2.3', description: '配备标准内积的实向量空间' },
    { term: '余维数', chapter: 2, section: '2.3', description: '外部空间维数减去子流形维数' },
    { term: '直和分解', chapter: 2, section: '2.4', description: '空间分解为切向和法向部分' },
    { term: '第二基本形式', chapter: 2, section: '2.5', description: '测量子流形如何弯曲' },
    { term: '形状算子', chapter: 2, section: '2.6', description: '第二基本形式的切空间版本' },
    { term: 'Gauss公式', chapter: 2, section: '2.5', description: '分解外部导数' },
    { term: 'Weingarten公式', chapter: 2, section: '2.6', description: '分解法向量导数' },
    
    // Chapter 3
    { term: '测地线', chapter: 3, section: '3.1', description: '流形上的最短路径' },
    { term: '测地曲率', chapter: 3, section: '3.2', description: '曲线在流形上的弯曲程度' },
    { term: '单位切丛', chapter: 3, section: '3.3', description: '所有单位切向量的集合' },
    
    // Chapter 4
    { term: '法截线', chapter: 4, section: '4.1', description: '仿射子空间与流形的交线' },
    { term: '仿射子空间', chapter: 4, section: '4.1', description: '由点和方向张成的子空间' },
    
    // Chapter 5
    { term: '接触数', chapter: 5, section: '5.2', description: '测地线与法截线的接触阶数' },
    { term: '接触阶数', chapter: 5, section: '5.1', description: '两条曲线的导数相同的最高阶' },
    { term: 'k阶接触', chapter: 5, section: '5.1', description: '前k阶导数都相同' },
    
    // Chapter 6
    { term: '各向同性', chapter: 6, section: '6.1', description: '法曲率向量长度与方向无关' },
    { term: '常各向同性', chapter: 6, section: '6.3', description: '各向同性且λ在整个M上恒定' },
    { term: '全纯曲线', chapter: 6, section: '6.5', description: '由全纯函数参数化的曲线' },
    { term: '全纯函数', chapter: 6, section: '6.5', description: '满足Cauchy-Riemann方程的复函数' },
    { term: '复数', chapter: 6, section: '6.5', description: 'z = x + iy 形式的数' },
    
    // Chapter 7
    { term: '广义螺旋面', chapter: 7, section: '7.1', description: '螺旋面在高维的推广' },
    { term: '螺旋面', chapter: 7, section: '7.1', description: '由直线旋转上升生成的极小曲面' },
    { term: '脐点', chapter: 7, section: '7.3', description: '各方向法曲率相同的点' },
    { term: 'pseudo-umbilical', chapter: 7, section: '7.3', description: '沿H方向形状算子是恒等倍数' },
    { term: '伪脐', chapter: 7, section: '7.3', description: '沿H方向形状算子是恒等倍数' },
    
    // Chapter 8
    { term: '平均曲率', chapter: 8, section: '8.1', description: '第二基本形式的平均' },
    { term: '平均曲率向量', chapter: 8, section: '8.1', description: 'H = (1/n)tr(h)' },
    { term: '平行平均曲率', chapter: 8, section: '8.1', description: '∇⊥H = 0' },
    { term: 'Simons公式', chapter: 8, section: '8.2', description: '第二基本形式的Laplacian' },
    { term: 'Pinching定理', chapter: 8, section: '8.3', description: '曲率有界则子流形特殊' },
    { term: '全脐子流形', chapter: 8, section: '8.3', description: '每个点都是脐点' },
    
    // Chapter 9
    { term: '曲率线', chapter: 9, section: '9.1', description: '主方向切线的曲线' },
    { term: '全挠率', chapter: 9, section: '9.2', description: '挠率沿闭曲线的积分' },
    { term: '挠率', chapter: 9, section: '9.1', description: '曲线离开密切平面的程度' },
    { term: 'Frenet标架', chapter: 9, section: '9.1', description: '曲线的切向、法向、副法向' },
    { term: '卵形面', chapter: 9, section: '9.2', description: '高斯曲率处处为正的凸曲面' },
    
    // Chapter 10
    { term: '等周截面', chapter: 10, section: '10.1', description: '使M₁(ξ)恒定的法向量场' },
    { term: '平行等周截面', chapter: 10, section: '10.2', description: 'D_Xξ = 0的等周截面' },
    { term: '紧致子流形', chapter: 10, section: '10.1', description: '有界且闭合的子流形' },
    
    // Chapter 11
    { term: '伪欧氏空间', chapter: 11, section: '11.1', description: '带有不定度量的空间' },
    { term: 'Lorentz空间', chapter: 11, section: '11.1', description: '一个负特征值的伪欧氏空间' },
    
    // Chapter 12
    { term: '陳邦彦', chapter: 12, section: '12.1', description: '密歇根州立大学教授，接触数论文合作者' },
    { term: '陈邦彦', chapter: 12, section: '12.1', description: '密歇根州立大学教授，接触数论文合作者' },
    { term: '陳邦彥', chapter: 12, section: '12.1', description: '密歇根州立大学教授，接触数论文合作者' },
    { term: '李世杰', chapter: 12, section: '12.1', description: '华南师范大学教授，接触数理论创始人' },
  ],
  en: [
    // Chapter 1
    { term: 'manifold', chapter: 1, section: '1.1', description: 'Space that locally looks like Euclidean space' },
    { term: 'topological space', chapter: 1, section: '1.2', description: 'Abstract framework for continuity' },
    { term: 'homeomorphism', chapter: 1, section: '1.2', description: 'Bijection preserving topology' },
    { term: 'smooth manifold', chapter: 1, section: '1.2', description: 'Manifold with smooth transition maps' },
    { term: 'Riemannian manifold', chapter: 1, section: '1.2', description: 'Smooth manifold with metric' },
    { term: 'chart', chapter: 1, section: '1.2', description: 'Local coordinate map' },
    { term: 'atlas', chapter: 1, section: '1.2', description: 'Collection of charts' },
    
    // Chapter 2
    { term: 'tangent space', chapter: 2, section: '2.1', description: 'Vector space tangent to M at p' },
    { term: 'normal space', chapter: 2, section: '2.1', description: 'Vector space orthogonal to tangent space' },
    { term: 'embedding', chapter: 2, section: '2.2', description: 'Topology-preserving map' },
    { term: 'immersion', chapter: 2, section: '2.2', description: 'Local embedding allowing self-intersection' },
    { term: 'submanifold', chapter: 2, section: '2.2', description: 'Manifold living inside another' },
    { term: 'Euclidean space', chapter: 2, section: '2.3', description: 'Real vector space with standard inner product' },
    { term: 'codimension', chapter: 2, section: '2.3', description: 'Ambient dimension minus submanifold dimension' },
    { term: 'direct sum', chapter: 2, section: '2.4', description: 'Decomposition into tangent and normal parts' },
    { term: 'second fundamental form', chapter: 2, section: '2.5', description: 'Measures how submanifold bends' },
    { term: 'shape operator', chapter: 2, section: '2.6', description: 'Tangent space version of h' },
    { term: 'Gauss formula', chapter: 2, section: '2.5', description: 'Decomposes ambient derivative' },
    { term: 'Weingarten formula', chapter: 2, section: '2.6', description: 'Decomposes normal vector derivative' },
    
    // Chapter 3
    { term: 'geodesic', chapter: 3, section: '3.1', description: 'Shortest path on manifold' },
    { term: 'geodesic curvature', chapter: 3, section: '3.2', description: 'Curve bending on manifold' },
    { term: 'unit tangent bundle', chapter: 3, section: '3.3', description: 'Set of all unit tangent vectors' },
    
    // Chapter 4
    { term: 'normal section', chapter: 4, section: '4.1', description: 'Intersection of affine subspace with manifold' },
    { term: 'affine subspace', chapter: 4, section: '4.1', description: 'Subspace spanned by point and directions' },
    
    // Chapter 5
    { term: 'contact number', chapter: 5, section: '5.2', description: 'Order of contact between geodesic and normal section' },
    { term: 'order of contact', chapter: 5, section: '5.1', description: 'Highest order where derivatives match' },
    { term: 'k-th order contact', chapter: 5, section: '5.1', description: 'First k derivatives are equal' },
    
    // Chapter 6
    { term: 'isotropic', chapter: 6, section: '6.1', description: 'Normal curvature length independent of direction' },
    { term: 'constant isotropic', chapter: 6, section: '6.3', description: 'Isotropic with λ constant on M' },
    { term: 'holomorphic curve', chapter: 6, section: '6.5', description: 'Curve parametrized by holomorphic functions' },
    { term: 'holomorphic function', chapter: 6, section: '6.5', description: 'Complex function satisfying Cauchy-Riemann' },
    { term: 'complex number', chapter: 6, section: '6.5', description: 'Number of form z = x + iy' },
    
    // Chapter 7
    { term: 'generalized helicoid', chapter: 7, section: '7.1', description: 'High-dimensional generalization of helicoid' },
    { term: 'helicoid', chapter: 7, section: '7.1', description: 'Minimal surface from rotating line' },
    { term: 'umbilical point', chapter: 7, section: '7.3', description: 'Point with equal normal curvature in all directions' },
    { term: 'pseudo-umbilical', chapter: 7, section: '7.3', description: 'Shape operator in H direction is scalar identity' },
    
    // Chapter 8
    { term: 'mean curvature', chapter: 8, section: '8.1', description: 'Average of second fundamental form' },
    { term: 'mean curvature vector', chapter: 8, section: '8.1', description: 'H = (1/n)tr(h)' },
    { term: 'parallel mean curvature', chapter: 8, section: '8.1', description: '∇⊥H = 0' },
    { term: 'Simons formula', chapter: 8, section: '8.2', description: 'Laplacian of second fundamental form' },
    { term: 'pinching theorem', chapter: 8, section: '8.3', description: 'Bounded curvature implies special submanifold' },
    { term: 'totally umbilical', chapter: 8, section: '8.3', description: 'Every point is umbilical' },
    
    // Chapter 9
    { term: 'line of curvature', chapter: 9, section: '9.1', description: 'Curve tangent to principal directions' },
    { term: 'total torsion', chapter: 9, section: '9.2', description: 'Integral of torsion along closed curve' },
    { term: 'torsion', chapter: 9, section: '9.1', description: 'How curve leaves osculating plane' },
    { term: 'Frenet frame', chapter: 9, section: '9.1', description: 'Tangent, normal, binormal of curve' },
    { term: 'ovaloid', chapter: 9, section: '9.2', description: 'Convex surface with positive Gaussian curvature' },
    
    // Chapter 10
    { term: 'isoperimetric section', chapter: 10, section: '10.1', description: 'Normal vector field with constant M₁(ξ)' },
    { term: 'parallel isoperimetric section', chapter: 10, section: '10.2', description: 'Isoperimetric section with D_Xξ = 0' },
    { term: 'compact submanifold', chapter: 10, section: '10.1', description: 'Bounded and closed submanifold' },
    
    // Chapter 11
    { term: 'pseudo-Euclidean space', chapter: 11, section: '11.1', description: 'Space with indefinite metric' },
    { term: 'Lorentz space', chapter: 11, section: '11.1', description: 'Pseudo-Euclidean with one negative eigenvalue' },
    
    // Chapter 12
    { term: 'Bang-Yen Chen', chapter: 12, section: '12.1', description: 'MSU professor, contact number co-author' },
    { term: 'Shi-Jie Li', chapter: 12, section: '12.1', description: 'SCNU professor, contact number theory founder' },
  ]
};

export default function SearchBox() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<typeof searchIndex.zh>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isZh = i18n.language === 'zh';
  const index = isZh ? searchIndex.zh : searchIndex.en;

  useEffect(() => {
    if (query.trim().length < 1) {
      setResults([]);
      return;
    }
    
    const q = query.toLowerCase();
    const filtered = index.filter(item => 
      item.term.toLowerCase().includes(q) || 
      item.description.toLowerCase().includes(q)
    ).slice(0, 10);
    
    setResults(filtered);
  }, [query, index]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (chapter: number, section: string) => {
    const sectionId = `section-${section}`;
    navigate(`/chapter/${chapter}#${sectionId}`);
    setQuery('');
    setIsOpen(false);
    // Scroll after navigation with a short delay for page render
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="flex items-center bg-slate-700 rounded-lg px-3 py-1.5">
        <svg className="w-4 h-4 text-slate-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder={isZh ? '搜索概念...' : 'Search concepts...'}
          className="bg-transparent border-none outline-none text-white text-sm w-40 placeholder-slate-400"
        />
      </div>
      
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-600 rounded-lg shadow-xl overflow-hidden z-50 min-w-[300px]">
          {results.map((result, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(result.chapter, result.section)}
              className="w-full px-4 py-3 text-left hover:bg-slate-700 border-b border-slate-700 last:border-b-0 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-cyan-400 font-medium">{result.term}</span>
                <span className="text-slate-500 text-xs">
                  {isZh ? '第' : 'Ch.'}{result.chapter} §{result.section}
                </span>
              </div>
              <p className="text-slate-400 text-sm mt-1 truncate">{result.description}</p>
            </button>
          ))}
        </div>
      )}
      
      {isOpen && query.trim().length > 0 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-600 rounded-lg shadow-xl p-4 z-50">
          <p className="text-slate-400 text-sm text-center">
            {isZh ? '未找到相关概念' : 'No concepts found'}
          </p>
        </div>
      )}
    </div>
  );
}
