import { useState, useEffect } from 'react';
import '../styles/CookieBanner.css';
import { useLang } from '../context/LangContext';

const STORAGE_KEY = 'cookie_consent';

export default function CookieBanner({ animDone }) {
  const [visible, setVisible] = useState(false);
  const { t } = useLang();
  const c = t.cookie;

  useEffect(() => {
    if (!animDone) return;
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
      const timer = setTimeout(() => setVisible(true), 1800);
      return () => clearTimeout(timer);
    } catch { /* ignore */ }
  }, [animDone]);

  function accept() {
    setVisible(false);
    try { localStorage.setItem(STORAGE_KEY, 'accepted'); } catch { /* ignore */ }
  }

  function decline() {
    setVisible(false);
    try { localStorage.setItem(STORAGE_KEY, 'declined'); } catch { /* ignore */ }
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label={c.title}>
      <div className="cookie-banner__icon">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="8" cy="10" r="1.5" fill="currentColor" />
          <circle cx="15" cy="8" r="1" fill="currentColor" />
          <circle cx="13" cy="14" r="1.5" fill="currentColor" />
          <circle cx="9" cy="15" r="1" fill="currentColor" />
          <circle cx="16" cy="13" r="0.8" fill="currentColor" />
        </svg>
      </div>
      <p className="cookie-banner__title">{c.title}</p>
      <p className="cookie-banner__text">
        {c.text}
        <a href="/privacy/">{c.policyLink}</a>.
      </p>
      <div className="cookie-banner__actions">
        <button className="cookie-banner__btn cookie-banner__btn--accept" onClick={accept}>{c.accept}</button>
        <button className="cookie-banner__btn cookie-banner__btn--decline" onClick={decline}>{c.decline}</button>
      </div>
    </div>
  );
}
