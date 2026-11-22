import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import ChapterContents from './ChapterContents';

export default function Layout() {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  // Scroll to section or top on navigation
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const frame = requestAnimationFrame(() => {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ block: 'start' });
          if (!target.hasAttribute('tabindex')) target.tabIndex = -1;
          target.focus({ preventScroll: true });
        } else {
          window.scrollTo(0, 0);
        }
      });
      return () => cancelAnimationFrame(frame);
    } else {
      // Scroll both window and main container to top
      window.scrollTo(0, 0);
      if (mainRef.current) {
        mainRef.current.scrollTo(0, 0);
      }
    }
  }, [location.key, location.pathname, location.hash]);

  return (
    <div className="article-shell min-h-screen text-stone-900 flex flex-col">
      <Sidebar />
      <Header />
      <main ref={mainRef} className="lg:ml-64 mt-14 p-4 lg:p-8 flex-grow">
        <ChapterContents key={location.pathname} mainRef={mainRef} />
        <Outlet />
      </main>
      <footer className="lg:ml-64 py-6 px-8 border-t border-amber-200/80 bg-amber-50/80">
        <div className="text-center text-slate-500 text-sm">
          <p className="mb-1">
             本教程内容由 AI 辅助总结生成 | This tutorial content was AI-assisted and generated
          </p>
          <p className="text-slate-600 text-xs mb-2">
            Model: Claude Opus 4.5 / 4.6 (Anthropic) + Codex (OpenAI) · 基于李世杰教授论文整理
          </p>
          <a
            href="https://github.com/justinchuby/manifold-tutorial"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-slate-500 hover:text-cyan-400 transition-colors text-xs"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
