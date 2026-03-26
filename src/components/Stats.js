import { useEffect, useRef, useState } from 'react';
import '../styles/Stats.css';
import { useLang } from '../context/LangContext';

function Counter({ value, suffix, label, active }) {
  const [display, setDisplay] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const duration = 1200;
    const start    = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
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
      {t.stats.map((s) => (
        <Counter key={s.label} value={s.value} suffix={s.suffix} label={s.label} active={active} />
      ))}
    </div>
  );
}
