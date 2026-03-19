import { useState, useEffect } from 'react';
import '../styles/SplashScreen.css';

const IMG       = process.env.PUBLIC_URL + '/img/splash/pretitle.png';
const SHOW_MS   = 1600;
const GLITCH_MS = 1400;
const FADE_MS   = 200;

export default function SplashScreen({ onDone }) {
  const [glitching, setGlitching] = useState(false);
  const [fading,    setFading]    = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setGlitching(true),                        SHOW_MS);
    const t2 = setTimeout(() => setFading(true),                           SHOW_MS + GLITCH_MS);
    const t3 = setTimeout(onDone,                                          SHOW_MS + GLITCH_MS + FADE_MS);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  // eslint-disable-line
  }, []);

  return (
    <>
      {/* Основной экран — на нём clip-path + translate рвёт весь экран */}
      <div className={`splash${fading ? ' splash--fade' : ''}${glitching ? ' splash--glitch' : ''}`}>
        <img src={IMG} alt="AppSECTA" className="splash__img" />
      </div>

      {/* Оверлеи вне .splash — не обрезаются его clip-path */}
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
