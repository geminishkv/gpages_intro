import { useState, useEffect } from 'react';
import '../styles/NoticeBar.css';
import { useLang } from '../context/LangContext';

const SESSION_KEY = 'notice_dismissed';

export default function NoticeBar({ animDone }) {
  const [visible, setVisible] = useState(false);
  const { t } = useLang();
  const n = t.notice;

  // Show notice only after the entry animation completes
  useEffect(() => {
    if (!animDone) return;
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
      const timer = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(timer);
    } catch { /* ignore */ }
  }, [animDone]);

  function dismiss() {
    setVisible(false);
    try { sessionStorage.setItem(SESSION_KEY, '1'); } catch { /* ignore */ }
  }

  return (
    <div className={`notice-bar${visible ? ' notice-bar--visible' : ''}`} role="region" aria-label={n.ariaLabel}>
      <div className="notice-bar__inner">
        <div className="notice-bar__body">
          <p className="notice-bar__title">{n.title}</p>
          <div className="notice-bar__text">
            {n.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
        <button className="notice-bar__close" onClick={dismiss}>{n.dismiss}</button>
      </div>
    </div>
  );
}
