import { useState, useEffect } from 'react';
import '../styles/NoticeBar.css';
import { useLang } from '../context/LangContext';

const SESSION_KEY = 'notice_dismissed';

export default function NoticeBar() {
  const [visible, setVisible] = useState(false);
  const { t } = useLang();
  const n = t.notice;

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(SESSION_KEY)) {
        const timer = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch { /* ignore */ }
  }, []);

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
