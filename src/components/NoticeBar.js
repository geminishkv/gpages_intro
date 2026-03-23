import { useState, useEffect } from 'react';
import '../styles/NoticeBar.css';

const SESSION_KEY = 'notice_dismissed';

export default function NoticeBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(SESSION_KEY)) {
        // небольшая задержка, чтобы не мешать splash/анимации входа
        const t = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(t);
      }
    } catch { /* ignore */ }
  }, []);

  function dismiss() {
    setVisible(false);
    try { sessionStorage.setItem(SESSION_KEY, '1'); } catch { /* ignore */ }
  }

  return (
    <div className={`notice-bar${visible ? ' notice-bar--visible' : ''}`} role="region" aria-label="Уведомление">
      <div className="notice-bar__inner">
        <div className="notice-bar__body">
          <p className="notice-bar__title">Уведомление</p>
          <div className="notice-bar__text">
            <p>Вся информация в материалах данного профиля, а также материалов включенных (согласно применимым формулировкам действующего законодательства РФ), то есть любые текстовых, графических произведений, — рассматривается исключительно в ознакомительных целях.</p>
            <p>Любое использование представленной информации посредством данного профиля и/или любых текстовых, графических произведений, на практике без получения предварительного согласования на использование, подпадает под действие действующего законодательства РФ.</p>
            <p>Автор не несет ответственности за любой возможный вред, причиненный предоставляемыми материалами, как любыми текстовыми, графическими произведениями.</p>
            <p>Любые текстовые, графические произведения, включая ссылки носят ознакомительный характер в цели поделиться знаниями в продуктовой безопасности.</p>
          </div>
        </div>
        <button className="notice-bar__close" onClick={dismiss}>Понятно</button>
      </div>
    </div>
  );
}
