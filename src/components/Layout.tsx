import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Sidebar />
      <Header />
      <main className="ml-64 mt-14 p-8 flex-grow">
        <Outlet />
      </main>
      <footer className="ml-64 py-6 px-8 border-t border-slate-800 bg-slate-900/50">
        <div className="text-center text-slate-500 text-sm">
          <p className="mb-1">
            🤖 本教程内容由 AI 辅助总结生成 | This tutorial content was AI-assisted and generated
          </p>
          <p className="text-slate-600 text-xs">
            Model: Claude Sonnet 4 (Anthropic) · 基于李世杰教授论文整理
          </p>
        </div>
      </footer>
    </div>
  );
}
