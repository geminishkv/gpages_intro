import { useState, useEffect } from 'react';
import '../styles/MainPage.css';
import { useMainAnimation } from '../hooks/useMainAnimation';
import { useLang } from '../context/LangContext';
import Nav        from './Nav';
import Hero       from './Hero';
import Stats      from './Stats';
import NowStrip   from './NowStrip';
import Blog       from './Blog';
import Experience from './Experience';
import Tools      from './Tools';
import Projects   from './Projects';
import Instagram  from './Instagram';
import Footer     from './Footer';
import AboutModal from './AboutModal';
import NoticeBar  from './NoticeBar';
import Videos     from './Videos';
import CookieBanner from './CookieBanner';

export default function MainPage({ isVisible }) {
  const [animDone, setAnimDone] = useState(false);
  const refs = useMainAnimation(isVisible, () => setAnimDone(true));
  const [aboutOpen, setAboutOpen] = useState(false);
  const { t } = useLang();

  // Scroll lock during animation — desktop only (mobile can scroll freely)
  useEffect(() => {
    if (window.matchMedia('(max-width: 900px)').matches) return;

    const unlock = () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };

    if (isVisible && !animDone) {
      document.body.style.position = 'fixed';
      document.body.style.top = '0';
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      // Fallback: unlock after 10s even if animation chain hangs
      const safety = setTimeout(unlock, 10000);
      return () => { clearTimeout(safety); unlock(); };
    } else {
      unlock();
    }
    return unlock;
  }, [isVisible, animDone]);

  return (
    <div className={`main-page${isVisible ? ' main-page--visible' : ''}${animDone ? ' main-page--scrollable' : ''}`}>
      <a className="skip-link" href="#now">{t.a11y.skip}</a>
      <Nav navRef={refs.navRef} onAboutOpen={() => setAboutOpen(true)} />
      <main id="content" className="main-content">
      <Hero
        titleRef={refs.titleRef}
        subtitleRef={refs.subtitleRef}
        taglineRef={refs.taglineRef}
        socialsRef={refs.socialsRef}
        liderRef={refs.liderRef}
        blinkerRef={refs.blinkerRef}
        whiteBoxRef={refs.whiteBoxRef}
        containerBoxRef={refs.containerBoxRef}
        windowImgRef={refs.windowImgRef}
        uwuRef={refs.uwuRef}
        workTextRef={refs.workTextRef}
        progressWrapRef={refs.progressWrapRef}
        progressBarRef={refs.progressBarRef}
        brandColRef={refs.brandColRef}
        leadRef={refs.leadRef}
        animDone={animDone}
        onAboutOpen={() => setAboutOpen(true)}
      />
      <div className="section-reveal" id="now" ref={refs.nowRef}>
        <NowStrip />
      </div>
      <div className="section-reveal" id="stats" ref={refs.statsRef}>
        <Stats active={refs.statsActive} />
      </div>
      <div className="section-reveal" id="projects" ref={refs.projectsRef}>
        <Projects isVisible={animDone} />
      </div>
      <div className="section-reveal" id="videos" ref={refs.videosRef}>
        <Videos />
      </div>
      <div className="section-reveal" id="blog" ref={refs.blogRef}>
        <Blog />
      </div>
      <div className="section-reveal" id="experience" ref={refs.experienceRef}>
        <Experience />
      </div>
      <div className="section-reveal" id="skillset" ref={refs.toolsRef}>
        <Tools />
      </div>
      <div className="section-reveal" id="interests" ref={refs.interestsRef}>
        <Instagram />
      </div>
      </main>
      <div className="section-reveal" ref={refs.footerRef}>
        <Footer />
      </div>
      <AboutModal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
      <NoticeBar animDone={animDone} />
      <CookieBanner animDone={animDone} />
    </div>
  );
}
