import { useEffect, useState, type RefObject } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function ChapterContents({ mainRef }: { mainRef: RefObject<HTMLElement | null> }) {
  const { i18n } = useTranslation();
  const isZh = i18n.language === 'zh';
  const [headings, setHeadings] = useState<{ id: string; title: string }[]>([]);

  useEffect(() => {
    // Read the rendered headings after navigation and language changes.
    const frame = requestAnimationFrame(() => {
      const elements = mainRef.current?.querySelectorAll('h2[id^="section-"]') ?? [];
      setHeadings(Array.from(elements, (element) => ({
        id: element.id,
        title: element.textContent.trim(),
      })));
    });
    return () => cancelAnimationFrame(frame);
  }, [mainRef, i18n.language]);

  if (!headings.length) return null;

  return (
    <details className="mx-auto mb-5 max-w-4xl rounded-xl border border-amber-900/15 bg-[#fffaf1]/80 px-4 py-2.5 text-sm text-teal-900">
      <summary className="cursor-pointer font-semibold">{isZh ? '本章目录' : 'In this chapter'}</summary>
      <nav aria-label={isZh ? '本章目录' : 'Chapter contents'} className="mt-2">
        <ul className="space-y-1">
          {headings.map(({ id, title }) => (
            <li key={id}>
              <Link to={{ hash: `#${id}` }} className="block rounded px-2 py-1.5 hover:bg-amber-900/5 hover:underline">
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}
