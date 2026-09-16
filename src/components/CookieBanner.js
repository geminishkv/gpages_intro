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
