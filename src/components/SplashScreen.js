import { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/SplashScreen.css';

const IMG        = process.env.PUBLIC_URL + '/img/splash/pretitle.svg';
const DURATION   = 3500;
const FADE_MS    = 400;
const RESHOW_MS  = 30 * 60 * 1000;

function shouldShow() {
  try {
    const ts = localStorage.getItem('splash_ts');
    if (!ts) return true;
    return Date.now() - Number(ts) > RESHOW_MS;
  } catch { return true; }
}

function markShown() {
  try { localStorage.setItem('splash_ts', String(Date.now())); } catch {}
}

/* ── Brand shader (Canvas2D, no Three.js) ── */
function ShaderCanvas() {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);
  const startRef = useRef(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const t = (Date.now() - startRef.current) * 0.001;
    const cx = w / 2;
    const cy = h / 2;

    const imageData = ctx.createImageData(w, h);
    const data = imageData.data;
    const step = 2; // 2x2 blocks for perf

    for (let y = 0; y < h; y += step) {
      for (let x = 0; x < w; x += step) {
        const ux = (x - cx) / (Math.min(w, h) * 0.5);
        const uy = (y - cy) / (Math.min(w, h) * 0.5);
        const dist = Math.sqrt(ux * ux + uy * uy);

        let r = 0, g = 0, b = 0;
        for (let i = 0; i < 4; i++) {
          const fi = i * i;
          const wave = Math.abs(
            ((t * 0.25 + i * 0.015) % 1) * 4.0 - dist + ((ux + uy) % 0.2) * 0.5
          );
          const intensity = 0.003 * fi / (wave + 0.001);
          r += intensity * 1.2;
          g += intensity * 0.35;
          b += intensity * 0.08;
        }

        r = Math.min(255, r * 255);
        g = Math.min(255, g * 255);
        b = Math.min(255, b * 255);

        for (let dy = 0; dy < step && y + dy < h; dy++) {
          for (let dx = 0; dx < step && x + dx < w; dx++) {
            const i2 = ((y + dy) * w + (x + dx)) * 4;
            data[i2] = r; data[i2 + 1] = g; data[i2 + 2] = b; data[i2 + 3] = 255;
          }
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);
    frameRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = Math.min(window.innerWidth, 960);
      canvas.height = Math.min(window.innerHeight, 720);
    };
    resize();
    window.addEventListener('resize', resize);
    startRef.current = Date.now();
    frameRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [draw]);

  return <canvas ref={canvasRef} className="splash__shader" />;
}

export default function SplashScreen({ onDone }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!shouldShow()) { onDone(); return; }
    markShown();

    const t1 = setTimeout(() => setFading(true), DURATION);
    const t2 = setTimeout(onDone, DURATION + FADE_MS);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []); // eslint-disable-line

  const reduced = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div className={`splash${fading ? ' splash--fade' : ''}`}>
      {!reduced && <ShaderCanvas />}
      <img src={IMG} alt="AppSECTA" className="splash__img" />
    </div>
  );
}
