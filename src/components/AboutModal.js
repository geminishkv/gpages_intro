import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import '../styles/AboutModal.css';
import { AVATAR_IMG } from '../constants';
import { useLang } from '../context/LangContext';

function TabProfile({ p }) {
  return (
    <div className="about-tab-content">
      <p className="about-meta">
        {p.location}
        <span className="about-meta__dot">·</span>
        {p.relocation}
      </p>

      <div className="about-info">
        <div className="about-info__item">
          <span className="about-info__label">{p.rolesLabel}</span>
          <span className="about-info__value">{p.rolesValue}</span>
        </div>
        <div className="about-info__item">
          <span className="about-info__label">{p.employmentLabel}</span>
          <span className="about-info__value">{p.employmentValue}</span>
        </div>
        <div className="about-info__item">
          <span className="about-info__label">{p.formatLabel}</span>
          <span className="about-info__value">{p.formatValue}</span>
        </div>
        <div className="about-info__item">
          <span className="about-info__label">{p.languagesLabel}</span>
          <span className="about-info__value">{p.languagesValue}</span>
        </div>
      </div>

      <div className="about-section">
        <div className="about-section__title">{p.summaryTitle}</div>
        <ul className="about-section__list">
          {p.summary.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>
    </div>
  );
}

function TabAchievements({ a }) {
  return (
    <div className="about-tab-content">
      <div className="about-section">
        <div className="about-section__title">{a.title}</div>
        <ul className="about-section__list">
          {a.items.map((item, i) => (
            <li key={i}>
              {item.text}
              {item.sub && (
                <ul className="about-section__sublist">
                  {item.sub.map((s, j) => <li key={j}>{s}</li>)}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function AboutModal({ isOpen, onClose }) {
  const [tab, setTab]   = useState(0);
  const modalRef        = useRef(null);
  const bodyRef         = useRef(null);
  const { t }           = useLang();
  const { tabs, closeLabel, profile, achievements } = t.about;

  /* закрытие по Escape */
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  /* focus trap */
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;
    const modal    = modalRef.current;
    const selector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusable = [...modal.querySelectorAll(selector)];
    if (focusable.length) focusable[0].focus();

    const trap = (e) => {
      if (e.key !== 'Tab') return;
      const all   = [...modal.querySelectorAll(selector)];
      const first = all[0];
      const last  = all[all.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
      }
    };

    modal.addEventListener('keydown', trap);
    return () => modal.removeEventListener('keydown', trap);
  }, [isOpen]);

  /* сброс состояния при закрытии */
  useEffect(() => {
    if (!isOpen) setTab(0);
  }, [isOpen]);

  /* сброс скролла при смене таба */
  const handleTabChange = (i) => {
    setTab(i);
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
  };

  return createPortal(
    <div
      className={`about-overlay${isOpen ? ' about-overlay--open' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="about-modal" ref={modalRef}>

        {/* ── Header ── */}
        <div className="about-modal__header">
          <div className="about-modal__identity">
            <img src={AVATAR_IMG} alt="Elijah S. Shmakov" className="about-modal__avatar" />
            <div className="about-modal__identity-text">
              <span className="about-modal__name">Elijah S. Shmakov</span>
              <span className="about-modal__role">AppSec &amp; DevSecOps Lead</span>
            </div>
          </div>
          <button className="about-modal__close" onClick={onClose} aria-label={closeLabel}>✕</button>
        </div>

        {/* ── Tabs ── */}
        <div className="about-tabs" role="tablist">
          {tabs.map((label, i) => (
            <button
              key={label}
              role="tab"
              aria-selected={tab === i}
              className={`about-tab${tab === i ? ' about-tab--active' : ''}`}
              onClick={() => handleTabChange(i)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── Body ── */}
        <div className="about-modal__body" ref={bodyRef} role="tabpanel">
          {tab === 0 && <TabProfile p={profile} />}
          {tab === 1 && <TabAchievements a={achievements} />}
        </div>

      </div>
    </div>,
    document.body
  );
}
