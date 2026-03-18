import { useEffect, useRef, useCallback } from 'react';
import anime from 'animejs/lib/anime.js';
import './MainPage.css';
const MAC_IMG   = process.env.PUBLIC_URL + '/mac_ns.png';
const LOGO_IMG  = process.env.PUBLIC_URL + '/logo2.png';
const WIN_IMG   = process.env.PUBLIC_URL + '/window3.png';
const LIDER_IMG = process.env.PUBLIC_URL + '/lider.png';
const LANIT_IMG = process.env.PUBLIC_URL + '/lanit.png';
const BMSTU_IMG = process.env.PUBLIC_URL + '/bmstu.png';
const MPFI_IMG  = process.env.PUBLIC_URL + '/mpfi.png';
const RBPO_IMG  = process.env.PUBLIC_URL + '/rbpo.png';

const TITLE_TEXT    = 'geminishkv';
const SUBTITLE_TEXT = 'devsecops';
const TAGLINE_TEXT  = 'Sic Parvis Magna';

export default function MainPage({ isVisible }) {
  /* ── refs ── */
  const navRef          = useRef(null);
  const blinkerRef      = useRef(null);
  const whiteBoxRef     = useRef(null);
  const containerBoxRef = useRef(null);
  const windowImgRef    = useRef(null);
  const progressWrapRef = useRef(null);
  const progressBarRef  = useRef(null);
  const titleRef        = useRef(null);
  const subtitleRef     = useRef(null);
  const taglineRef      = useRef(null);
  const socialsRef      = useRef(null);
  const liderRef        = useRef(null);

  /* ── step 3: reveal text after mac loads ── */
  const animateText = useCallback(() => {
    if (!titleRef.current) return;
    titleRef.current.innerHTML = '';

    const chars = TITLE_TEXT.split('');
    let i = 0;

    const timer = setInterval(() => {
      if (i >= chars.length) {
        clearInterval(timer);
        // subtitle slides up from below
        anime({
          targets: subtitleRef.current,
          opacity: [0, 1],
          translateY: [1200, 0],
          duration: 750,
          easing: 'easeOutExpo',
        });
        // tagline + socials
        setTimeout(() => {
          // tagline + buttons appear
          anime({
            targets: [taglineRef.current, socialsRef.current],
            opacity: [0, 1],
            translateY: [16, 0],
            delay: anime.stagger(200),
            duration: 600,
            easing: 'easeOutExpo',
          });

          // badges start after buttons are fully visible (~900ms)
          setTimeout(() => {
            anime({
              targets: liderRef.current.querySelectorAll('.hero__badge'),
              opacity: [0, 1],
              translateY: [20, 0],
              delay: anime.stagger(500),
              duration: 500,
              easing: 'easeOutExpo',
            });
          }, 900);
        }, 500);
        return;
      }
      const span = document.createElement('span');
      span.className = 'letter';
      span.textContent = chars[i];
      titleRef.current.appendChild(span);
      anime({ targets: span, opacity: [0, 1], translateY: [18, 0], duration: 180, easing: 'easeOutExpo' });
      i++;
    }, 145);
  }, []);

  /* ── step 2: mac animation ── */
  const animateMac = useCallback(() => {
    const tl = anime.timeline({ easing: 'linear' });

    // blinker appears
    tl.add({ targets: blinkerRef.current,      opacity: [0, 1],                          duration: 300 });
    // white box grows
    tl.add({ targets: whiteBoxRef.current,     opacity: [0, 1], width: '235px',          duration: 350 }, '-=100');
    tl.add({ targets: whiteBoxRef.current,     height: '155px',                          duration: 350 }, '-=300');
    // container box grows
    tl.add({ targets: containerBoxRef.current, opacity: [0, 1], height: '280px', width: '355px', duration: 420 }, '-=350');
    // window image appears
    tl.add({ targets: windowImgRef.current,    opacity: [0, 1], height: '271px', width: '349px', duration: 500 }, '-=400');
    // progress bar fades in
    tl.add({ targets: progressWrapRef.current, opacity: [0, 1],                          delay: 900,  duration: 300 });
    // progress bar fills
    tl.add({ targets: progressBarRef.current,  width: ['0%', '100%'],                    duration: 1600, easing: 'easeInOutQuad' });
    // progress bar fades out
    tl.add({ targets: progressWrapRef.current, opacity: [1, 0],                          duration: 500 });

    tl.finished.then(() => animateText());
  }, [animateText]);

  /* ── step 1: nav + kickoff ── */
  useEffect(() => {
    if (!isVisible) return;

    anime({
      targets: navRef.current,
      translateY: [-50, 0],
      opacity: [0, 1],
      duration: 600,
      delay: 150,
      easing: 'easeOutExpo',
    });

    setTimeout(animateMac, 400);
  }, [isVisible, animateMac]);

  return (
    <div className={`main-page${isVisible ? ' main-page--visible' : ''}`}>
      {/* ── Navigation ── */}
      <nav ref={navRef} className="nav" style={{ opacity: 0 }}>
        <div className="nav__logo">
          <img src={LOGO_IMG} alt="logo" className="nav__logo-img" />
          <span className="nav__brand">geminishkv</span>
        </div>
        <div className="nav__links">
          <a href="#about">About</a>
          <a href="https://github.com/geminishkv" target="_blank" rel="noreferrer">GitHub</a>
          <a href="#blog">Blog</a>
          <a href="#contacts">Contacts</a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <div className="hero">
        {/* Left — text */}
        <div className="hero__text">
          <h1 ref={titleRef} className="hero__title" />
          <h2 ref={subtitleRef} className="hero__subtitle" style={{ opacity: 0 }}>
            {SUBTITLE_TEXT}
          </h2>
          <p ref={taglineRef} className="hero__tagline" style={{ opacity: 0 }}>
            {TAGLINE_TEXT}
          </p>
          <div ref={liderRef} className="hero__badges">
            <img src={LIDER_IMG} alt="FinDevSecOps Лидер" className="hero__badge" />
            <img src={LANIT_IMG} alt="ЛАНИТ"             className="hero__badge hero__badge--invert" />
            <img src={BMSTU_IMG} alt="МГТУ им. Баумана"  className="hero__badge" />
            <img src={MPFI_IMG}  alt="МФТИ"              className="hero__badge hero__badge--invert" />
            <img src={RBPO_IMG}  alt="РБПО.РФ"           className="hero__badge hero__badge--invert" />
          </div>

          <div ref={socialsRef} className="hero__socials" style={{ opacity: 0 }}>
            <a href="https://github.com/geminishkv" target="_blank" rel="noreferrer" className="social-btn">
              GitHub
            </a>
            <a href="https://t.me/geminishkv" target="_blank" rel="noreferrer" className="social-btn social-btn--outline">
              Telegram
            </a>
          </div>
        </div>

        {/* Right — Mac mockup */}
        <div className="hero__mac">
          <div className="mac-wrap">
            <img src={MAC_IMG} alt="Mac" className="mac-body" />
            <div className="mac-screen">
              {/* blinker */}
              <div ref={blinkerRef} className="blinker" style={{ opacity: 0 }} />
              {/* expanding boxes */}
              <div ref={whiteBoxRef}     className="mac-white-box"     style={{ opacity: 0, width: 0, height: 0 }} />
              <div ref={containerBoxRef} className="mac-container-box" style={{ opacity: 0, width: 0, height: 0 }} />
              {/* browser window screenshot */}
              <img ref={windowImgRef} src={WIN_IMG} alt="" className="mac-window-img"
                   style={{ opacity: 0, width: 0, height: 0 }} />
              {/* progress bar */}
              <div ref={progressWrapRef} className="mac-progress" style={{ opacity: 0 }}>
                <p className="mac-loading-text">
                  Initializing
                  <span className="dot dot-1">.</span>
                  <span className="dot dot-2">.</span>
                  <span className="dot dot-3">.</span>
                </p>
                <div className="mac-progress-track">
                  <div ref={progressBarRef} className="mac-progress-bar" style={{ width: '0%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
