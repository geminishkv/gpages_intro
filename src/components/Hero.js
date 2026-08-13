import '../styles/Hero.css';
import '../styles/Mac.css';
import '../styles/MacCSS.css';
import '../styles/Buttons.css';
import BrandColumn from './BrandColumn';
import {
  UWU_IMG,
  LIDER_IMG, SBERSPASIBO_IMG, BMSTU_IMG, MPFI_IMG, RBPO_IMG, INSECA_IMG,
  TAGLINE_TEXT,
} from '../constants';
import { useState } from 'react';
import { useLang } from '../context/LangContext';

export default function Hero({
  titleRef, subtitleRef, taglineRef, socialsRef, liderRef,
  blinkerRef, whiteBoxRef, containerBoxRef, windowImgRef, uwuRef, workTextRef,
  progressWrapRef, progressBarRef, brandColRef,
}) {
  const [dlActive, setDlActive] = useState(false);
  const [dlOss, setDlOss] = useState(false);
  const { t } = useLang();

  return (
    <div className="hero">
      {/* Left — text */}
      <div className="hero__text">
        <h1 ref={titleRef} className="hero__title" />
        <h2 ref={subtitleRef} className="hero__subtitle" style={{ opacity: 0 }} />
        <p ref={taglineRef} className="hero__tagline" style={{ opacity: 0 }}>
          {TAGLINE_TEXT}
        </p>

        <div className="hero__badges-outer">
          <div ref={liderRef} className="hero__badges-track">
            {/* дубли — для бесшовного скролла */}
            <img src={LIDER_IMG} alt="" aria-hidden="true" className="hero__badge hero__badge--dup" />
            <img src={SBERSPASIBO_IMG} alt="" aria-hidden="true" className="hero__badge hero__badge--invert hero__badge--dup" />
            <img src={BMSTU_IMG} alt="" aria-hidden="true" className="hero__badge hero__badge--dup" />
            <img src={MPFI_IMG}   alt="" aria-hidden="true" className="hero__badge hero__badge--invert hero__badge--dup" />
            <img src={INSECA_IMG} alt="" aria-hidden="true" className="hero__badge hero__badge--invert hero__badge--dup" />
            <img src={RBPO_IMG}   alt="" aria-hidden="true" className="hero__badge hero__badge--invert hero__badge--dup" />
            {/* оригиналы */}
            <img src={LIDER_IMG}  alt="FinDevSecOps Лидер" className="hero__badge" />
            <img src={SBERSPASIBO_IMG} alt="СберСпасибо"   className="hero__badge hero__badge--invert" />
            <img src={BMSTU_IMG}  alt="МГТУ им. Баумана"   className="hero__badge" />
            <img src={MPFI_IMG}   alt="МФТИ"               className="hero__badge hero__badge--invert" />
            <img src={INSECA_IMG} alt="Inseca.tech"        className="hero__badge hero__badge--invert" />
            <img src={RBPO_IMG}   alt="РБПО.РФ"            className="hero__badge hero__badge--invert" />
          </div>
        </div>

        <div ref={socialsRef} className="hero__socials" style={{ opacity: 1 }}>

          {/* Профили */}
          <div className="social-group">
            <span className="social-group__label">Packages</span>
            <div className="social-group__btns">
              <a href="https://github.com/geminishkv?tab=packages" target="_blank" rel="noreferrer" className="pkg-btn"><i /><span>GitHub</span></a>
              <a href="https://hub.docker.com/u/geminishkvdev"     target="_blank" rel="noreferrer" className="pkg-btn"><i /><span>Docker Hub</span></a>
              <a href="https://pypi.org/user/geminishkv"           target="_blank" rel="noreferrer" className="pkg-btn"><i /><span>PyPI</span></a>
            </div>
          </div>

          {/* Контент */}
          <div className="social-group">
            <span className="social-group__label">{t.hero.contentLabel}</span>
            <div className="social-group__btns">
              <a href="https://t.me/shmakovis_appsec" target="_blank" rel="noreferrer" className="content-btn"><i /><span>AppSecTA</span></a>
              <a href="https://geminishkv.tech/blog/" target="_blank" rel="noreferrer" className="content-btn"><i /><span>Blog</span></a>
              <a href="https://course.geminishkv.tech/" target="_blank" rel="noreferrer" className="content-btn"><i /><span>AppSec Course</span></a>
              <a href="https://inseca.tech/security-champion-training" target="_blank" rel="noreferrer" className="content-btn"><i /><span>Security Champion Training</span></a>
              <a href="https://kiberbez-tech.ru" target="_blank" rel="noreferrer" className="content-btn"><i /><span>MIPT DevSecOps Course</span></a>
              <span
                className={`dl-btn${dlOss ? ' dl-btn--active' : ''}`}
                onClick={() => {
                  if (!dlOss) {
                    setDlOss(true);
                    const w = window.open('about:blank', '_blank');
                    setTimeout(() => {
                      if (w) w.location.href = 'https://findevsecops.github.io/oss_toolchainmap/pdf_table/tools-map.pdf';
                      setTimeout(() => setDlOss(false), 600);
                    }, 3900);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <span className="dl-btn__circle">
                  <svg className="dl-btn__icon" aria-hidden="true" viewBox="0 0 24 24" fill="none">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 19V5m0 14-4-4m4 4 4-4" />
                  </svg>
                  <span className="dl-btn__square" />
                </span>
                <span className="dl-btn__title">OSS Toolchain Map</span>
                <span className="dl-btn__title dl-btn__title--done">Open</span>
              </span>
              <span
                className={`dl-btn${dlActive ? ' dl-btn--active' : ''}`}
                onClick={() => {
                  if (!dlActive) {
                    setDlActive(true);
                    const w = window.open('about:blank', '_blank');
                    setTimeout(() => {
                      if (w) w.location.href = 'https://storage.yandexcloud.net/aft-tilda/%D0%A2%D0%B8%D0%BF%D0%BE%D0%B2%D0%BE%D0%B9%20%D0%BF%D1%80%D0%BE%D1%86%D0%B5%D1%81%D1%81%20%D0%B1%D0%B5%D0%B7%D0%BE%D0%BF%D0%B0%D1%81%D0%BD%D0%BE%D0%B9%20%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B8%20%D0%B4%D0%BB%D1%8F%20%D1%84%D0%B8%D0%BD%D1%82%D0%B5%D1%85%D0%B0.pdf';
                      setTimeout(() => setDlActive(false), 600);
                    }, 3900);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <span className="dl-btn__circle">
                  <svg className="dl-btn__icon" aria-hidden="true" viewBox="0 0 24 24" fill="none">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 19V5m0 14-4-4m4 4 4-4" />
                  </svg>
                  <span className="dl-btn__square" />
                </span>
                <span className="dl-btn__title">56939-2024 Process Map</span>
                <span className="dl-btn__title dl-btn__title--done">Open</span>
              </span>
            </div>
          </div>

          {/* Контакты */}
          <div className="social-group">
            <span className="social-group__label">{t.hero.contactsLabel}</span>
            <div className="social-group__btns">
              <a href="https://t.me/geminishkv" target="_blank" rel="noreferrer" className="contact-btn contact-btn--telegram">
                <div className="contact-btn__avatar-inner">
                  <div className="contact-btn__status" />
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
                </div>
                <span className="contact-btn__label">Telegram</span>
              </a>
              <a href="mailto:shmakovis@inbox.ru" className="contact-btn">
                <div className="contact-btn__avatar-inner">
                  <div className="contact-btn__status" />
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" /></svg>
                </div>
                <span className="contact-btn__label">Email</span>
              </a>
              <a href="https://www.linkedin.com/in/geminishkvdev/" target="_blank" rel="noreferrer" className="social-icon social-icon--linkedin" aria-label="LinkedIn">
                <svg className="social-icon__svg" viewBox="0 0 448 512" aria-hidden="true">
                  <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/geminishkv" target="_blank" rel="noreferrer" className="social-icon social-icon--instagram" aria-label="Instagram">
                <svg className="social-icon__svg" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Right — BrandColumn + Mac share one flex slot */}
      <div className="hero__right">
        <BrandColumn ref={brandColRef} />

        <div className="hero__mac">
        <div className="mac-wrap">
          <div className="mac-css">
            <div className="mac-css__monitor">
              <div className="mac-css__bar">
                <div className="mac-css__bar-dots">
                  <span className="mac-css__dot mac-css__dot--r" />
                  <span className="mac-css__dot mac-css__dot--y" />
                  <span className="mac-css__dot mac-css__dot--g" />
                </div>
                <span className="mac-css__bar-title">geminishkv</span>
                <div className="mac-css__bar-logo">
                  <img src="/img/logotype/logo_white.svg" alt="" />
                </div>
              </div>
              <div className="mac-css__screen mac-screen">
                <div ref={blinkerRef} className="blinker" />
                <div ref={whiteBoxRef}     className="mac-white-box" />
                <div ref={containerBoxRef} className="mac-container-box" />
                <div ref={windowImgRef} className="mac-window-img mac-terminal">
                  <div ref={workTextRef} className="mac-work-text" />
                </div>
                <img ref={uwuRef} src={UWU_IMG} alt="" className="mac-window-img mac-uwu" />
                <div ref={progressWrapRef} className="mac-progress">
                  <p className="mac-loading-text">
                    Initializing
                    <span className="dot dot-1">.</span>
                    <span className="dot dot-2">.</span>
                    <span className="dot dot-3">.</span>
                  </p>
                  <div className="mac-progress-track">
                    <div ref={progressBarRef} className="mac-progress-bar" />
                  </div>
                </div>
              </div>
              <div className="mac-css__chin" />
            </div>
          </div>
        </div>
      </div>

      </div>{/* hero__right */}
    </div>
  );
}
