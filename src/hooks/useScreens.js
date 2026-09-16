import { useCallback, useEffect, useRef, useState } from 'react';

// Full-screen switcher for the home page (desktop and tablets in landscape).
// The screens are absolutely positioned inside .main-page and only one is
// visible; wheel, keys, swipe, the dots and any #hash link move between them.
// Below 901px the same markup renders as a normal scrolling document.
//
// The hook owns the interaction and the fit-to-height zoom; the markup (classes
// gp-screen / is-active / is-leaving) is rendered by MainPage from `cur`/`leaving`.

const DESKTOP_MQ = '(min-width: 901px)';
const REDUCE_MQ = '(prefers-reduced-motion: reduce)';
const LEAVE_MS = 320;
const LOCK_MS = 800;          // no second switch while the previous one is still animating
const GESTURE_GAP_MS = 260;   // wheel events closer than this belong to the same gesture (trackpad inertia)
const WHEEL_THRESHOLD = 60;

const reduceMotion = () => window.matchMedia(REDUCE_MQ).matches;

export function useScreens({ count, ready }) {
  const [desktop, setDesktop] = useState(() => window.matchMedia(DESKTOP_MQ).matches);
  const [cur, setCur] = useState(0);
  const [leaving, setLeaving] = useState(-1);
  const rootRef = useRef(null);
  const curRef = useRef(0);
  const lockRef = useRef(0);
  const leaveTimer = useRef(null);

  const screens = useCallback(() => (rootRef.current ? [...rootRef.current.querySelectorAll('.gp-screen')] : []), []);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    const onChange = (e) => setDesktop(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Body class drives the layout (Screens.css); the document mode keeps the page scrolling.
  useEffect(() => {
    document.body.classList.toggle('gp-on', desktop);
    document.body.classList.toggle('gp-doc', !desktop);
    if (desktop) {
      // inline reveal styles from the document mode would hide screen content
      screens().forEach((s) => {
        s.querySelectorAll('.section-reveal').forEach((el) => { el.style.opacity = ''; el.style.transform = ''; });
        s.style.opacity = ''; s.style.transform = '';
      });
    }
    return () => { document.body.classList.remove('gp-on', 'gp-doc'); };
  }, [desktop, screens]);

  const goTo = useCallback((i) => {
    const els = screens();
    if (i < 0 || i >= els.length || i === curRef.current) return;
    const from = curRef.current;
    curRef.current = i;
    els[i].scrollTop = 0;
    setLeaving(from);
    setCur(i);
    lockRef.current = Date.now() + (reduceMotion() ? 150 : LOCK_MS);
    clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => setLeaving((l) => (l === from ? -1 : l)), LEAVE_MS);
  }, [screens]);

  // Fit every screen into the viewport height: shrink down to a floor, grow on
  // ultra-wide monitors where the content would otherwise sit small in the middle.
  const fit = useCallback(() => {
    if (!desktop) return;
    const floor = window.innerWidth < 1300 ? 0.85 : 0.6;
    screens().forEach((s) => {
      s.style.setProperty('--gp-zoom', '1');
      const cs = getComputedStyle(s);
      const pad = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
      const avail = s.clientHeight - pad;
      let need = s.scrollHeight - pad;
      if (need > avail + 2) {
        const z = Math.max(floor, avail / need);
        s.style.setProperty('--gp-zoom', z.toFixed(3));
        need = s.scrollHeight - pad;
        if (need > avail + 2) s.style.setProperty('--gp-zoom', Math.max(floor, (z * avail) / need).toFixed(3));
      } else if (window.innerWidth >= 2000) {
        // union rectangle of the in-flow children: decor (watermark, hero grid) is absolute and skipped
        const rects = [...s.children]
          .filter((c) => !c.classList.contains('gp-wmw') && getComputedStyle(c).position !== 'absolute')
          .map((c) => c.getBoundingClientRect());
        const content = rects.length ? Math.max(...rects.map((r) => r.bottom)) - Math.min(...rects.map((r) => r.top)) : need;
        const z = Math.min(1.3, (window.innerWidth - 160) / 1900, (avail / content) * 0.94);
        if (z > 1.02) s.style.setProperty('--gp-zoom', z.toFixed(3));
      }
    });
  }, [desktop, screens]);

  // Refit on resize, when fonts arrive and whenever a screen's content changes size
  // (language switch, "show more", images loading).
  useEffect(() => {
    if (!desktop) return undefined;
    fit();
    const t1 = setTimeout(fit, 50);
    const t2 = setTimeout(fit, 1500);
    if (document.fonts) document.fonts.ready.then(fit);
    window.addEventListener('resize', fit);
    let ro = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => fit());
      screens().forEach((s) => [...s.children].forEach((c) => ro.observe(c)));
    }
    return () => {
      clearTimeout(t1); clearTimeout(t2);
      window.removeEventListener('resize', fit);
      if (ro) ro.disconnect();
    };
  }, [desktop, fit, screens, ready]);

  // Input: wheel, swipe, keyboard, #hash links. Only once the intro animation is over.
  useEffect(() => {
    if (!desktop || !ready) return undefined;
    const els = screens();
    const scrollable = (el, dir) => {
      if (!el || el.scrollHeight <= el.clientHeight + 2) return false;
      const oy = getComputedStyle(el).overflowY;
      if (oy !== 'auto' && oy !== 'scroll') return false;
      return dir > 0 ? el.scrollTop + el.clientHeight < el.scrollHeight - 2 : el.scrollTop > 2;
    };
    const canScroll = (dir) => scrollable(els[curRef.current], dir);
    // a scrollable box inside the screen (the certificate list, a long panel) scrolls first
    const innerCanScroll = (target, dir) => {
      const screen = els[curRef.current];
      for (let el = target instanceof Element ? target : null; el && el !== screen; el = el.parentElement) {
        if (scrollable(el, dir)) return true;
      }
      return false;
    };
    const next = () => goTo(curRef.current + 1);
    const prev = () => goTo(curRef.current - 1);

    // One gesture, one switch: a trackpad keeps sending inertia events for a second or
    // more after the fingers stop, so every event within GESTURE_GAP_MS of the previous
    // one belongs to the gesture that already moved (or scrolled inside) the screen.
    let acc = 0;
    let lastWheel = 0;
    let gestureDone = false;
    let gestureInner = false;
    const onWheel = (e) => {
      const dir = Math.sign(e.deltaY);
      if (!dir) return;
      const now = Date.now();
      const fresh = now - lastWheel > GESTURE_GAP_MS;
      lastWheel = now;
      if (fresh) { acc = 0; gestureDone = false; gestureInner = innerCanScroll(e.target, dir) || canScroll(dir); }
      if (innerCanScroll(e.target, dir) || canScroll(dir)) return;   // native scroll inside the screen
      e.preventDefault();
      if (gestureDone || gestureInner) return;      // this gesture already did its job
      if (now < lockRef.current) return;
      acc += e.deltaY;
      if (Math.abs(acc) < WHEEL_THRESHOLD) return;
      acc = 0;
      gestureDone = true;
      if (dir > 0) next(); else prev();
    };

    let touchY = null;
    const onTouchStart = (e) => { touchY = e.touches[0].clientY; };
    const onTouchEnd = (e) => {
      if (touchY === null) return;
      const dy = touchY - e.changedTouches[0].clientY;
      touchY = null;
      if (Math.abs(dy) < 60 || Date.now() < lockRef.current || canScroll(Math.sign(dy)) || innerCanScroll(e.target, Math.sign(dy))) return;
      if (dy > 0) next(); else prev();
    };

    const onKey = (e) => {
      if (e.target.closest('input,textarea,select')) return;
      const k = e.key;
      const down = k === 'PageDown' || k === 'ArrowDown' || k === ' ';
      const up = k === 'PageUp' || k === 'ArrowUp';
      if (!down && !up) return;
      const dir = down ? 1 : -1;
      if (innerCanScroll(e.target, dir)) return;      // a focused inner list scrolls itself
      e.preventDefault();
      if (canScroll(dir)) { els[curRef.current].scrollBy({ top: dir * 160, behavior: 'smooth' }); return; }
      if (dir > 0) next(); else prev();
    };

    // every id inside a screen maps to that screen, so #projects, #now, #footer, #top keep working
    const idIndex = {};
    els.forEach((s, i) => {
      idIndex[s.id] = i;
      s.querySelectorAll('[id]').forEach((el) => { idIndex[el.id] = i; });
    });
    Object.assign(idIndex, { top: 0, hero: 0, intro: 0, footer: els.length - 1, consent: els.length - 1 });
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a || a.closest('.gp-dots')) return;
      const i = idIndex[a.getAttribute('href').slice(1)];
      if (i === undefined) return;
      e.preventDefault();
      goTo(i);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, [desktop, ready, goTo, screens]);

  useEffect(() => () => clearTimeout(leaveTimer.current), []);

  return { mode: desktop ? 'screens' : 'doc', cur, leaving, goTo, count, rootRef };
}
