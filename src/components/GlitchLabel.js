import { useRef, useEffect, useState } from 'react';
import { useScreen } from '../context/ScreenContext';

const GLITCH_CHARS = '#@$%^&!?<>{}[]|/\\~*+=_';
const SPEED = 22;

// Section titles type themselves in with a glitch, once per mount: on desktop when
// their screen becomes active, in the document mode when they scroll into view.
export default function GlitchLabel({ text, className = '' }) {
  const ref = useRef(null);
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const ran = useRef(false);
  const { mode, active } = useScreen();

  useEffect(() => {
    const el = ref.current;
    if (!el || ran.current) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      ran.current = true;
      setDisplayed(text);
      setDone(true);
      return undefined;
    }

    let timer = null;
    let pause = null;
    function animate() {
      ran.current = true;
      const chars = text.split('');
      let i = 0;
      const glitchCount = 3;

      function next() {
        if (i >= chars.length) { setDone(true); return; }
        let g = 0;
        timer = setInterval(() => {
          if (g < glitchCount) {
            setDisplayed(text.slice(0, i) + GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]);
            g++;
          } else {
            clearInterval(timer);
            i++;
            setDisplayed(text.slice(0, i));
            pause = setTimeout(next, SPEED);
          }
        }, SPEED);
      }
      next();
    }

    if (mode === 'screens') {
      if (active) animate();
      // leaving the screen mid-typing: settle on the full title instead of a half-typed one
      return () => { clearInterval(timer); clearTimeout(pause); if (ran.current) setDone(true); };
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !ran.current) {
          obs.disconnect();
          animate();
        }
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => { obs.disconnect(); clearInterval(timer); clearTimeout(pause); };
  }, [text, mode, active]);

  return (
    <span ref={ref} className={className}>
      {done || !ran.current ? text : displayed}
      {!done && displayed.length > 0 && <span className="glitch-cursor">_</span>}
    </span>
  );
}
