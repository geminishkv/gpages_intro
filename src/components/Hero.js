import '../styles/Hero.css';
import '../styles/Mac.css';
import {
  MAC_IMG, WIN_IMG, UWU_IMG,
  LIDER_IMG, LANIT_IMG, BMSTU_IMG, MPFI_IMG, RBPO_IMG, INSECA_IMG,
  TAGLINE_TEXT,
} from '../constants';

export default function Hero({
  titleRef, subtitleRef, taglineRef, socialsRef, liderRef,
  blinkerRef, whiteBoxRef, containerBoxRef, windowImgRef, uwuRef, workTextRef,
  progressWrapRef, progressBarRef,
}) {
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
            <img src={LANIT_IMG} alt="" aria-hidden="true" className="hero__badge hero__badge--invert hero__badge--dup" />
            <img src={BMSTU_IMG} alt="" aria-hidden="true" className="hero__badge hero__badge--dup" />
            <img src={MPFI_IMG}   alt="" aria-hidden="true" className="hero__badge hero__badge--invert hero__badge--dup" />
            <img src={INSECA_IMG} alt="" aria-hidden="true" className="hero__badge hero__badge--invert hero__badge--dup" />
            <img src={RBPO_IMG}   alt="" aria-hidden="true" className="hero__badge hero__badge--invert hero__badge--dup" />
            {/* оригиналы */}
            <img src={LIDER_IMG}  alt="FinDevSecOps Лидер" className="hero__badge" />
            <img src={LANIT_IMG}  alt="ЛАНИТ"              className="hero__badge hero__badge--invert" />
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
              <a href="https://github.com/geminishkv?tab=packages" target="_blank" rel="noreferrer" className="social-btn">GitHub</a>
              <a href="https://hub.docker.com/u/geminishkvdev"     target="_blank" rel="noreferrer" className="social-btn">Docker Hub</a>
              <a href="https://pypi.org/user/geminishkv"           target="_blank" rel="noreferrer" className="social-btn">PyPI</a>
            </div>
          </div>

          {/* Контент */}
          <div className="social-group">
            <span className="social-group__label">Контент</span>
            <div className="social-group__btns">
              <a href="https://t.me/shmakovis_appsec" target="_blank" rel="noreferrer" className="social-btn social-btn--content">Blog</a>
              <a href="https://course.geminishkv.tech/" target="_blank" rel="noreferrer" className="social-btn social-btn--content">AppSec Course →</a>
              <a href="https://inseca.tech/security-champion-training" target="_blank" rel="noreferrer" className="social-btn social-btn--content">Security Champion Training</a>
              <a href="https://clck.ru/3SiMPc" target="_blank" rel="noreferrer" className="social-btn social-btn--content">56939-2024 Map→</a>
              <a href="https://findevsecops.github.io/oss_toolchainmap/" target="_blank" rel="noreferrer" className="social-btn social-btn--content">OSS Toolchain Map</a>
            </div>
          </div>

          {/* Контакты */}
          <div className="social-group">
            <span className="social-group__label">Контакты</span>
            <div className="social-group__btns">
              <a href="https://t.me/geminishkv"     target="_blank" rel="noreferrer" className="social-btn social-btn--outline">Telegram</a>
              <a href="https://www.linkedin.com/in/geminishkvdev/" target="_blank" rel="noreferrer" className="social-btn social-btn--outline">LINKEDIN</a>
              <a href="https://www.instagram.com/geminishkv" target="_blank" rel="noreferrer" className="social-btn social-btn--outline">INST</a>
              <a href="mailto:shmakovis@inbox.ru"   target="_blank" rel="noreferrer" className="social-btn social-btn--outline">Email</a>
            </div>
          </div>

        </div>
      </div>

      {/* Right — Mac mockup */}
      <div className="hero__mac">
        <div className="mac-wrap">
          <img src={MAC_IMG} alt="Mac" className="mac-body" />
          <div className="mac-screen">
            <div ref={blinkerRef} className="blinker" style={{ opacity: 0 }} />
            <div ref={whiteBoxRef}     className="mac-white-box"     style={{ opacity: 0, width: 0, height: 0 }} />
            <div ref={containerBoxRef} className="mac-container-box" style={{ opacity: 0, width: 0, height: 0 }} />
            <img ref={windowImgRef} src={WIN_IMG} alt="" className="mac-window-img"
                 style={{ opacity: 0, width: 0, height: 0 }} />
            <img ref={uwuRef} src={UWU_IMG} alt="" className="mac-window-img mac-uwu"
                 style={{ opacity: 0 }} />
            <div ref={workTextRef} className="mac-work-text" style={{ opacity: 0 }}>
              Work harder,&nbsp;<br />comrade
            </div>
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
  );
}
