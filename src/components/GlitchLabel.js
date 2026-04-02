import { useRef, useEffect, useState } from 'react';

const GLITCH_CHARS = '#@$%^&!?<>{}[]|/\\~*+=_';

export default function GlitchLabel({ text, className = '' }) {
  const ref = useRef(null);
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const ran = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || ran.current) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayed(text);
      setDone(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !ran.current) {
          ran.current = true;
          obs.disconnect();
          animate();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [text]);

  function animate() {
    const chars = text.split('');
    let i = 0;
    const glitchCount = 3;
    const speed = 35;

    function next() {
      if (i >= chars.length) {
        setDone(true);
        return;
      }

      let g = 0;
      const timer = setInterval(() => {
        if (g < glitchCount) {
          const glitchChar = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          setDisplayed(text.slice(0, i) + glitchChar);
          g++;
        } else {
          clearInterval(timer);
          i++;
          setDisplayed(text.slice(0, i));
          setTimeout(next, speed);
        }
      }, speed);
    }

    next();
  }

  return (
    <span ref={ref} className={className}>
      {done ? text : displayed}
      {!done && displayed.length > 0 && <span className="glitch-cursor">_</span>}
    </span>
  );
}
