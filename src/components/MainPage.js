import { useState } from 'react';
import '../styles/MainPage.css';
import { useMainAnimation } from '../hooks/useMainAnimation';
import Nav        from './Nav';
import Hero       from './Hero';
import Footer     from './Footer';
import AboutModal from './AboutModal';

export default function MainPage({ isVisible }) {
  const refs = useMainAnimation(isVisible);
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
      <Footer />
      <AboutModal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  );
}
