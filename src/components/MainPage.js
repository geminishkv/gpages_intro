import { useState } from 'react';
import '../styles/MainPage.css';
import { useMainAnimation } from '../hooks/useMainAnimation';
import Nav        from './Nav';
import Hero       from './Hero';
import Stats      from './Stats';
import Blog       from './Blog';
import Experience from './Experience';
import Tools      from './Tools';
import Projects   from './Projects';
import Gaming     from './Gaming';
import Footer     from './Footer';
import AboutModal from './AboutModal';
import NoticeBar  from './NoticeBar';
import Videos     from './Videos';

export default function MainPage({ isVisible }) {
  const [animDone, setAnimDone] = useState(false);
  const refs = useMainAnimation(isVisible, () => setAnimDone(true));
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <div className={`main-page${isVisible ? ' main-page--visible' : ''}`}>
      <Nav navRef={refs.navRef} onAboutOpen={() => setAboutOpen(true)} />
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
      />
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
      <div className="section-reveal" id="interests" ref={refs.gamingRef}>
        <Gaming />
      </div>
      <div className="section-reveal" ref={refs.footerRef}>
        <Footer />
      </div>
      <AboutModal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
      <NoticeBar />
    </div>
  );
}
