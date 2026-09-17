import { useCallback, useEffect, useRef, useState } from 'react';

// Screens of the home page (desktop and tablets in landscape). Every top-level block is
// an in-flow section at least one viewport tall, and the document snaps to the start of
// each one (html.gp-snap in Screens.css). Wheel, keys, swipe and #hash links are native;
// the hook only tracks which screen is on (dots, counter, nav highlight, ScreenProvider)
// and fits tall content into the viewport height. Below 901px the same markup renders as
// a plain scrolling document.

const DESKTOP_MQ = '(min-width: 901px)';
const REDUCE_MQ = '(prefers-reduced-motion: reduce)';
const NOTCH_PX = 40;    // a wheel event at least this big is a mouse notch or a trackpad swipe
const LOCK_MS = 800;    // one screen per notch: further notches are ignored while the scroll runs
const TAIL_PX = 32;    // a screen overhanging the viewport by this much still counts as fitting: the fit
                       // zoom floor leaves a few px (13px on the intro at 1280x720)

const reduceMotion = () => window.matchMedia(REDUCE_MQ).matches;

export function useScreens({ count, ready }) {
  const [desktop, setDesktop] = useState(() => window.matchMedia(DESKTOP_MQ).matches);
  const [cur, setCur] = useState(0);
  const rootRef = useRef(null);

  const screens = useCallback(() => (rootRef.current ? [...rootRef.current.querySelectorAll('.gp-screen')] : []), []);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    const onChange = (e) => setDesktop(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Body class drives the layout (Screens.css); the snap container is the document
  // itself, so the snap type lives on <html>.
  useEffect(() => {
    document.body.classList.toggle('gp-on', desktop);
    document.body.classList.toggle('gp-doc', !desktop);
    document.documentElement.classList.toggle('gp-snap', desktop);
    return () => {
      document.body.classList.remove('gp-on', 'gp-doc');
      document.documentElement.classList.remove('gp-snap');
    };
  }, [desktop]);

  const goTo = useCallback((i) => {
    const els = screens();
    if (i < 0 || i >= els.length) return;
    els[i].scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'start' });
  }, [screens]);

  // Fit every screen into the viewport height: shrink down to a floor, grow on
  // ultra-wide monitors where the content would otherwise sit small in the middle.
  // A screen grows with its content, so the budget is the viewport, not the screen.
  const fit = useCallback(() => {
    if (!desktop) return;
    const floor = window.innerWidth < 1300 ? 0.85 : 0.6;
    screens().forEach((s) => {
      const prev = s.style.getPropertyValue('--gp-zoom') || '1';
      s.style.setProperty('--gp-zoom', '1');
      const cs = getComputedStyle(s);
      const pad = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
      const avail = window.innerHeight - pad;
      let need = s.scrollHeight - pad;
      let next = '1';
      if (need > avail + 2) {
        const z = Math.max(floor, avail / need);
        s.style.setProperty('--gp-zoom', z.toFixed(3));
        need = s.scrollHeight - pad;
        next = (need > avail + 2 ? Math.max(floor, (z * avail) / need) : z).toFixed(3);
      } else if (window.innerWidth >= 2000) {
        // union rectangle of the in-flow children: decor (watermark, hero grid) is absolute and skipped
        const rects = [...s.children]
          .filter((c) => !c.classList.contains('gp-wmw') && getComputedStyle(c).position !== 'absolute')
          .map((c) => c.getBoundingClientRect());
        const content = rects.length ? Math.max(...rects.map((r) => r.bottom)) - Math.min(...rects.map((r) => r.top)) : need;
        const z = Math.min(1.3, (window.innerWidth - 160) / 1900, (avail / content) * 0.94);
        if (z > 1.02) next = z.toFixed(3);
      }
      // Keep the previous zoom when the new one is within 0.01: the measurement at zoom 1
      // and at the fitted zoom disagree by a few thousandths, and writing that difference
      // back resized the screen, re-triggered the observer and oscillated (0.850/0.853).
      s.style.setProperty('--gp-zoom', Math.abs(parseFloat(next) - parseFloat(prev)) < 0.01 ? prev : next);
    });
  }, [desktop, screens]);

  // Refit on resize, when fonts arrive and whenever a screen's content changes size
  // (language switch, "show more", images loading).
  useEffect(() => {
    if (!desktop) return undefined;
    // Observer and resize callbacks only schedule a fit for the next frame: fitting inside
    // the ResizeObserver callback changes the sizes it reports on and raised
    // "ResizeObserver loop completed with undelivered notifications" at 1280x720
    // (in development the error overlay then covered the page and swallowed the wheel).
    let raf = 0;
    const schedule = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(fit); };
    fit();
    const t1 = setTimeout(schedule, 50);
    const t2 = setTimeout(schedule, 1500);
    if (document.fonts) document.fonts.ready.then(schedule);
    window.addEventListener('resize', schedule);
    let ro = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(schedule);
      screens().forEach((s) => [...s.children].forEach((c) => ro.observe(c)));
    }
    return () => {
      clearTimeout(t1); clearTimeout(t2);
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', schedule);
      if (ro) ro.disconnect();
    };
  }, [desktop, fit, screens, ready]);

  // The screen that covers most of the viewport is the current one.
  useEffect(() => {
    if (!desktop) return undefined;
    const els = screens();
    if (!els.length) return undefined;
    const ratios = new Map();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => ratios.set(e.target, e.intersectionRatio));
      let best = 0;
      let bestRatio = -1;
      els.forEach((el, i) => {
        const r = ratios.get(el) ?? 0;
        if (r > bestRatio) { bestRatio = r; best = i; }
      });
      setCur(best);
    }, { threshold: [0, 0.25, 0.5, 0.75, 1] });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [desktop, screens, ready]);

  // Wheel assist. Native snapping alone moves on only after more than half a screen of
  // travel, which a 100px mouse notch never reaches, so it bounced back. A wheel event of
  // NOTCH_PX or more moves exactly one screen and further events are ignored for LOCK_MS.
  // Smaller deltas stay native, a screen taller than the viewport by more than TAIL_PX
  // scrolls natively until its edge, and the first and last screens keep native scrolling
  // towards the ends of the page, so the bottom of the last screen stays reachable.
  useEffect(() => {
    if (!desktop || !ready) return undefined;
    let lockUntil = 0;
    const onWheel = (e) => {
      if (e.ctrlKey) return;
      const dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaMode === 2 ? e.deltaY * window.innerHeight : e.deltaY;
      if (Math.abs(dy) < NOTCH_PX) return;
      const dir = Math.sign(dy);
      const els = screens();
      const mid = window.innerHeight / 2;
      const i = els.findIndex((el) => { const r = el.getBoundingClientRect(); return r.top <= mid && r.bottom > mid; });
      if (i < 0 || !els[i + dir]) return;                                   // no screen that way: native
      const r = els[i].getBoundingClientRect();
      if (dir > 0 ? r.bottom > window.innerHeight + TAIL_PX : r.top < -TAIL_PX) return;   // tall screen: native to its edge
      e.preventDefault();
      const now = Date.now();
      if (now < lockUntil) return;
      lockUntil = now + LOCK_MS;
      goTo(i + dir);
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [desktop, ready, screens, goTo]);

  return { mode: desktop ? 'screens' : 'doc', cur, goTo, count, rootRef };
}
