import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import '../styles/Nav.css';
import { LOGO_IMG } from '../constants';
import { useLang } from '../context/LangContext';

export default function Nav({ navRef, onAboutOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang } = useLang();

  const close = () => setMenuOpen(false);

  // Glass nav effect on scroll
  useEffect(() => {
    const nav = navRef?.current;
    if (!nav) return;
    const mainPage = nav.closest('.main-page');
    const onScroll = () => {
      const top = Math.max(
        mainPage ? mainPage.scrollTop : 0,
        window.scrollY
      );
      nav.classList.toggle('nav--scrolled', top > 10);
    };
    if (mainPage) mainPage.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (mainPage) mainPage.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', onScroll);
    };
  }, [navRef]);

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

  function LangToggle({ className = '' }) {
    return (
      <div className={`nav__lang${className ? ` ${className}` : ''}`}>
        <button
          className={`nav__lang-btn${lang === 'ru' ? ' nav__lang-btn--active' : ''}`}
          onClick={() => setLang('ru')}
        >RU</button>
        <span className="nav__lang-sep">·</span>
        <button
          className={`nav__lang-btn${lang === 'en' ? ' nav__lang-btn--active' : ''}`}
          onClick={() => setLang('en')}
        >EN</button>
      </div>
    );
  }

  return (
    <>
      <nav ref={navRef} className="nav" style={{ opacity: 0 }}>
        <div className="nav__logo">
          <img src={LOGO_IMG} alt="logo" className="nav__logo-img" />
          <span className="nav__brand">geminishkv</span>
        </div>

        {/* Desktop right side: links + lang toggle */}
        <div className="nav__right">
          <div className="nav__links">
            <button className="nav__link-btn" onClick={onAboutOpen}>ABOUT</button>
            <a href="https://hh.ru/resume/af4cc9ceff086141d00039ed1f4b4a6c35706f" target="_blank" rel="noreferrer">RESUME</a>
            <a href="#blog">BLOG</a>
            <a href="#experience">EXPERIENCE</a>
            <a href="#skillset">SKILLSET</a>
            <a href="#interests">INTERESTS</a>
            <a href="https://my.idot.vip/geminishkv" target="_blank" rel="noreferrer">NFC CARD</a>
          </div>

          <LangToggle />

          <button
            className={`nav__burger${menuOpen ? ' nav__burger--open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Portal — outside nav to avoid transform stacking context bug */}
      {menuOpen && createPortal(
        <div className="nav__mobile-overlay">
          <button className="nav__mobile-close" onClick={close} aria-label="Close menu">✕</button>
          <button className="nav__link-btn" onClick={() => { onAboutOpen(); close(); }}>ABOUT</button>
          <a href="https://hh.ru/resume/af4cc9ceff086141d00039ed1f4b4a6c35706f" target="_blank" rel="noreferrer" onClick={close}>RESUME</a>
          <a href="#blog"       onClick={close}>BLOG</a>
          <a href="#experience" onClick={close}>EXPERIENCE</a>
          <a href="#skillset"   onClick={close}>SKILLSET</a>
          <a href="#interests"  onClick={close}>INTERESTS</a>
          <a href="https://my.idot.vip/geminishkv" target="_blank" rel="noreferrer" className="nav__link--secondary" onClick={close}>NFC CARD</a>
          <LangToggle className="nav__lang--overlay" />
        </div>,
        document.body
      )}
    </>
  );
}
