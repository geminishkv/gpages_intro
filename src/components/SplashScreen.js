import { useState, useEffect } from 'react';
import './SplashScreen.css';

const IMG = process.env.PUBLIC_URL + '/pretitle.png';
const SHOW_MS = 3200;
const FADE_MS = 500;

export default function SplashScreen({ onDone }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), SHOW_MS);
    const t2 = setTimeout(onDone, SHOW_MS + FADE_MS);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div className={`splash${fading ? ' splash--fade' : ''}`}>
      <img src={IMG} alt="AppSECTA" className="splash__img" />
    </div>
  );
}
