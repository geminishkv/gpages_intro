import { useState, useEffect } from 'react';
import '../styles/CookieBanner.css';
import { useLang } from '../context/LangContext';
import { getConsent, setConsent } from '../lib/consent';

// The privacy page links to /#consent so a visitor can change an earlier choice.
const RESET_HASH = '#consent';

function resetRequested() {
  return window.location.hash === RESET_HASH;
}

export default function CookieBanner({ animDone }) {
  const [visible, setVisible] = useState(false);
  const { t } = useLang();
  const c = t.cookie;

  useEffect(() => {
    if (!animDone) return undefined;
    const forced = resetRequested();
    if (!forced && getConsent() !== null) return undefined;
    const timer = setTimeout(() => setVisible(true), forced ? 0 : 1800);
    return () => clearTimeout(timer);
  }, [animDone]);

  useEffect(() => {
    const onHash = () => { if (resetRequested()) setVisible(true); };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  function choose(value) {
    setConsent(value);
    setVisible(false);
    if (resetRequested()) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }

  if (!visible) return null;

  return (
    <div className="ata-consent" role="dialog" aria-label={c.title}>
      <div className="ata-consent__icon">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="8" cy="10" r="1.5" fill="currentColor" />
          <circle cx="15" cy="8" r="1" fill="currentColor" />
          <circle cx="13" cy="14" r="1.5" fill="currentColor" />
          <circle cx="9" cy="15" r="1" fill="currentColor" />
          <circle cx="16" cy="13" r="0.8" fill="currentColor" />
        </svg>
      </div>
      <p className="ata-consent__title">{c.title}</p>
      <p className="ata-consent__text">
        {c.text}
        <a href="/privacy/">{c.policyLink}</a>.
      </p>
      <div className="ata-consent__actions">
        <button type="button" className="ata-consent__btn ata-consent__btn--accept" onClick={() => choose('accepted')}>{c.accept}</button>
        <button type="button" className="ata-consent__btn ata-consent__btn--decline" onClick={() => choose('declined')}>{c.decline}</button>
      </div>
    </div>
  );
}
