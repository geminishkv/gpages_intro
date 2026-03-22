import { useEffect, useRef, useCallback, useState } from 'react';
import anime from 'animejs/lib/anime.js';
import { TITLE_TEXT, SUBTITLE_TEXT } from '../constants';

export function useMainAnimation(isVisible, onAllDone) {
  const navRef          = useRef(null);
  const observerRef     = useRef(null);
  const blinkerRef      = useRef(null);
  const whiteBoxRef     = useRef(null);
  const containerBoxRef = useRef(null);
  const windowImgRef    = useRef(null);
  const uwuRef          = useRef(null);
  const workTextRef     = useRef(null);
  const progressWrapRef = useRef(null);
  const progressBarRef  = useRef(null);
  const titleRef        = useRef(null);
  const subtitleRef     = useRef(null);
  const taglineRef      = useRef(null);
  const socialsRef      = useRef(null);
  const liderRef        = useRef(null);

  const statsRef      = useRef(null);
  const projectsRef   = useRef(null);
  const blogRef       = useRef(null);
  const experienceRef = useRef(null);
  const toolsRef      = useRef(null);
  const gamingRef     = useRef(null);
  const footerRef     = useRef(null);

  const [statsActive, setStatsActive] = useState(false);

  /* ── step 3: reveal text after mac loads (DOS typewriter) ── */
  const animateText = useCallback(() => {
    if (!titleRef.current) return;

    function makeCursor() {
      const c = document.createElement('span');
      c.className = 'dos-cursor';
      return c;
    }

    function typeString(el, text, interval, onDone) {
      const cursor = makeCursor();
      el.innerHTML = '';
      el.appendChild(cursor);
      const chars = text.split('');
      let i = 0;
      const timer = setInterval(() => {
        if (i >= chars.length) {
          clearInterval(timer);
          setTimeout(() => { cursor.remove(); onDone(); }, 350);
          return;
        }
        const span = document.createElement('span');
        span.className = 'letter';
        span.textContent = chars[i];
        el.insertBefore(span, cursor);
        i++;
      }, interval);
    }

    // ── Title ──
    typeString(titleRef.current, TITLE_TEXT, 165, () => {

      // ── Subtitle ──
      if (!subtitleRef.current) return;
      subtitleRef.current.style.opacity = '1';
      typeString(subtitleRef.current, SUBTITLE_TEXT, 135, () => {
        if (!taglineRef.current) return;

        // ── Tagline ──
        anime({
          targets: taglineRef.current,
          opacity: [0, 1],
          translateY: [16, 0],
          duration: 600,
          easing: 'easeOutExpo',
          complete: () => {

            // ── Social groups one by one ──
            if (!socialsRef.current) return;
            socialsRef.current.style.opacity = '1';
            const groups = Array.from(
              socialsRef.current.querySelectorAll('.social-group')
            );
            anime({
              targets: groups,
              opacity: [0, 1],
              translateY: [14, 0],
              delay: anime.stagger(420),
              duration: 580,
              easing: 'easeOutExpo',
              complete: () => {

                // ── Badges ──
                setTimeout(() => {
                  anime({
                    targets: liderRef.current.querySelectorAll('.hero__badge:not(.hero__badge--dup)'),
                    opacity: [0, 1],
                    translateY: [20, 0],
                    delay: anime.stagger(480),
                    duration: 500,
                    easing: 'easeOutExpo',
                    complete: () => {
                      setTimeout(() => {
                        liderRef.current.classList.add('hero__badges-track--scrolling');

                        if (!liderRef.current) return;

                        // ── Sections via IntersectionObserver ──
                        if (onAllDone) onAllDone();

                        const sectionEls = [
                          statsRef.current,
                          projectsRef.current,
                          blogRef.current,
                          experienceRef.current,
                          toolsRef.current,
                          gamingRef.current,
                          footerRef.current,
                        ].filter(Boolean);

                        const mainPage = navRef.current?.closest('.main-page');
                        const oy = mainPage ? getComputedStyle(mainPage).overflowY : 'visible';
                        const scrollRoot = (oy === 'auto' || oy === 'scroll') ? mainPage : null;

                        observerRef.current = new IntersectionObserver(
                          (entries) => {
                            entries.forEach(entry => {
                              if (!entry.isIntersecting) return;
                              observerRef.current.unobserve(entry.target);
                              if (entry.target === statsRef.current) setStatsActive(true);
                              anime({
                                targets: entry.target,
                                opacity: [0, 1],
                                translateY: [32, 0],
                                duration: 700,
                                easing: 'easeOutExpo',
                                complete: () => {
                                  entry.target.style.willChange = 'auto';
                                },
                              });
                            });
                          },
                          { root: scrollRoot, threshold: 0.08 }
                        );

                        sectionEls.forEach(el => observerRef.current.observe(el));
                      }, 500);
                    },
                  });
                }, 300);

              },
            });
          },
        });
      });
    });
  }, []); // eslint-disable-line

  /* ── step 2: mac animation ── */
  const animateMac = useCallback(() => {
    const scr = windowImgRef.current.parentElement;
    const sw  = scr.clientWidth;
    const sh  = scr.clientHeight;

    const W  = `${sw}px`;
    const H  = `${sh}px`;
    const Wb = `${Math.round(sw * 0.65)}px`;
    const Hb = `${Math.round(sh * 0.68)}px`;
    const Wc = `${Math.round(sw * 0.98)}px`;
    const Hc = `${Math.round(sh * 1.2)}px`;

    const tl = anime.timeline({ easing: 'linear' });

    tl.add({ targets: blinkerRef.current,      opacity: [0, 1],                    duration: 300 });
    tl.add({ targets: whiteBoxRef.current,     opacity: [0, 1], width: Wb,         duration: 350 }, '-=100');
    tl.add({ targets: whiteBoxRef.current,     height: Hb,                         duration: 350 }, '-=300');
    tl.add({ targets: containerBoxRef.current, opacity: [0, 1], height: Hc, width: Wc, duration: 420 }, '-=350');
    tl.add({ targets: windowImgRef.current,    opacity: [0, 1], height: H,  width: W,  duration: 500 }, '-=400');
    tl.add({ targets: progressWrapRef.current, opacity: [0, 1], delay: 900,        duration: 450 });
    tl.add({ targets: progressBarRef.current,  width: ['0%', '100%'],              duration: 1600, easing: 'easeInOutQuad' });
    tl.add({ targets: progressWrapRef.current, opacity: [1, 0],                    duration: 500 });
    tl.add({ targets: uwuRef.current,          opacity: [0, 1], width: W, height: H, duration: 300, delay: 80 });
    tl.add({ targets: workTextRef.current,     opacity: [0, 1],                    duration: 400 }, '-=100');

    tl.finished.then(() => animateText());
  }, [animateText]);

  /* ── step 1: nav + init hidden states + kickoff ── */
  useEffect(() => {
    if (!isVisible) return;

    // Skip all animations if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      navRef.current.style.opacity    = '1';
      navRef.current.style.transform  = 'none';
      socialsRef.current.style.opacity = '1';
      liderRef.current.classList.add('hero__badges-track--scrolling');
      setStatsActive(true);
      if (onAllDone) onAllDone();
      const allSections = [
        statsRef, projectsRef, blogRef, experienceRef, toolsRef, gamingRef, footerRef,
      ];
      allSections.forEach(r => {
        if (!r.current) return;
        r.current.style.opacity    = '1';
        r.current.style.transform  = 'none';
        r.current.style.willChange = 'auto';
      });
      return;
    }

    // Pre-hide social groups individually so they animate in one by one
    const groups = socialsRef.current?.querySelectorAll('.social-group');
    if (groups) {
      groups.forEach(g => {
        g.style.opacity = '0';
        g.style.transform = 'translateY(14px)';
      });
    }

    anime({
      targets: navRef.current,
      translateY: [-50, 0],
      opacity: [0, 1],
      duration: 600,
      delay: 150,
      easing: 'easeOutExpo',
    });

    setTimeout(animateMac, 400);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [isVisible, animateMac]);

  return {
    navRef,
    blinkerRef, whiteBoxRef, containerBoxRef,
    windowImgRef, uwuRef, workTextRef, progressWrapRef, progressBarRef,
    titleRef, subtitleRef, taglineRef, socialsRef, liderRef,
    statsRef, projectsRef, blogRef, experienceRef, toolsRef, gamingRef, footerRef,
    statsActive,
  };
}
