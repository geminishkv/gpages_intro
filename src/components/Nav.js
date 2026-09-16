import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import '../styles/Nav.css';
import '../styles/LangSwitch.css';
import '../styles/LogoGlow.css';
import { LOGO_IMG } from '../constants';
import { useLang } from '../context/LangContext';

const SECTION_LINKS = ['blog', 'experience', 'skillset', 'interests'];

export default function Nav({ navRef, onAboutOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const { lang, setLang, t } = useLang();
  const n = t.nav;

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
      // reading progress line: whichever element actually scrolls
      const scroller = mainPage && mainPage.scrollHeight > mainPage.clientHeight ? mainPage : document.documentElement;
      const range = scroller.scrollHeight - scroller.clientHeight;
      nav.style.setProperty('--nav-progress', range > 0 ? String(Math.min(1, top / range)) : '0');
    };
    if (mainPage) mainPage.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (mainPage) mainPage.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', onScroll);
    };
  }, [navRef]);

  // Highlight the pill of the section in the middle of the viewport
  useEffect(() => {
    const els = SECTION_LINKS.map(id => document.getElementById(id)).filter(Boolean);
    if (!els.length || typeof IntersectionObserver === 'undefined') return undefined;
    const visible = new Map();
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => visible.set(e.target.id, e.isIntersecting));
      const current = SECTION_LINKS.find(id => visible.get(id));
      setActiveId(current ?? null);
    }, { rootMargin: '-40% 0px -55% 0px' });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const linkProps = (id) => (activeId === id ? { className: 'nav__link--active', 'aria-current': 'location' } : {});

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

  function LangToggle({ overlay = false }) {
    const isEn = lang === 'en';
    return (
      <div className={`lang-switch${overlay ? ' lang-switch--overlay' : ''}`}>
        <label className="lang-switch__outer">
          <input
            className="lang-switch__input"
            type="checkbox"
            checked={isEn}
            onChange={() => setLang(isEn ? 'ru' : 'en')}
            aria-label="Toggle language"
          />
          <div className="lang-switch__track">
            <span className={`lang-switch__label${!isEn ? ' lang-switch__label--active' : ''}`}>
              RU
              <span className="lang-switch__indicator" />
            </span>
            <span className={`lang-switch__label${isEn ? ' lang-switch__label--active' : ''}`}>
              EN
              <span className="lang-switch__indicator" />
            </span>
            <span className="lang-switch__knob" />
          </div>
        </label>
      </div>
    );
  }

  return (
    <>
      <nav ref={navRef} className="nav" style={{ opacity: 0 }} aria-label={n.ariaLabel}>
        <span className="nav__progress" aria-hidden="true" />
        <div className="nav__logo">
          <div className="logo-glow logo-glow--nav">
            <span className="logo-glow__blur logo-glow__blur--1" />
            <span className="logo-glow__blur logo-glow__blur--2" />
            <div className="logo-glow__inner">
              <img src={LOGO_IMG} alt="logo" />
            </div>
          </div>
          <span className="nav__brand">geminishkv</span>
        </div>

        {/* Desktop right side: links + lang toggle */}
        <div className="nav__right">
          <div className="nav__links">
            <button className="nav__link-btn" onClick={onAboutOpen}>{n.about}</button>
            <a href="/blog/" {...linkProps('blog')}>{n.blog}</a>
            <a href="#experience" {...linkProps('experience')}>{n.experience}</a>
            <a href="#skillset" {...linkProps('skillset')}>{n.skillset}</a>
            <a href="#interests" {...linkProps('interests')}>{n.interests}</a>
            <a href="https://my.idot.vip/geminishkv" target="_blank" rel="noreferrer">{n.nfcCard}</a>
            <a href="/privacy/" className="nav__link--secondary">{n.privacy}</a>
          </div>

          <LangToggle />

          <button
            className={`nav__burger${menuOpen ? ' nav__burger--open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <svg viewBox="0 0 32 32">
              <path className="nav__burger-line nav__burger-line--top" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22" />
              <path className="nav__burger-line" d="M7 16 27 16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Portal — outside nav to avoid transform stacking context bug */}
      {menuOpen && createPortal(
        <div className="nav__mobile-overlay">
          <button className="nav__burger nav__burger--open nav__burger--close" onClick={close} aria-label="Close menu">
            <svg viewBox="0 0 32 32">
              <path className="nav__burger-line nav__burger-line--top" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22" />
              <path className="nav__burger-line" d="M7 16 27 16" />
            </svg>
          </button>
          <LangToggle overlay />
          <button className="nav__link-btn" onClick={() => { onAboutOpen(); close(); }}>{n.about}</button>
          <a href="/blog/"      onClick={close}>{n.blog}</a>
          <a href="#experience" onClick={close}>{n.experience}</a>
          <a href="#skillset"   onClick={close}>{n.skillset}</a>
          <a href="#interests"  onClick={close}>{n.interests}</a>
          <a href="https://my.idot.vip/geminishkv" target="_blank" rel="noreferrer" className="nav__link--secondary" onClick={close}>{n.nfcCard}</a>
          <a href="/privacy/" className="nav__link--secondary" onClick={close}>{n.privacy}</a>
        </div>,
        document.body
      )}
    </>
  );
}
