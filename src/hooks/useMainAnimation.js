import { useEffect, useRef, useCallback } from 'react';
import anime from 'animejs/lib/anime.js';
import { TITLE_TEXT } from '../constants';

export function useMainAnimation(isVisible, onAllDone) {
  const navRef          = useRef(null);
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

  /* ── step 3: reveal text after mac loads ── */
  const animateText = useCallback(() => {
    if (!titleRef.current) return;
    titleRef.current.innerHTML = '';

    const chars = TITLE_TEXT.split('');
    let i = 0;

    const timer = setInterval(() => {
      if (i >= chars.length) {
        clearInterval(timer);
        anime({
          targets: subtitleRef.current,
          opacity: [0, 1],
          translateY: [1200, 0],
          duration: 750,
          easing: 'easeOutExpo',
        });
        setTimeout(() => {
          anime({
            targets: [taglineRef.current, socialsRef.current],
            opacity: [0, 1],
            translateY: [16, 0],
            delay: anime.stagger(200),
            duration: 600,
            easing: 'easeOutExpo',
          });
          setTimeout(() => {
            anime({
              targets: liderRef.current.querySelectorAll('.hero__badge:not(.hero__badge--dup)'),
              opacity: [0, 1],
              translateY: [20, 0],
              delay: anime.stagger(500),
              duration: 500,
              easing: 'easeOutExpo',
              complete: () => {
                setTimeout(() => {
                  liderRef.current.classList.add('hero__badges-track--scrolling');
                  if (onAllDone) onAllDone();
                }, 600);
              },
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
    // Считываем реальные размеры экрана мака из DOM
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

  return {
    navRef,
    blinkerRef, whiteBoxRef, containerBoxRef,
    windowImgRef, uwuRef, workTextRef, progressWrapRef, progressBarRef,
    titleRef, subtitleRef, taglineRef, socialsRef, liderRef,
  };
}
