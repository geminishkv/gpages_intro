import { useEffect, useRef, useCallback, useState } from 'react';
import anime from 'animejs/lib/anime.js';
import { TITLE_TEXT, SUBTITLE_TEXT } from '../constants';

const GLITCH_CHARS = '#@$%^&!?<>{}[]|/\\~*+=_';

export function useMainAnimation(isVisible, onAllDone) {
  const navRef          = useRef(null);
  // MainPage передаёт onAllDone inline-стрелкой; держим актуальный колбэк в ref,
  // чтобы не включать его в deps эффекта и не перезапускать анимацию на каждом рендере.
  const onAllDoneRef    = useRef(onAllDone);
  useEffect(() => { onAllDoneRef.current = onAllDone; }, [onAllDone]);
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
  const leadRef         = useRef(null);
  const socialsRef      = useRef(null);
  const liderRef        = useRef(null);
  const brandColRef     = useRef(null);

  const nowRef        = useRef(null);
  const statsRef      = useRef(null);
  const projectsRef   = useRef(null);
  const videosRef     = useRef(null);
  const blogRef       = useRef(null);
  const experienceRef = useRef(null);
  const toolsRef      = useRef(null);
  const interestsRef     = useRef(null);
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

    // GLITCH_CHARS defined at module level

    function typeString(el, text, interval, onDone) {
      const cursor = makeCursor();
      el.innerHTML = '';
      el.appendChild(cursor);
      const chars = text.split('');
      let i = 0;
      const glitchCount = 3;
      const glitchSpeed = Math.max(30, Math.floor(interval / (glitchCount + 1)));

      function typeNext() {
        if (i >= chars.length) {
          setTimeout(() => { cursor.remove(); onDone(); }, 350);
          return;
        }

        const span = document.createElement('span');
        span.className = 'letter';
        span.style.color = 'var(--color-red, #D51A1A)';
        el.insertBefore(span, cursor);

        let g = 0;
        const glitchTimer = setInterval(() => {
          if (g < glitchCount) {
            span.textContent = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
            g++;
          } else {
            clearInterval(glitchTimer);
            span.textContent = chars[i];
            span.style.color = '';
            i++;
            setTimeout(typeNext, glitchSpeed);
          }
        }, glitchSpeed);
      }

      typeNext();
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
          targets: [taglineRef.current, leadRef.current].filter(Boolean),
          opacity: [0, 1],
          translateY: [16, 0],
          delay: anime.stagger(140),
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
                        if (!liderRef.current) return;

                        liderRef.current.classList.add('hero__badges-track--scrolling');

                        // ── Sections via IntersectionObserver ──
                        onAllDoneRef.current?.();

                        const sectionEls = [
                          nowRef.current,
                          statsRef.current,
                          projectsRef.current,
                          videosRef.current,
                          blogRef.current,
                          experienceRef.current,
                          toolsRef.current,
                          interestsRef.current,
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
                                  entry.target.style.transform = 'none';
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

  /* ── step 2: mac animation (CSS-driven) ── */
  const animateMac = useCallback(() => {
    windowImgRef.current?.closest('.mac-screen')?.classList.add('mac--play');

    // Type "Work harder, comrade" in terminal style at ~4500ms
    setTimeout(() => {
      const el = workTextRef.current;
      if (!el) return;
      el.style.opacity = '1';
      el.innerHTML = '';

      const cmds = [
        { prompt: '>>> ', text: 'from appsec import mindset', color: '#0f0' },
        { prompt: '>>> ', text: 'print("Work harder, comrade")', color: '#0f0' },
        { prompt: '', text: 'Work harder, comrade', color: '#D51A1A' },
        { prompt: '>>> ', text: 'portfolio.load()', color: '#0f0' },
      ];
      let cmdIdx = 0;
      const speed = 35;

      function typeCmd() {
        if (cmdIdx >= cmds.length) return;
        const cmd = cmds[cmdIdx];

        // Prompt
        if (cmd.prompt) {
          const promptSpan = document.createElement('span');
          promptSpan.textContent = cmd.prompt;
          promptSpan.style.color = '#0f0';
          el.appendChild(promptSpan);
        }

        // Type text character by character
        const chars = cmd.text.split('');
        let i = 0;

        function typeChar() {
          if (i >= chars.length) {
            el.appendChild(document.createElement('br'));
            cmdIdx++;
            setTimeout(typeCmd, 200);
            return;
          }
          const span = document.createElement('span');
          span.style.color = cmd.color;
          span.textContent = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          el.appendChild(span);
          setTimeout(() => {
            span.textContent = chars[i];
            i++;
            setTimeout(typeChar, speed);
          }, speed);
        }
        typeChar();
      }
      typeCmd();
    }, 4500);

    // brandCol starts after Mac progress ends (~4950ms)
    setTimeout(() => {
      brandColRef.current?.classList.add('brand-col--animate');
    }, 4950);
    // animateText starts after CSS animations complete (~4900ms total)
    setTimeout(animateText, 4950);
  }, [animateText]);

  /* ── step 1: nav + init hidden states + kickoff ── */
  useEffect(() => {
    if (!isVisible) return;

    // Skip all animations if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      navRef.current.style.opacity    = '1';
      navRef.current.style.transform  = 'none';
      socialsRef.current.style.opacity = '1';
      const reducedGroups = socialsRef.current?.querySelectorAll('.social-group');
      if (reducedGroups) {
        reducedGroups.forEach(g => { g.style.opacity = '1'; g.style.transform = 'none'; });
      }
      liderRef.current.classList.add('hero__badges-track--scrolling');
      setStatsActive(true);
      onAllDoneRef.current?.();
      const allSections = [
        nowRef, statsRef, projectsRef, videosRef, blogRef, experienceRef, toolsRef, interestsRef, footerRef,
      ];
      allSections.forEach(r => {
        if (!r.current) return;
        r.current.style.opacity    = '1';
        r.current.style.transform  = 'none';
        r.current.style.willChange = 'auto';
      });
      // Show mac content and set hero text directly (no typewriter)
      brandColRef.current?.classList.add('brand-col--animate');
      windowImgRef.current?.closest('.mac-screen')?.classList.add('mac--play');
      if (titleRef.current) titleRef.current.textContent = TITLE_TEXT;
      if (subtitleRef.current) {
        subtitleRef.current.style.opacity = '1';
        subtitleRef.current.textContent = SUBTITLE_TEXT;
      }
      if (taglineRef.current) taglineRef.current.style.opacity = '1';
      if (leadRef.current) leadRef.current.style.opacity = '1';
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
    titleRef, subtitleRef, taglineRef, leadRef, socialsRef, liderRef, brandColRef,
    nowRef, statsRef, projectsRef, videosRef, blogRef, experienceRef, toolsRef, interestsRef, footerRef,
    statsActive,
  };
}
