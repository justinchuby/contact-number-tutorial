import { useTranslation } from 'react-i18next';
import SearchBox from './SearchBox';

export default function Header() {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'zh' ? 'en' : 'zh';
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="h-14 bg-slate-800 text-white flex items-center justify-between px-6 fixed top-0 left-64 right-0 z-10">
      <div className="flex items-center gap-4">
        <span className="text-cyan-400 font-semibold">Contact Number</span>
        <span className="text-slate-400 text-sm">|</span>
        <span className="text-slate-300 text-sm">{t('app.subtitle')}</span>
      </div>
      <div className="flex items-center gap-4">
        <SearchBox />
        <button
          onClick={toggleLanguage}
          className="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 text-sm transition-colors"
        >
          {i18n.language === 'zh' ? 'English' : '中文'}
        </button>
      </div>
    </header>
  );
}
