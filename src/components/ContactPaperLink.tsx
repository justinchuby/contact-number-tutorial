import { useTranslation } from 'react-i18next';

const paperUrl = 'https://www.cambridge.org/core/journals/proceedings-of-the-edinburgh-mathematical-society/article/contact-number-of-a-euclidean-submanifold/26495A5260E08BDEAAB685F8B28388F5';

export default function ContactPaperLink({ reference }: { reference?: string }) {
  const { i18n } = useTranslation();
  const isZh = i18n.language === 'zh';
  return (
    <a href={paperUrl} target="_blank" rel="noopener noreferrer" className="inline-block text-sm font-medium text-teal-800 underline underline-offset-4">
      {reference ? `Chen–Li (2004) · ${reference}` : (isZh ? '阅读原论文' : 'Read the original paper')}
    </a>
  );
}
