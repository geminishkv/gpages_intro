// Analytics consent. Nothing third-party is loaded until the visitor accepts the
// banner; the choice lives in localStorage for CONSENT_TTL and can be changed
// again from the privacy page (/#consent).

const CONSENT_KEY = 'ata_consent';
const CONSENT_TTL = 180 * 24 * 60 * 60 * 1000; // 180 days
const ANALYTICS_HOSTS = ['geminishkv.tech', 'www.geminishkv.tech'];
const YM_ID = process.env.REACT_APP_YM_ID;

let analyticsLoaded = false;

export function getConsent() {
  try {
    const stored = JSON.parse(localStorage.getItem(CONSENT_KEY));
    if (!stored || typeof stored.ts !== 'number') return null;
    if (Date.now() - stored.ts > CONSENT_TTL) return null;
    return stored.value === 'accepted' ? 'accepted' : 'declined';
  } catch {
    return null;
  }
}

export function setConsent(value) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ value, ts: Date.now() }));
  } catch { /* private mode: the banner simply shows again next visit */ }
  if (value === 'accepted') loadAnalytics();
}

export function resetConsent() {
  try { localStorage.removeItem(CONSENT_KEY); } catch { /* ignore */ }
}

function addScript(src, attrs = {}) {
  const el = document.createElement('script');
  el.src = src;
  el.async = true;
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  document.head.appendChild(el);
}

// Plausible (cookieless) + Yandex Metrika. Only on the production hosts, so local
// and preview builds never report anything.
export function loadAnalytics() {
  if (analyticsLoaded || typeof window === 'undefined') return;
  if (!ANALYTICS_HOSTS.includes(window.location.hostname)) return;
  analyticsLoaded = true;

  addScript('https://plausible.io/js/script.js', { defer: '', 'data-domain': 'geminishkv.tech' });

  if (!/^\d+$/.test(YM_ID ?? '')) return;
  const id = Number(YM_ID);
  window.ym = window.ym || function ym() { (window.ym.a = window.ym.a || []).push(arguments); };
  window.ym.l = Date.now();
  addScript(`https://mc.yandex.ru/metrika/tag.js?id=${id}`);
  window.ym(id, 'init', {
    ssr: true,
    webvisor: true,
    clickmap: true,
    ecommerce: 'dataLayer',
    referrer: document.referrer,
    url: window.location.href,
    accurateTrackBounce: true,
    trackLinks: true,
  });
}

// Called once on startup: honours a consent given on an earlier visit.
export function initAnalytics() {
  if (getConsent() === 'accepted') loadAnalytics();
}
