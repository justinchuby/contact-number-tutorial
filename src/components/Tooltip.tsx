import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface TooltipProps {
  term: string;
  children: React.ReactNode;
}

// Mathematical term definitions (bilingual)
const definitions: Record<string, { zh: string; en: string }> = {
  // Basic topology
  'topological-space': {
    zh: '拓扑空间是一个集合X配上一族"开集"，满足：空集和全集是开集；任意开集的并是开集；有限个开集的交是开集。它是研究"连续性"的抽象框架，比度量空间更一般。',
    en: 'A topological space is a set X with a collection of "open sets" satisfying: empty set and X are open; union of any open sets is open; finite intersection of open sets is open. It\'s the abstract framework for studying "continuity", more general than metric spaces.'
  },
  'homeomorphism': {
    zh: '同胚映射是两个拓扑空间之间的双射，且它和它的逆映射都是连续的。直观理解：可以通过连续变形（拉伸、弯曲，但不能撕裂或粘合）把一个空间变成另一个。例如：咖啡杯≈甜甜圈（都有一个洞）。',
    en: 'A homeomorphism is a bijection between topological spaces where both it and its inverse are continuous. Intuitively: you can continuously deform (stretch, bend, but not tear or glue) one space into another. Example: coffee cup ≈ donut (both have one hole).'
  },
  'open-set': {
    zh: '开集是拓扑空间中的基本概念。直观上，开集是"没有边界点"的集合——集合中的每个点都有一个"小邻域"完全包含在集合内。例如：开区间(0,1)是开集，但闭区间[0,1]不是（端点没有邻域）。',
    en: 'An open set is a fundamental concept in topology. Intuitively, an open set has "no boundary points"—every point has a "small neighborhood" entirely within the set. Example: open interval (0,1) is open, but closed interval [0,1] is not (endpoints lack neighborhoods).'
  },
  
  // Manifold concepts
  'manifold': {
    zh: '流形是一个拓扑空间，局部看起来像欧氏空间ℝⁿ。例如：地球表面是2维流形（局部像平面），但整体是球形。n维流形的每个点附近都有一个坐标卡映射到ℝⁿ。',
    en: 'A manifold is a topological space that locally looks like Euclidean space ℝⁿ. Example: Earth\'s surface is a 2-manifold (locally flat), but globally spherical. Every point in an n-manifold has a coordinate chart mapping to ℝⁿ.'
  },
  'smooth-manifold': {
    zh: '光滑流形是配备了"光滑结构"的流形：相邻坐标卡之间的转换映射是无穷次可微的（C∞）。这让我们可以在流形上做微积分——定义切向量、微分形式等。',
    en: 'A smooth manifold is a manifold with a "smooth structure": transition maps between overlapping charts are infinitely differentiable (C∞). This allows calculus on manifolds—defining tangent vectors, differential forms, etc.'
  },
  'riemannian-manifold': {
    zh: '黎曼流形是配备了黎曼度量的光滑流形。黎曼度量在每个切空间定义了内积，让我们可以测量长度、角度和曲率。广义相对论中的时空就是（伪）黎曼流形。',
    en: 'A Riemannian manifold is a smooth manifold with a Riemannian metric. The metric defines an inner product on each tangent space, allowing measurement of lengths, angles, and curvature. Spacetime in General Relativity is a (pseudo-)Riemannian manifold.'
  },
  'chart': {
    zh: '坐标卡（Chart）是从流形的一个开集U到欧氏空间ℝⁿ的同胚映射φ: U → ℝⁿ。它给流形的这块区域赋予了"坐标"。就像世界地图的一页，把地球的一部分"展平"。',
    en: 'A chart is a homeomorphism φ: U → ℝⁿ from an open set U of the manifold to Euclidean space. It gives "coordinates" to this region. Like a page in a world atlas that "flattens" a part of Earth.'
  },
  'atlas': {
    zh: '图册（Atlas）是覆盖整个流形的坐标卡的集合。就像世界地图册由很多页组成，每页覆盖一部分区域，合起来覆盖整个地球。',
    en: 'An atlas is a collection of charts covering the entire manifold. Like a world atlas with many pages, each covering part of the region, together covering the whole Earth.'
  },
  
  // Submanifold concepts
  'submanifold': {
    zh: '子流形是"住在"另一个流形里的流形。例如：球面S²是E³的2维子流形。子流形继承了外部流形的部分结构，但有自己的维数。',
    en: 'A submanifold is a manifold "living inside" another manifold. Example: sphere S² is a 2-dimensional submanifold of E³. It inherits partial structure from the ambient manifold but has its own dimension.'
  },
  'embedding': {
    zh: '嵌入是把一个流形"放进"另一个流形的映射f: M → N，要求f是单射、光滑，且f(M)在N中"不自交"。例如：把圆嵌入平面（不能自交叉）。',
    en: 'An embedding is a map f: M → N "placing" one manifold into another, requiring f to be injective, smooth, and f(M) has "no self-intersection" in N. Example: embedding a circle in the plane (no self-crossing).'
  },
  'immersion': {
    zh: '浸入是允许"自交"的嵌入。映射仍是光滑的，但像可能自己交叉。例如：8字形是圆到平面的浸入（有一个交叉点）。浸入在局部是嵌入。',
    en: 'An immersion allows "self-intersection". The map is still smooth, but the image may cross itself. Example: figure-8 is an immersion of circle in plane (one crossing point). Locally, an immersion is an embedding.'
  },
  
  // Tangent and normal
  'tangent-space': {
    zh: '切空间T_pM是在点p处与流形M相切的所有向量构成的向量空间。直观上是"在p点可以沿着流形走的所有方向"。维数等于流形的维数n。',
    en: 'Tangent space T_pM is the vector space of all vectors tangent to manifold M at point p. Intuitively: "all directions you can walk along the manifold at p". Its dimension equals the manifold dimension n.'
  },
  'normal-space': {
    zh: '法空间T_p⊥M是与切空间正交的所有向量构成的空间。它指向"离开流形"的方向。维数 = 外部空间维数 - 流形维数 = 余维数。',
    en: 'Normal space T_p⊥M is the space of all vectors orthogonal to the tangent space. It points in directions "away from the manifold". Dimension = ambient dimension - manifold dimension = codimension.'
  },
  'codimension': {
    zh: '余维数 = 外部空间维数m - 子流形维数n。它表示法空间的维数，即"子流形缺少的维数"。例如：E³中的曲面余维数=1，E³中的曲线余维数=2。',
    en: 'Codimension = ambient dimension m - submanifold dimension n. It represents the normal space dimension, i.e., "missing dimensions" of the submanifold. Example: surface in E³ has codim=1, curve in E³ has codim=2.'
  },
  
  // Fundamental forms
  'second-fundamental-form': {
    zh: '第二基本形式h是一个映射h: T_pM × T_pM → T_p⊥M，测量子流形如何"弯曲"嵌入外部空间。输入两个切向量，输出它们造成的"弯曲"方向（法向量）。',
    en: 'Second fundamental form h is a map h: T_pM × T_pM → T_p⊥M measuring how the submanifold "bends" in ambient space. Input: two tangent vectors; Output: the "bending" direction they cause (normal vector).'
  },
  'shape-operator': {
    zh: '形状算子A_ξ是h的"对偶"：给定法方向ξ，A_ξ: T_pM → T_pM告诉我们沿ξ方向的弯曲如何影响切空间。它的特征值是主曲率。',
    en: 'Shape operator A_ξ is the "dual" of h: given normal direction ξ, A_ξ: T_pM → T_pM tells how bending in ξ direction affects tangent space. Its eigenvalues are principal curvatures.'
  },
  'mean-curvature': {
    zh: '平均曲率H是第二基本形式的"平均"：H = (1/n)tr(h)，或等价地是形状算子特征值的平均。H=0的曲面叫极小曲面（如肥皂膜）。',
    en: 'Mean curvature H is the "average" of second fundamental form: H = (1/n)tr(h), equivalently the average of shape operator eigenvalues. Surfaces with H=0 are minimal surfaces (like soap films).'
  },
  'principal-curvature': {
    zh: '主曲率是形状算子的特征值，表示曲面在各个方向的弯曲程度。球面各方向主曲率相同；马鞍面有一正一负的主曲率。',
    en: 'Principal curvatures are eigenvalues of the shape operator, representing bending degree in each direction. Sphere has equal principal curvatures in all directions; saddle surface has one positive, one negative.'
  },
  
  // Contact number specific
  'contact-number': {
    zh: '接触数c#是Chen-Li定义的几何不变量，测量子流形与切超球面的"接触程度"。接触数越高，子流形的对称性越强。c#≥3与各向同性等价。',
    en: 'Contact number c# is a geometric invariant defined by Chen-Li, measuring "degree of contact" between submanifold and tangent hyperspheres. Higher c# means stronger symmetry. c#≥3 is equivalent to isotropy.'
  },
  'isotropy': {
    zh: '各向同性指子流形在每点的"弯曲方式"在各方向是一致的。数学条件：⟨h(u,u), h(u,v)⟩ = 0 对所有正交单位向量u,v成立。',
    en: 'Isotropy means the "bending pattern" of submanifold at each point is uniform in all directions. Mathematical condition: ⟨h(u,u), h(u,v)⟩ = 0 for all orthonormal vectors u,v.'
  },
  'hypersphere': {
    zh: '超球面是高维欧氏空间中到某点等距的点的集合。在E³中是球面，在E⁴中是3维超球面S³。公式：|x - c| = r。',
    en: 'A hypersphere is the set of points equidistant from a center in high-dimensional Euclidean space. In E³ it\'s a sphere, in E⁴ it\'s the 3-sphere S³. Formula: |x - c| = r.'
  },
  
  // Holomorphic
  'holomorphic-function': {
    zh: '全纯函数是复可微的函数f: ℂ → ℂ，满足Cauchy-Riemann方程。它是"最好"的复函数——无限可微、解析、保角。例：z², eᶻ, sin(z)。',
    en: 'A holomorphic function is complex-differentiable f: ℂ → ℂ, satisfying Cauchy-Riemann equations. It\'s the "best" complex function—infinitely differentiable, analytic, conformal. Examples: z², eᶻ, sin(z).'
  },
  'holomorphic-curve': {
    zh: '全纯曲线是由全纯函数参数化的曲线γ(z) = (f(z), g(z))，其中f,g是全纯的。它是ℂ²（或E⁴）中的极小曲面，接触数恰好为3。',
    en: 'A holomorphic curve is a curve parametrized by holomorphic functions γ(z) = (f(z), g(z)), where f,g are holomorphic. It\'s a minimal surface in ℂ² (or E⁴) with contact number exactly 3.'
  },
  
  // Other
  'euclidean-space': {
    zh: '欧氏空间Eⁿ（或ℝⁿ）是配备标准内积的n维实向量空间。内积⟨x,y⟩ = Σxᵢyᵢ定义了长度和角度。它是"平坦"的——曲率为零。',
    en: 'Euclidean space Eⁿ (or ℝⁿ) is n-dimensional real vector space with standard inner product. The inner product ⟨x,y⟩ = Σxᵢyᵢ defines lengths and angles. It\'s "flat"—zero curvature.'
  },
  'geodesic': {
    zh: '测地线是流形上两点之间的"最短路径"（更准确地说是局部最短）。平面上是直线，球面上是大圆弧。它是直线在弯曲空间的推广。',
    en: 'A geodesic is the "shortest path" between two points on a manifold (more precisely, locally shortest). On plane it\'s a straight line, on sphere it\'s a great circle arc. It generalizes straight lines to curved spaces.'
  },
  'curvature': {
    zh: '曲率测量空间或曲线的"弯曲程度"。圆的曲率=1/半径。曲面有多种曲率：高斯曲率、平均曲率、主曲率。平坦空间曲率为零。',
    en: 'Curvature measures the "bending degree" of space or curve. Circle curvature = 1/radius. Surfaces have various curvatures: Gaussian, mean, principal curvatures. Flat space has zero curvature.'
  },
  'gaussian-curvature': {
    zh: '高斯曲率K是两个主曲率的乘积：K = κ₁·κ₂。球面K>0，平面K=0，马鞍面K<0。高斯绝妙定理：K是内在不变量——只依赖于度量，不依赖于嵌入方式。',
    en: 'Gaussian curvature K is the product of two principal curvatures: K = κ₁·κ₂. Sphere K>0, plane K=0, saddle K<0. Theorema Egregium: K is intrinsic—depends only on metric, not embedding.'
  },
  'connection': {
    zh: '联络（连络）是在流形上定义"平行移动"的工具。它告诉我们如何沿着曲线移动向量，使得向量保持"平行"。Levi-Civita联络是黎曼流形的标准联络。',
    en: 'A connection is a tool for defining "parallel transport" on manifolds. It tells how to move vectors along curves while keeping them "parallel". Levi-Civita connection is the standard connection on Riemannian manifolds.'
  },
  'parallel-transport': {
    zh: '平行移动是沿曲线移动向量的方式，使向量"尽可能保持不变"。在平面上直接平移即可，但在弯曲空间中会产生微妙的效果（例如球面上的向量绕一圈会旋转）。',
    en: 'Parallel transport moves vectors along curves while "keeping them as unchanged as possible". On plane it\'s direct translation, but on curved spaces subtle effects occur (e.g., vectors on sphere rotate after a loop).'
  },
  'umbilical': {
    zh: '脐点是曲面上各方向主曲率相同的点，即形状算子A = λI（恒等的倍数）。球面的每个点都是脐点。椭球只有4个脐点。',
    en: 'An umbilical point is where all principal curvatures are equal in all directions, i.e., shape operator A = λI (scalar identity). Every point on a sphere is umbilical. An ellipsoid has only 4 umbilical points.'
  },
  'pseudo-umbilical': {
    zh: '伪脐是更弱的条件：只要求沿平均曲率方向H的形状算子满足A_H = λI。球面是伪脐的，但存在非球面的伪脐曲面（Chen-Li在E⁶中发现）。',
    en: 'Pseudo-umbilical is a weaker condition: only requiring shape operator in mean curvature direction H satisfies A_H = λI. Spheres are pseudo-umbilical, but non-spherical pseudo-umbilical surfaces exist (Chen-Li found in E⁶).'
  },
  'minimal-surface': {
    zh: '极小曲面是平均曲率H=0的曲面。它局部是面积最小的曲面（如肥皂膜）。全纯曲线都是极小曲面。著名例子：悬链面、螺旋面。',
    en: 'A minimal surface has mean curvature H=0. It locally minimizes area (like soap films). All holomorphic curves are minimal surfaces. Famous examples: catenoid, helicoid.'
  },
  'helicoid': {
    zh: '螺旋面是由直线沿轴旋转同时上升产生的曲面，参数式(u cos v, u sin v, av)。它是极小曲面，与悬链面局部等距。在接触数理论中，广义螺旋面是重要的分类对象。',
    en: 'A helicoid is generated by a line rotating while rising along an axis, parametrized as (u cos v, u sin v, av). It\'s a minimal surface, locally isometric to catenoid. In contact number theory, generalized helicoids are important classification objects.'
  },
};

