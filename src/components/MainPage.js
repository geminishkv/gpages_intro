import { useState, useEffect, useMemo } from 'react';
import '../styles/MainPage.css';
import { useMainAnimation } from '../hooks/useMainAnimation';
import { useScreens } from '../hooks/useScreens';
import { ScreenProvider } from '../context/ScreenContext';
import { useLang } from '../context/LangContext';
import { LOGO_IMG } from '../constants';
import Nav        from './Nav';
import Hero       from './Hero';
import Stats      from './Stats';
import NowStrip   from './NowStrip';
import Blog       from './Blog';
import Experience from './Experience';
import Tools      from './Tools';
import Projects   from './Projects';
import Instagram  from './Instagram';
import Contacts   from './Contacts';
import Footer     from './Footer';
import Videos     from './Videos';
import CookieBanner from './CookieBanner';
import '../styles/Screens.css';

// Screen order of the home page. Each entry is one full-screen view on desktop
// and one block of the scrolling document on phones.
const SCREENS = ['intro', 'nowproj', 'videos', 'blog', 'experience', 'skillset', 'interests', 'contacts'];
// which nav link lights up on a screen
const NAV_BY_SCREEN = { blog: 'blog', experience: 'experience', skillset: 'skillset', interests: 'interests' };

export default function MainPage({ isVisible }) {
  const [animDone, setAnimDone] = useState(false);
  const screens = useScreens({ count: SCREENS.length, ready: animDone });
  const onScreens = screens.mode === 'screens';
  const refs = useMainAnimation(isVisible, () => setAnimDone(true), { screens: onScreens });
  const { t } = useLang();

  // Background chevron per screen: side alternates, the offset and tilt are
  // rolled once per page load and stay put.
  const watermarks = useMemo(() => SCREENS.map(() => ({
    '--wm-dy': `${(Math.random() * 30 - 15).toFixed(0)}%`,
    '--wm-rot': `${(Math.random() * 24 - 12).toFixed(0)}deg`,
    backgroundImage: `url(${LOGO_IMG})`,
  })), []);

  // Scroll lock during the intro animation — desktop only (mobile can scroll freely)
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

  const index = (id) => SCREENS.indexOf(id);
  const isActive = (id) => screens.cur === index(id);
  const screenClass = (id) =>
    `gp-screen${id === 'intro' ? ' gp-screen--hero' : ''}${isActive(id) ? ' is-active' : ''}${screens.leaving === index(id) ? ' is-leaving' : ''}`;

  // One wrapper per screen: the id keeps #hash links working, the provider tells the
  // titles and counters inside when their screen is on.
  const screen = (id, children) => (
    <div key={id} id={id} className={screenClass(id)}>
      <ScreenProvider value={{ mode: screens.mode, active: onScreens ? isActive(id) : undefined }}>
        {onScreens && id !== 'intro' && (
          <div className="gp-wmw" aria-hidden="true">
            <div className={`gp-wm gp-wm--${index(id) % 2 ? 'left' : 'right'}`} style={watermarks[index(id)]} />
          </div>
        )}
        {children}
      </ScreenProvider>
    </div>
  );

  const statsActive = onScreens ? animDone && isActive('nowproj') : refs.statsActive;
  const activeNav = onScreens ? NAV_BY_SCREEN[SCREENS[screens.cur]] ?? null : undefined;
  const progress = onScreens ? (screens.cur + 1) / SCREENS.length : null;

  return (
    <div
      ref={screens.rootRef}
      className={`main-page${isVisible ? ' main-page--visible' : ''}${animDone ? ' main-page--scrollable' : ''}`}
    >
      <a className="skip-link" href="#now">{t.a11y.skip}</a>
      <Nav navRef={refs.navRef} activeId={activeNav} progress={progress} />
      <main id="content" className="main-content">
        {screen('intro', (
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
          />
        ))}

        {screen('nowproj', (<>
          <div className="section-reveal" id="now" ref={refs.nowRef}>
            <NowStrip />
          </div>
          <div className="section-reveal" id="stats" ref={refs.statsRef}>
            <Stats active={statsActive} />
          </div>
          <div className="section-reveal" id="projects" ref={refs.projectsRef}>
            <Projects isVisible={animDone} />
          </div>
        </>))}

        {screen('videos', (<>
          <div className="section-reveal" ref={refs.videosRef}>
            <Videos />
          </div>
        </>))}

        {screen('blog', (<>
          <div className="section-reveal" ref={refs.blogRef}>
            <Blog />
          </div>
        </>))}

        {screen('experience', (<>
          <div className="section-reveal" ref={refs.experienceRef}>
            <Experience />
          </div>
        </>))}

        {screen('skillset', (<>
          <div className="section-reveal" ref={refs.toolsRef}>
            <Tools />
          </div>
        </>))}

        {screen('interests', (<>
          <div className="section-reveal" ref={refs.interestsRef}>
            <Instagram />
          </div>
        </>))}

        {screen('contacts', (<>
          <div className="section-reveal" ref={refs.contactsRef}>
            <Contacts />
          </div>
          <div className="section-reveal" id="footer" ref={refs.footerRef}>
            <Footer />
          </div>
        </>))}
      </main>

      {onScreens && (
        <>
          <nav className="gp-dots" aria-label={t.screens.ariaLabel}>
            {SCREENS.map((id, i) => (
              <a
                key={id}
                href={`#${id}`}
                data-l={t.screens[id]}
                className={screens.cur === i ? 'is-active' : undefined}
                aria-current={screens.cur === i ? 'true' : undefined}
                onClick={(e) => { e.preventDefault(); screens.goTo(i); }}
              >
                <span className="gp-dots__sr">{t.screens[id]}</span>
              </a>
            ))}
          </nav>
          <div className="gp-scnt" aria-hidden="true">
            {String(screens.cur + 1).padStart(2, '0')} / {String(SCREENS.length).padStart(2, '0')}
          </div>
        </>
      )}
      <CookieBanner animDone={animDone} />
    </div>
  );
}
