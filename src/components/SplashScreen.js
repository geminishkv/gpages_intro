import { useState, useEffect } from 'react';
import '../styles/SplashScreen.css';

const IMG        = process.env.PUBLIC_URL + '/img/splash/pretitle.png';
const SHOW_MS    = 2400;
const GLITCH_MS  = 1400;
const FADE_MS    = 200;
const RESHOW_MS  = 15 * 60 * 1000; // 15 минут

function shouldShowSplash() {
  try {
    const ts = localStorage.getItem('splash_ts');
    if (!ts) return true;
    return Date.now() - Number(ts) > RESHOW_MS;
  } catch {
    return true;
  }
}

function markSplashShown() {
  try { localStorage.setItem('splash_ts', String(Date.now())); } catch { /* ignore */ }
}

export default function SplashScreen({ onDone }) {
  const [glitching, setGlitching] = useState(false);
  const [fading,    setFading]    = useState(false);

  useEffect(() => {
    if (!shouldShowSplash()) {
      onDone();
      return;
    }

    markSplashShown();

    const t1 = setTimeout(() => setGlitching(true),                       SHOW_MS);
    const t2 = setTimeout(() => setFading(true),                          SHOW_MS + GLITCH_MS);
    const t3 = setTimeout(onDone,                                         SHOW_MS + GLITCH_MS + FADE_MS);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className={`splash${fading ? ' splash--fade' : ''}${glitching ? ' splash--glitch' : ''}`}>
        <img src={IMG} alt="AppSECTA" className="splash__img" />
      </div>

      {glitching && (
        <>
          <div className="splash-layer splash-layer--red">
            <img src={IMG} alt="" aria-hidden="true" className="splash__img" />
          </div>
          <div className="splash-layer splash-layer--cyan">
            <img src={IMG} alt="" aria-hidden="true" className="splash__img" />
          </div>
          <div className="splash-layer splash-layer--flash" />
          <div className="splash-layer splash-layer--scanlines" />
        </>
      )}
    </>
  );
}
