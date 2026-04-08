import { useState, useEffect } from 'react';
import '../styles/NoticeBar.css';
import { useLang } from '../context/LangContext';

const TS_KEY    = 'notice_ts';
const RESHOW_MS = 15 * 60 * 1000; // 15 минут

function shouldShow() {
  try {
    const ts = localStorage.getItem(TS_KEY);
    if (!ts) return true;
    return Date.now() - Number(ts) > RESHOW_MS;
  } catch { return true; }
}

export default function NoticeBar({ animDone }) {
  const [visible, setVisible] = useState(false);
  const { t } = useLang();
  const n = t.notice;

  useEffect(() => {
    if (!animDone) return;
    if (!shouldShow()) return;
    const timer = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(timer);
  }, [animDone]);

  function dismiss() {
    setVisible(false);
    try { localStorage.setItem(TS_KEY, String(Date.now())); } catch { /* ignore */ }
  }

  return (
    <div className={`notice-bar${visible ? ' notice-bar--visible' : ''}`} role="region" aria-label={n.ariaLabel}>
      <div className="notice-bar__inner">
        <div className="notice-bar__body">
          <p className="notice-bar__title">{n.title}</p>
          <div className="notice-bar__text">
            {n.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <div className="notice-bar__disclaimer">{n.disclaimer}</div>
        </div>
        <button className="notice-bar__close" onClick={dismiss}>{n.dismiss}</button>
      </div>
    </div>
  );
}
