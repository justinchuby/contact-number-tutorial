# Contact Number Interactive Tutorial
# 接触数理论互动教程

> 🤖 **AI-assisted project.** Claude Opus 4.5 (Anthropic) generated the initial version. Codex (OpenAI) later revised the interface and interactive visualizations, corrected several mathematical explanations against the original papers, and added source references. The project maintainer provided the papers, direction, and feedback.
>
> 🤖 **本项目由 AI 辅助完成。** 初版由 Claude Opus 4.5（Anthropic）生成。Codex（OpenAI）后续参与了界面和交互可视化的修改，并对照原论文校订了部分数学表述、补充了出处。项目维护者提供了原论文、方向和反馈。

---

An interactive bilingual (Chinese/English) web application teaching Contact Number theory in manifold geometry, based on the research of Professor Shi-Jie Li (李世杰) and Professor Bang-Yen Chen.

一个中英双语的互动教程webapp，介绍李世杰教授与陈邦彦教授合作提出的"接触数"理论。

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Three.js](https://img.shields.io/badge/Three.js-3D-green)
![Bilingual](https://img.shields.io/badge/Bilingual-中英-orange)
![AI-assisted by Claude Opus 4.5 and Codex](https://img.shields.io/badge/AI_Assisted-Claude_Opus_4.5_%2B_Codex-purple)

## ✨ Features / 功能特色

- 🎮 **Interactive 3D Visualizations** - Explore manifolds, geodesics, and contact number concepts in 3D
- 📖 **12 Comprehensive Chapters** - From manifold basics to advanced research topics
- 🌐 **Bilingual Support** - Full Chinese and English support
- 📐 **LaTeX Math Rendering** - Beautiful mathematical formulas with KaTeX
- 🎨 **Rich Analogies** - Pac-Man games, ant perspectives, orange slicing, and more
- 📚 **Based on 5 Original Papers** - Academic rigor with accessibility

## 📚 Chapter Structure / 章节结构

### Part 1: Foundations / 流形基础
1. **What is a Manifold?** - 从地球表面到抽象数学
2. **Submanifolds** - 切空间、法空间、第二基本形式
3. **Geodesics** - 流形上的"直线"
4. **Normal Sections** - 接触数的第二条曲线

### Part 2: Contact Number Theory / 接触数理论
5. **Contact Number: Core Definition** - 核心概念与交互可视化
6. **Main Theorems** - c#≥3 ⟺ 各向同性
7. **Classification & Discoveries** - 新的几何对象

### Part 3: Advanced Topics / 进阶内容
8. **Parallel Mean Curvature Vector** - Wang-Li 1998
9. **Total Torsion of Lines of Curvature** - Qin-Li 2002
10. **Isoperimetric Sections** - Wang-Li 2003
11. **Subsequent Developments** - 学术影响力

### Part 4: Summary / 总结
12. **Significance & Applications** - 致敬李世杰教授

## 🚀 Quick Start / 快速开始

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📄 Core Paper / 核心论文

Chen, B.-Y. & Li, S.-J. (2004). "The Contact Number of a Euclidean Submanifold"  
*Proceedings of the Edinburgh Mathematical Society*, 47, 69-100.

## 🛠 Tech Stack / 技术栈

- React 18 + TypeScript
- Vite
- Three.js + @react-three/fiber
- react-i18next (internationalization)
- KaTeX (math rendering)
- Tailwind CSS

## 📖 Additional Papers Covered / 涵盖的其他论文

- Wang & Li (1998): Parallel Mean Curvature Vector Submanifolds
- Qin & Li (2002): Total Torsion of Closed Lines of Curvature
- Wang & Li (2003): Isoperimetric Sections
- Chen & Li (2003): Ricci Curvature Pinching

## 📝 License

Educational use. Based on published academic research.
