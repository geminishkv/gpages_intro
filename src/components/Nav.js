import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import '../styles/Nav.css';
import { LOGO_IMG } from '../constants';

export default function Nav({ navRef, onAboutOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const close = () => setMenuOpen(false);

  // Блокируем скролл — iOS Safari требует position:fixed на body
  useEffect(() => {
    if (menuOpen) {
      const y = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top      = `-${y}px`;
      document.body.style.width    = '100%';
    } else {
      const top = parseInt(document.body.style.top || '0', 10);
      document.body.style.position = '';
      document.body.style.top      = '';
      document.body.style.width    = '';
      window.scrollTo(0, -top);
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top      = '';
      document.body.style.width    = '';
    };
  }, [menuOpen]);

  return (
    <>
      <nav ref={navRef} className="nav" style={{ opacity: 0 }}>
        <div className="nav__logo">
          <img src={LOGO_IMG} alt="logo" className="nav__logo-img" />
          <span className="nav__brand">geminishkv</span>
        </div>

        {/* Desktop links */}
        <div className="nav__links">
          <button className="nav__link-btn" onClick={onAboutOpen}>ABOUT</button>
          <a href="https://my.idot.vip/geminishkv" target="_blank" rel="noreferrer">NFC CARD</a>
        </div>

        <button
          className={`nav__burger${menuOpen ? ' nav__burger--open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Portal — outside nav to avoid transform stacking context bug */}
      {menuOpen && createPortal(
        <div className="nav__mobile-overlay">
          <button className="nav__mobile-close" onClick={close} aria-label="Close menu">✕</button>
          <button className="nav__link-btn" onClick={() => { onAboutOpen(); close(); }}>ABOUT</button>
          <a href="https://my.idot.vip/geminishkv" target="_blank" rel="noreferrer" onClick={close}>NFC CARD</a>
          </div>,
        document.body
      )}
    </>
  );
}
