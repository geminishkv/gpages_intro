import { useState, useEffect } from 'react';
import '../styles/NoticeBar.css';
import { useLang } from '../context/LangContext';

const TS_KEY    = 'notice_ts';
const RESHOW_MS = 45 * 60 * 1000; // legal notice: shown again after 45 minutes (same as the course site)

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
    <div className={`ata-legal${visible ? ' ata-legal--visible' : ''}`} role="region" aria-label={n.ariaLabel}>
      <div className="ata-legal__inner">
        <div className="ata-legal__body">
          <p className="ata-legal__title">{n.title}</p>
          <div className="ata-legal__text">
            {n.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <div className="ata-legal__disclaimer">{n.disclaimer}</div>
        </div>
        <button className="ata-legal__close" onClick={dismiss}>{n.dismiss}</button>
      </div>
    </div>
  );
}
