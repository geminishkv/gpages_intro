import { useCallback, useRef } from 'react';

// Download buttons (.dl-btn): the file is fetched for real and the circle fills with
// the actual progress; the orbit spins until the bytes are in, then the button opens
// with "Open" and the gold border. Hosts without CORS fall back to a timed fill and
// the file opens in the tab that was reserved during the click (no popup blocker).

const clamp = (v) => Math.max(0, Math.min(1, v));
const setProgress = (btn, p) => btn.style.setProperty('--dl-p', `${(clamp(p) * 100).toFixed(1)}%`);
const fileName = (url) => {
  try { return decodeURIComponent(new URL(url).pathname.split('/').pop()) || 'file'; } catch { return 'file'; }
};

async function realDownload(btn, url) {
  const res = await fetch(url, { mode: 'cors' });          // throws on CORS/CSP → simulated()
  if (!res.ok || !res.body) throw new Error(`http ${res.status}`);
  const total = Number(res.headers.get('content-length')) || 0;
  const reader = res.body.getReader();
  const chunks = [];
  let got = 0;
  let creep = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    got += value.length;
    if (total) setProgress(btn, got / total);
    else { creep = Math.min(0.9, creep + 0.03); setProgress(btn, creep); }
  }
  setProgress(btn, 1);
  const blob = new Blob(chunks, { type: res.headers.get('content-type') || 'application/octet-stream' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = fileName(url);
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 60000);
  return 'saved';
}

function simulated(btn, url, tab, ms = 2600) {
  return new Promise((resolve) => {
    const t0 = performance.now();
    const tick = () => {
      const p = (performance.now() - t0) / ms;
      setProgress(btn, p);
      if (p < 1) { requestAnimationFrame(tick); return; }
      if (tab) tab.location.href = url; else window.open(url, '_blank', 'noopener');
      resolve('opened');
    };
    requestAnimationFrame(tick);
  });
}

export function useDownload() {
  const running = useRef(new WeakSet());

  return useCallback(async (btn, url) => {
    if (!btn || running.current.has(btn)) return;         // a second button is independent
    running.current.add(btn);
    btn.classList.add('dl-btn--active', 'dl-btn--live');
    setProgress(btn, 0);
    let tab = null;
    try { tab = window.open('about:blank', '_blank'); } catch { tab = null; }
    const t0 = performance.now();
    let how;
    try {
      how = await realDownload(btn, url);
      if (tab) tab.close();
    } catch {
      how = await simulated(btn, url, tab);
    }
    await new Promise((r) => setTimeout(r, Math.max(0, 1200 - (performance.now() - t0))));  // no flicker on fast files
    btn.classList.add('dl-btn--done');
    btn.dataset.dlHow = how;
    setTimeout(() => {
      btn.classList.remove('dl-btn--active', 'dl-btn--live', 'dl-btn--done');
      btn.style.removeProperty('--dl-p');
      running.current.delete(btn);
    }, 4000);
  }, []);
}