export default function Tooltip({ term, children }: TooltipProps) {
  const { i18n } = useTranslation();
  const isZh = i18n.language === 'zh';
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const definition = definitions[term];
  
  useEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      
      let left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
      let top = triggerRect.top - tooltipRect.height - 8;
      
      // Keep tooltip within viewport
      if (left < 10) left = 10;
      if (left + tooltipRect.width > window.innerWidth - 10) {
        left = window.innerWidth - tooltipRect.width - 10;
      }
      if (top < 10) {
        top = triggerRect.bottom + 8;
      }
      
      setPosition({ top, left });
    }
  }, [isVisible]);

  if (!definition) {
    console.warn(`Tooltip: No definition found for term "${term}"`);
    return <>{children}</>;
  }

  return (
    <>
      <span
        ref={triggerRef}
        className="text-cyan-400 border-b border-dashed border-cyan-400/50 cursor-help hover:text-cyan-300 hover:border-cyan-300 transition-colors"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </span>
      {isVisible && (
        <div
          ref={tooltipRef}
          className="fixed z-50 max-w-sm p-3 bg-slate-800 border border-cyan-500/50 rounded-lg shadow-xl text-sm"
          style={{ top: position.top, left: position.left }}
        >
          <div className="text-cyan-400 font-semibold mb-1 text-xs uppercase tracking-wide">
            {isZh ? '术语解释' : 'Term Definition'}
          </div>
          <p className="text-slate-300 leading-relaxed">
            {isZh ? definition.zh : definition.en}
          </p>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-800 border-r border-b border-cyan-500/50 rotate-45" />
        </div>
      )}
    </>
  );
}

// Export a list of available terms for reference
export const availableTerms = Object.keys(definitions);
