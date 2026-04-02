import { useEffect, useRef, useState } from 'react';
import '../styles/Stats.css';
import { useLang } from '../context/LangContext';

function Counter({ value, suffix, label, active }) {
  const [display, setDisplay] = useState(0);
  const frameRef = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!active) return;
    if (hasRun.current) {
      // Language switched after animation — show final value immediately
      setDisplay(value);
      return;
    }
    hasRun.current = true;
    const duration = Math.max(1200, value * 120);
    const start    = performance.now();
    let prev = -1;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      const next     = Math.round(eased * value);
      if (next !== prev) {
        prev = next;
        setDisplay(next);
      }
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [active, value]);

  return (
    <div className="stat-item">
      <span className="stat-item__value">{display}{suffix}</span>
      <span className="stat-item__label">{label}</span>
    </div>
  );
}

export default function Stats({ active }) {
  const { t } = useLang();
  return (
    <div className="stats">
      {t.stats.map((s, i) => (
        <Counter key={i} value={s.value} suffix={s.suffix} label={s.label} active={active} />
      ))}
    </div>
  );
}
