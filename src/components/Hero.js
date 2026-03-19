import {
  MAC_IMG, WIN_IMG,
  LIDER_IMG, LANIT_IMG, BMSTU_IMG, MPFI_IMG, RBPO_IMG,
  SUBTITLE_TEXT, TAGLINE_TEXT,
} from '../constants';

export default function Hero({
  titleRef, subtitleRef, taglineRef, socialsRef, liderRef,
  blinkerRef, whiteBoxRef, containerBoxRef, windowImgRef,
  progressWrapRef, progressBarRef,
}) {
  return (
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

        <div className="hero__badges-outer">
          <div ref={liderRef} className="hero__badges-track">
            {/* дубли — для бесшовного скролла */}
            <img src={LIDER_IMG} alt="" aria-hidden="true" className="hero__badge hero__badge--dup" />
            <img src={LANIT_IMG} alt="" aria-hidden="true" className="hero__badge hero__badge--invert hero__badge--dup" />
            <img src={BMSTU_IMG} alt="" aria-hidden="true" className="hero__badge hero__badge--dup" />
            <img src={MPFI_IMG}  alt="" aria-hidden="true" className="hero__badge hero__badge--invert hero__badge--dup" />
            <img src={RBPO_IMG}  alt="" aria-hidden="true" className="hero__badge hero__badge--invert hero__badge--dup" />
            {/* оригиналы */}
            <img src={LIDER_IMG} alt="FinDevSecOps Лидер" className="hero__badge" />
            <img src={LANIT_IMG} alt="ЛАНИТ"              className="hero__badge hero__badge--invert" />
            <img src={BMSTU_IMG} alt="МГТУ им. Баумана"   className="hero__badge" />
            <img src={MPFI_IMG}  alt="МФТИ"               className="hero__badge hero__badge--invert" />
            <img src={RBPO_IMG}  alt="РБПО.РФ"            className="hero__badge hero__badge--invert" />
          </div>
        </div>

        <div ref={socialsRef} className="hero__socials" style={{ opacity: 0 }}>
          <a href="https://github.com/geminishkv"              target="_blank" rel="noreferrer" className="social-btn">GitHub</a>
          <a href="https://hub.docker.com/u/geminishkvdev"     target="_blank" rel="noreferrer" className="social-btn">Docker Hub</a>
          <a href="https://github.com/geminishkv?tab=packages" target="_blank" rel="noreferrer" className="social-btn">Packages</a>
          <a href="https://t.me/geminishkv"                    target="_blank" rel="noreferrer" className="social-btn social-btn--outline">Telegram</a>
          <a href="mailto:shmakovis@inbox.ru"                  target="_blank" rel="noreferrer" className="social-btn social-btn--outline">Email</a>
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
