#!/usr/bin/env node
'use strict';

const fs   = require('fs');
const path = require('path');

const BASE_URL  = 'https://geminishkv.tech';
const BUILD_DIR = path.join(__dirname, '..', 'build');
const DATA_FILE = path.join(__dirname, '..', 'src', 'data', 'tg-posts.json');

if (!fs.existsSync(BUILD_DIR)) {
  console.error('[blog] build/ not found — run npm run build first');
  process.exit(1);
}

const data  = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
const posts = data.posts ?? [];

/* ── helpers ── */

function esc(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function textToHtml(text) {
  return text.split('\n').map(l => l.trim() ? `<p>${esc(l)}</p>` : '<div class="gap"></div>').join('\n');
}

function extractTitle(text) {
  const first = text.split('\n')[0].trim();
  return first.replace(/[\u{1F300}-\u{1FFFF}\u2600-\u27BF\u2B50]/gu, '').trim() || 'AppSec & DevSecOps';
}

function truncate(text, max = 160) {
  const s = text.replace(/\n+/g, ' ').trim();
  return s.length > max ? s.slice(0, max - 1) + '\u2026' : s;
}

function fmtDate(iso, locale) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
}

function fmtViews(n) {
  if (!n) return null;
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace('.0', '')}\u202fK` : String(n);
}

/* ── shared styles ── */

const CSS = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --bg: #0a0a0a; --card: #111111; --border: #1a1a1a;
  --text: #e8e8e8; --muted: #888888; --accent: #D51A1A; --gold: #F9B361;
}
html, body { background: var(--bg); color: var(--text); font-family: 'Roboto', system-ui, sans-serif; min-height: 100dvh; line-height: 1.7; }
a { color: inherit; text-decoration: none; }

.page { max-width: 800px; margin: 0 auto; padding: 0 24px 64px; }

.nav { display: flex; align-items: center; justify-content: space-between; padding: 24px 0 32px; border-bottom: 1px solid var(--border); margin-bottom: 32px; }
.nav__brand { display: flex; align-items: center; gap: 10px; font-size: 15px; font-weight: 700; color: #fff; }
.nav__brand img { width: 28px; height: 28px; border-radius: 50%; }
.nav__back { font-size: 12px; color: var(--muted); border: 1px solid var(--border); border-radius: 4px; padding: 6px 14px; transition: color .2s, border-color .2s; letter-spacing: 0.06em; text-transform: uppercase; }
.nav__back:hover { color: #fff; border-color: var(--accent); }

.nav__right-group { display: flex; align-items: center; gap: 10px; }
.lang-toggle { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; color: var(--accent); border: 1px solid var(--accent); border-radius: 4px; padding: 5px 10px; transition: background .2s, color .2s; }
.lang-toggle:hover { background: var(--accent); color: #fff; }

.divider { height: 1px; background: linear-gradient(to right, var(--accent), rgba(204,34,0,.15), transparent); margin: 40px 0 20px; }
.footer { font-size: 0.65rem; color: var(--muted); text-align: center; }
.footer a { color: var(--accent); transition: color .2s; }
.footer a:hover { color: var(--gold); }
.disclaimer { font-size: 0.55rem; color: #555; text-align: center; margin-top: 12px; line-height: 1.4; }

@media (max-width: 600px) { .page { padding: 0 16px 48px; } }
`;

const DISCLAIMER_RU = 'Instagram* \u2014 \u043f\u0440\u043e\u0434\u0443\u043a\u0442 \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u0438 Meta Platforms Inc., \u0434\u0435\u044f\u0442\u0435\u043b\u044c\u043d\u043e\u0441\u0442\u044c \u043a\u043e\u0442\u043e\u0440\u043e\u0439 \u0437\u0430\u043f\u0440\u0435\u0449\u0435\u043d\u0430 \u043d\u0430 \u0442\u0435\u0440\u0440\u0438\u0442\u043e\u0440\u0438\u0438 \u0420\u0424 \u043a\u0430\u043a \u044d\u043a\u0441\u0442\u0440\u0435\u043c\u0438\u0441\u0442\u0441\u043a\u0430\u044f.';
const DISCLAIMER_EN = 'Instagram* is a product of Meta Platforms Inc., banned in Russia as extremist.';

/* ══════════════════════════════════════════════════════════
   POST PAGE
   ══════════════════════════════════════════════════════════ */

function renderPost(post, lang) {
  const isEn = lang === 'en';
  const text = (isEn && post.text_en) ? post.text_en : post.text;
  const locale = isEn ? 'en-US' : 'ru-RU';
  const title = extractTitle(text);
  const desc = truncate(text);
  const ruUrl = `${BASE_URL}/blog/${post.id}/`;
  const enUrl = `${BASE_URL}/blog/en/${post.id}/`;
  const pageUrl = isEn ? enUrl : ruUrl;
  const imageUrl = post.image ? `${BASE_URL}${post.image}` : `${BASE_URL}/img/hero/avatar.jpg`;
  const dateStr = fmtDate(post.date, locale);
  const views = fmtViews(post.views);
  const backLabel = isEn ? '\u2190 All posts' : '\u2190 \u0412\u0441\u0435 \u043f\u043e\u0441\u0442\u044b';
  const tgLabel = isEn ? 'Open in Telegram' : '\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u0432 Telegram';
  const disclaimer = isEn ? DISCLAIMER_EN : DISCLAIMER_RU;

  const tagsHtml = post.tags?.length
    ? `<div class="tags">${post.tags.map(t => `<span class="tag">#${esc(t)}</span>`).join('')}</div>` : '';

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org', '@type': 'BlogPosting',
    headline: title, description: desc, url: pageUrl,
    datePublished: post.date, dateModified: post.date,
    image: imageUrl, inLanguage: lang,
    author: { '@type': 'Person', name: isEn ? 'Ilya Shmakov' : '\u0418\u043b\u044c\u044f \u0428\u043c\u0430\u043a\u043e\u0432', url: BASE_URL },
    publisher: { '@type': 'Organization', name: 'geminishkv', url: BASE_URL },
  });

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(title)} \u2014 geminishkv</title>
  <meta name="description" content="${esc(desc)}" />
  <meta name="keywords" content="${post.tags?.length ? post.tags.map(t => esc(t)).join(', ') + ', ' : ''}appsec, devsecops, geminishkv" />
  <meta name="author" content="${isEn ? 'Ilya Shmakov' : '\u0418\u043b\u044c\u044f \u0428\u043c\u0430\u043a\u043e\u0432'}" />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
  <meta name="theme-color" content="#0a0a0a" />
  <link rel="canonical" href="${pageUrl}" />
  <link rel="sitemap" href="/sitemap.xml" />
  <link rel="alternate" type="application/rss+xml" title="geminishkv blog" href="${isEn ? '/rss-en.xml' : '/rss.xml'}" />
  <link rel="alternate" hreflang="ru" href="${ruUrl}" />
  <link rel="alternate" hreflang="en" href="${enUrl}" />
  <link rel="alternate" hreflang="x-default" href="${ruUrl}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="${pageUrl}" />
  <meta property="og:title" content="${esc(title)} \u2014 geminishkv" />
  <meta property="og:description" content="${esc(desc)}" />
  <meta property="og:image" content="${imageUrl}" />
  <meta property="og:image:alt" content="${esc(title)}" />
  <meta property="og:locale" content="${isEn ? 'en_US' : 'ru_RU'}" />
  <meta property="og:locale:alternate" content="${isEn ? 'ru_RU' : 'en_US'}" />
  <meta property="og:site_name" content="geminishkv" />
  <meta property="article:published_time" content="${post.date}" />
  <meta property="article:author" content="${isEn ? 'Ilya Shmakov' : '\u0418\u043b\u044c\u044f \u0428\u043c\u0430\u043a\u043e\u0432'}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@geminishkv" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(desc)}" />
  <meta name="twitter:image" content="${imageUrl}" />
  <script type="application/ld+json">${jsonLd}</script>
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <link rel="stylesheet" href="/fonts/fonts.css" />
  <style>${CSS}
    .cover { width: 100%; border-radius: 8px; overflow: hidden; margin-bottom: 28px; max-height: 400px; }
    .cover img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .meta { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; font-size: 0.72rem; color: var(--muted); }
    .content p { font-size: 0.85rem; line-height: 1.85; margin-bottom: 8px; }
    .content .gap { height: 10px; }
    .tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 24px; }
    .tag { font-size: 0.6rem; color: var(--gold); background: rgba(249,179,97,.06); border: 1px solid rgba(249,179,97,.15); border-radius: 3px; padding: 2px 8px; }
    .tg-link { display: inline-flex; align-items: center; gap: 8px; margin-top: 28px; padding: 10px 20px; background: rgba(204,34,0,.1); border: 1px solid rgba(204,34,0,.25); border-radius: 6px; color: #fff; font-size: 0.75rem; font-weight: 600; transition: background .2s; }
    .tg-link:hover { background: rgba(204,34,0,.18); }
  </style>
</head>
<body>
  <div class="page">
    <nav class="nav">
      <a href="/" class="nav__brand"><img src="/img/logotype/logo_white.svg" alt="" />geminishkv</a>
      <div class="nav__right-group">
        <a href="${isEn ? `/blog/${post.id}/` : `/blog/en/${post.id}/`}" class="lang-toggle">${isEn ? 'RU' : 'EN'}</a>
        <a href="/blog/" class="nav__back">${backLabel}</a>
      </div>
    </nav>
    ${post.image ? `<div class="cover"><img src="${post.image}" alt="${esc(title)}" /></div>` : ''}
    <article>
      <div class="meta"><span>${dateStr}</span>${views ? `<span>\u00b7</span><span>${views} views</span>` : ''}</div>
      <div class="content">${textToHtml(text)}</div>
      ${tagsHtml}
      <a href="${post.url}" target="_blank" rel="noreferrer" class="tg-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z"/></svg>
        ${tgLabel}
      </a>
    </article>
    <div class="divider"></div>
    <footer class="footer">
      <p>\u00a9 ${new Date().getFullYear()} <a href="/">geminishkv.tech</a></p>
      <p class="disclaimer">${disclaimer}</p>
    </footer>
  </div>
</body>
</html>`;
}

/* ══════════════════════════════════════════════════════════
   INDEX PAGE
   ══════════════════════════════════════════════════════════ */

const PER_PAGE = 15;      // static pages under /blog/page/N/ (the sitemap counts with the same size)
const FIRST_PAGE = 24;    // cards on /blog/ before "show more"
const TAG_LIMIT = 9;
// tags that mark a substantive post: the featured slot skips memes
const CONTENT_TAGS = ['appsec', 'devsecops', 'toolchain', 'reco', 'paper', 'techsolution', 'specialty', 'pmcases'];

const L = {
  ru: {
    lang: 'ru', locale: 'ru-RU', heading: 'Блог', eyebrow: 'telegram · @appsecta',
    desc: (y) => `Заметки о безопасной разработке, DevSecOps и жизни AppSec-лида. Посты из канала AppSecTA с ${y} года: инструменты, разборы, рекомендации, кейсы и немного мемов.`,
    sub: 'Материалы по AppSec & DevSecOps', posts: 'постов', topics: 'тем', years: 'годы', all: 'все',
    search: 'Поиск по постам', kicker: 'последний пост', read: 'Читать', more: 'Показать ещё', views: 'просм.',
    empty: 'Ничего не нашлось. Попробуй другой тег или слово.',
    subTitle: 'Свежие посты раньше сайта — в Telegram', subText: 'Канал @appsecta: новые посты каждую неделю, обсуждение в комментариях.',
    subscribe: 'Подписаться', privacy: 'Политика конфиденциальности', home: 'На главную', page: 'Страница', prev: '← Назад', next: 'Далее →',
    nav: { home: 'Главная', blog: 'Блог', experience: 'Опыт', skillset: 'Навыки', interests: 'Интересы', contacts: 'Контакты' },
    other: 'EN', otherHref: '/blog/en/',
  },
  en: {
    lang: 'en', locale: 'en-US', heading: 'Blog', eyebrow: 'telegram · @appsecta',
    desc: (y) => `Notes on secure development, DevSecOps and the life of an AppSec lead. Posts from the AppSecTA channel since ${y}: tools, breakdowns, recommendations, cases and a few memes.`,
    sub: 'AppSec & DevSecOps insights', posts: 'posts', topics: 'topics', years: 'years', all: 'all',
    search: 'Search posts', kicker: 'latest post', read: 'Read', more: 'Show more', views: 'views',
    empty: 'Nothing found. Try another tag or word.',
    subTitle: 'Fresh posts land in Telegram first', subText: '@appsecta: new posts every week, discussion in the comments.',
    subscribe: 'Subscribe', privacy: 'Privacy policy', home: 'Home', page: 'Page', prev: '← Prev', next: 'Next →',
    nav: { home: 'Home', blog: 'Blog', experience: 'Career', skillset: 'Skillset', interests: 'Interests', contacts: 'Contacts' },
    other: 'RU', otherHref: '/blog/',
  },
};

const EMOJI = /[\u{1F300}-\u{1FAFF}☀-➿️‍]+/gu;
const cleanLine = (l) => l.replace(EMOJI, '').trim();

// Compact record per post for the index: title, excerpt, tags, thumbnail. Computed once per language.
const indexCache = {};
function indexItems(lang) {
  if (indexCache[lang]) return indexCache[lang];
  const items = posts.map((p) => {
    const raw = (lang === 'en' && p.text_en) ? p.text_en : p.text;
    const text = raw.replace(/#[\wЀ-ӿ]+/g, '').trim();
    const lines = text.split('\n').map(cleanLine).filter(Boolean);
    const title = (lines[0] || 'AppSec & DevSecOps').slice(0, 110);
    const body = lines.slice(1).join(' ');
    const excerpt = body.length > 230 ? body.slice(0, 230).replace(/\s+\S*$/, '') + '…' : body;
    return { id: p.id, date: p.date, views: Number(p.views) || 0, tags: p.tags || [], title, excerpt, img: p.image || null };
  }).sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : Number(b.id) - Number(a.id)));
  indexCache[lang] = items;
  return items;
}

function topTags() {
  const count = new Map();
  posts.forEach((p) => (p.tags || []).forEach((t) => count.set(t, (count.get(t) || 0) + 1)));
  return [...count.entries()].sort((a, b) => b[1] - a[1]).slice(0, TAG_LIMIT);
}

const INDEX_CSS = `
:root { --bg: #0a0a0a; --card: #111111; --line: #1f1f1f; --line2: #2a2a2a; --text: #e8e6e1; --muted: #a6a39d; --dim: #918f8a;
  --red: #D51A1A; --gold: #F9B361; --display: 'Unbounded', 'Roboto', sans-serif; --body: 'Roboto', system-ui, sans-serif; --mono: 'Roboto Mono', ui-monospace, monospace;
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1); --dur-fast: 160ms; --dur-ui: 220ms; --dur-reveal: 600ms; color-scheme: dark; }
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body { background: var(--bg); color: var(--text); }
body { font-family: var(--body); font-size: 15px; line-height: 1.6; padding-inline: clamp(16px, 5vw, 120px); padding-block: 0 64px; position: relative; overflow-x: hidden; min-height: 100dvh; }
body::before { content: ""; position: fixed; inset: 0; background-image: linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px); background-size: 64px 64px; pointer-events: none; -webkit-mask: radial-gradient(ellipse at 70% 20%, #000 20%, transparent 70%); mask: radial-gradient(ellipse at 70% 20%, #000 20%, transparent 70%); }
a { color: inherit; text-decoration: none; }
button { font: inherit; color: inherit; }
.wm { position: fixed; top: 40%; right: -14%; width: min(52vw, 760px); aspect-ratio: 1; background: url("/img/logotype/logo_white.svg") center/contain no-repeat; opacity: .06; pointer-events: none; transform: rotate(-8deg); z-index: 0; }
.wrap { max-width: 1300px; margin: 0 auto; position: relative; z-index: 1; }
.nav { display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 18px 0; }
.nav__brand { display: flex; align-items: center; gap: 10px; font-family: var(--display); font-weight: 700; font-size: 1.05rem; color: #fff; }
.nav__logo { width: 38px; height: 38px; border-radius: 50%; background: #0a0a0a url("/img/logotype/logo_white.svg") center/contain no-repeat; box-shadow: 0 0 0 2px #D51A1A, 0 0 18px rgba(213,26,26,.55); }
.nav__links { display: flex; gap: 4px; padding: 6px; border-radius: 40px; background: #111; border: 1px solid var(--line); }
.nav__links a { font: 700 11px/1 var(--body); letter-spacing: .08em; text-transform: uppercase; padding: 10px 16px; border-radius: 30px; color: #fff; transition: background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out); }
.nav__links a:hover { background: #1c1c1c; } .nav__links a.is-active { background: #222; } .nav__links a:active { transform: scale(.97); }
.nav__lang { font: 700 11px/1 var(--mono); letter-spacing: .12em; color: var(--muted); padding: 10px 14px; border: 1px solid var(--line); border-radius: 30px; transition: color var(--dur-fast), border-color var(--dur-fast); }
.nav__lang:hover { color: #fff; border-color: var(--red); }
.head { display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr); gap: 24px 48px; align-items: end; padding: 44px 0 26px; border-bottom: 1px solid var(--line); }
.eyebrow { font: 700 11px/1 var(--mono); letter-spacing: .16em; text-transform: uppercase; color: var(--red); }
h1 { font-family: var(--display); font-size: clamp(2.6rem, 5vw, 4.6rem); line-height: 1; letter-spacing: -.02em; margin: 12px 0 14px; color: #fff; text-wrap: balance; }
.head p { margin: 0; max-width: 56ch; color: var(--muted); font-size: 1.02rem; text-wrap: pretty; }
.stats { display: flex; gap: 28px; justify-content: flex-end; flex-wrap: wrap; }
.stat b { display: block; font-family: var(--display); font-size: 1.7rem; color: #fff; font-variant-numeric: tabular-nums; }
.stat span { font: 700 10px/1.6 var(--mono); letter-spacing: .12em; text-transform: uppercase; color: var(--dim); }
.tools { display: flex; gap: 14px; align-items: center; justify-content: space-between; flex-wrap: wrap; padding: 18px 0 8px; position: sticky; top: 0; background: linear-gradient(var(--bg) 85%, transparent); z-index: 5; }
.chips { display: flex; gap: 8px; flex-wrap: wrap; }
.chip { font: 700 11px/1 var(--mono); letter-spacing: .08em; text-transform: uppercase; padding: 9px 13px; border: 1px solid var(--line2); border-radius: 30px; color: var(--muted); background: #0d0d0d; cursor: pointer; transition: border-color var(--dur-ui) var(--ease-out), color var(--dur-ui) var(--ease-out), background var(--dur-ui) var(--ease-out), transform var(--dur-fast) var(--ease-out); }
.chip small { color: var(--dim); margin-left: 6px; font-weight: 400; }
.chip:hover { border-color: var(--red); color: #fff; } .chip:active { transform: scale(.97); }
.chip.is-on { border-color: var(--red); color: #fff; background: rgba(213,26,26,.12); }
.search { display: flex; align-items: center; gap: 10px; border: 1px solid var(--line2); border-radius: 30px; padding: 0 14px; background: #0d0d0d; min-width: 260px; color: var(--muted); }
.search input { background: transparent; border: 0; outline: 0; color: #fff; font: 400 14px/1 var(--body); padding: 11px 0; width: 100%; }
.search input::placeholder { color: #8a8883; }
.search:focus-within { border-color: var(--gold); }
.feat { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); margin: 16px 0 22px; border: 1px solid var(--line2); border-radius: 10px; overflow: hidden; background: var(--card); transition: border-color var(--dur-ui) var(--ease-out), transform var(--dur-ui) var(--ease-out); }
.feat__img { aspect-ratio: 16/10; min-height: 240px; width: 100%; height: 100%; object-fit: cover; display: block; background: #0d0d0d; }
.feat__img--empty { background: linear-gradient(135deg, #171717, #0c0c0c) url("/img/logotype/logo_white.svg") center/40% no-repeat; }
.feat__body { padding: 26px 28px; display: grid; gap: 12px; align-content: center; }
.feat__kicker { font: 700 10px/1 var(--mono); letter-spacing: .14em; text-transform: uppercase; color: var(--gold); }
.feat h2 { font-family: var(--display); font-size: clamp(1.2rem, 1.9vw, 1.7rem); line-height: 1.2; margin: 0; color: #fff; }
.feat p { margin: 0; color: var(--muted); }
.meta { display: flex; gap: 14px; flex-wrap: wrap; font: 700 10px/1.6 var(--mono); letter-spacing: .1em; text-transform: uppercase; color: var(--dim); }
.meta .tag { color: var(--red); }
.grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
.card { display: grid; grid-template-rows: auto auto 1fr auto auto; gap: 10px; padding: 18px 20px; border: 1px solid var(--line); border-radius: 8px; background: var(--card); min-height: 190px; transition: border-color var(--dur-ui) var(--ease-out), transform var(--dur-ui) var(--ease-out); animation: in var(--dur-reveal) var(--ease-out) both; animation-delay: calc(var(--i, 0) * 20ms); }
.card h3 { margin: 0; font-size: 1rem; line-height: 1.35; color: #fff; font-weight: 700; }
.card p { margin: 0; color: var(--muted); font-size: .92rem; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.card__img { aspect-ratio: 16/9; width: 100%; border-radius: 6px; object-fit: cover; display: block; background: #0d0d0d; margin: -4px 0 4px; }
.card__go { font: 700 11px/1 var(--mono); letter-spacing: .12em; text-transform: uppercase; color: var(--gold); display: flex; gap: 8px; align-items: center; }
.card__go i { font-style: normal; transition: transform var(--dur-ui) var(--ease-out); }
@media (hover: hover) and (pointer: fine) { .card:hover, .feat:hover { border-color: var(--red); transform: translateY(-2px); } .card:hover .card__go i { transform: translateX(4px); } }
.card:active { transform: translateY(0); }
@keyframes in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
.more { display: flex; justify-content: center; margin: 24px 0 0; }
.btn { font: 700 12px/1 var(--mono); letter-spacing: .12em; text-transform: uppercase; padding: 14px 24px; border: 1px solid var(--line2); border-radius: 4px; background: #0a0a0a; color: #fff; cursor: pointer; position: relative; transition: border-color var(--dur-ui) var(--ease-out), box-shadow var(--dur-ui) var(--ease-out), transform var(--dur-fast) var(--ease-out); }
.btn::before, .btn::after { content: ""; position: absolute; width: 7px; height: 4px; border: 2px solid var(--red); background: #0a0a0a; }
.btn::before { top: -3.5px; left: 80%; } .btn::after { bottom: -3.5px; left: 20%; }
.btn:hover { border-color: var(--red); box-shadow: 0 0 22px rgba(213,26,26,.3); } .btn:active { transform: scale(.97); }
.btn--primary { background: linear-gradient(135deg, #D51A1A, #a01414); border-color: var(--red); }
.empty { padding: 40px; text-align: center; color: var(--muted); border: 1px dashed var(--line2); border-radius: 8px; }
.sub { display: flex; align-items: center; justify-content: space-between; gap: 20px; margin: 36px 0 0; padding: 22px 26px; border: 1px solid var(--line2); border-radius: 10px; background: linear-gradient(135deg, #141414, #0d0d0d); flex-wrap: wrap; }
.sub b { font-family: var(--display); font-size: 1.05rem; display: block; margin-bottom: 4px; color: #fff; }
.sub span { color: var(--muted); font-size: .95rem; }
.pag { display: flex; align-items: center; justify-content: center; gap: 12px; margin-top: 32px; flex-wrap: wrap; font: 700 11px/1 var(--mono); letter-spacing: .1em; text-transform: uppercase; }
.pag__nums { display: flex; gap: 4px; flex-wrap: wrap; }
.pag__link, .pag__current { display: inline-flex; align-items: center; justify-content: center; min-width: 32px; height: 32px; padding: 0 8px; border-radius: 4px; }
.pag__link { color: var(--muted); border: 1px solid var(--line); } .pag__link:hover { border-color: var(--red); color: #fff; }
.pag__current { background: var(--red); color: #fff; }
.pag__arrow { color: var(--muted); border: 1px solid var(--line); border-radius: 4px; padding: 9px 14px; } .pag__arrow:hover { border-color: var(--red); color: #fff; }
.pag__arrow--disabled { opacity: .3; pointer-events: none; }
noscript .pag { margin-top: 24px; }
footer { margin-top: 44px; padding-top: 16px; border-top: 1px solid var(--line); display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; font: 400 11px/1.6 var(--mono); color: var(--dim); letter-spacing: .06em; }
footer a { color: var(--muted); border-bottom: 1px solid #2a2a2a; }
.disclaimer { width: 100%; font-size: 10px; color: var(--dim); }
@media (max-width: 900px) { .head, .feat { grid-template-columns: 1fr; } .grid { grid-template-columns: 1fr 1fr; } .nav__links { display: none; } .stats { justify-content: flex-start; } .search { min-width: 0; width: 100%; } }
@media (max-width: 600px) { .grid { grid-template-columns: 1fr; } .tools { position: static; } }
@media (prefers-reduced-motion: reduce) { .card { animation: none; } .card, .feat, .chip, .btn, .card__go i { transition: none; } }
`;

function cardHtml(p, i, t, prefix) {
  const tags = p.tags.slice(0, 3).map((x) => `<span class="tag">#${esc(x)}</span>`).join('');
  return `<a class="card" style="--i:${i}" href="${prefix}/${p.id}/">` +
    (p.img ? `<img class="card__img" src="${p.img}" alt="" loading="lazy" decoding="async">` : '') +
    `<h3>${esc(p.title)}</h3><p>${esc(p.excerpt)}</p>` +
    `<div class="meta"><span>${fmtDate(p.date, t.locale)}</span>${p.views ? `<span>${p.views} ${t.views}</span>` : ''}${tags}</div>` +
    `<span class="card__go">${t.read} <i>→</i></span></a>`;
}

function featHtml(p, t, prefix) {
  const tags = p.tags.slice(0, 3).map((x) => `<span class="tag">#${esc(x)}</span>`).join('');
  return `<a class="feat" id="feat" href="${prefix}/${p.id}/">` +
    (p.img ? `<img class="feat__img" src="${p.img}" alt="" decoding="async">` : '<div class="feat__img feat__img--empty"></div>') +
    `<div class="feat__body"><span class="feat__kicker">${t.kicker}</span><h2>${esc(p.title)}</h2><p>${esc(p.excerpt)}</p>` +
    `<div class="meta"><span>${fmtDate(p.date, t.locale)}</span>${p.views ? `<span>${p.views} ${t.views}</span>` : ''}${tags}</div></div></a>`;
}

// Page 1 is the interactive index (chips, search, "show more" over all posts); pages 2+
// are the static slices behind /blog/page/N/ that the sitemap lists.
function renderIndex(lang, pagePosts, pageNum, totalPages) {
  const t = L[lang];
  const isEn = lang === 'en';
  const prefix = isEn ? '/blog/en' : '/blog';
  const items = indexItems(lang);
  const tags = topTags();
  const years = [...new Set(items.map((p) => p.date.slice(0, 4)))].sort();
  const first = pageNum === 1;
  const disclaimer = isEn ? DISCLAIMER_EN : DISCLAIMER_RU;
  const pageTitle = first ? `${t.heading} — geminishkv` : `${t.heading} — ${t.page} ${pageNum} — geminishkv`;

  let main;
  if (first) {
    const featured = items.find((p) => p.tags.some((x) => CONTENT_TAGS.includes(x))) || items[0];
    const rest = items.filter((p) => p !== featured);
    const data = JSON.stringify(items).replace(/</g, '\\u003c');
    const tagsJson = JSON.stringify(tags);
    const chips = tags.map(([x, n]) => `<button class="chip" type="button" data-tag="${esc(x)}">#${esc(x)}<small>${n}</small></button>`).join('');
    const noscriptPages = Array.from({ length: totalPages }, (_, i) => i + 1)
      .map((i) => (i === 1 ? `<span class="pag__current">1</span>` : `<a class="pag__link" href="${prefix}/page/${i}/">${i}</a>`)).join('');
    main = `
<header class="head">
  <div><span class="eyebrow">// ${t.eyebrow}</span><h1>${t.heading}</h1><p>${t.desc(years[0])}</p></div>
  <div class="stats"><div class="stat"><b>${items.length}</b><span>${t.posts}</span></div><div class="stat"><b>${tags.length}</b><span>${t.topics}</span></div><div class="stat"><b>${years[0]}–${years[years.length - 1]}</b><span>${t.years}</span></div></div>
</header>
<div class="tools">
  <div class="chips" id="chips" role="group"><button class="chip is-on" type="button" data-tag="">${t.all}<small>${items.length}</small></button>${chips}</div>
  <label class="search"><span aria-hidden="true">⌕</span><input id="q" type="search" placeholder="${t.search}" autocomplete="off" aria-label="${t.search}"></label>
</div>
${featured ? featHtml(featured, t, prefix) : ''}
<div class="grid" id="grid">${rest.slice(0, FIRST_PAGE).map((p, i) => cardHtml(p, i, t, prefix)).join('\n')}</div>
<div class="empty" id="empty" hidden>${t.empty}</div>
<div class="more"><button class="btn" id="more" type="button"${rest.length <= FIRST_PAGE ? ' hidden' : ''}>${t.more} ${Math.min(FIRST_PAGE, Math.max(0, rest.length - FIRST_PAGE))}</button></div>
<noscript><nav class="pag"><div class="pag__nums">${noscriptPages}</div></nav></noscript>
<div class="sub"><div><b>${t.subTitle}</b><span>${t.subText}</span></div><a class="btn btn--primary" href="https://t.me/appsecta" target="_blank" rel="noreferrer">${t.subscribe}</a></div>
<script>
(function () {
  var POSTS = ${data};
  var TAGS = ${tagsJson};
  var PAGE = ${FIRST_PAGE}, PREFIX = '${prefix}', LOCALE = '${t.locale}', CONTENT = ${JSON.stringify(CONTENT_TAGS)};
  var T = { kicker: '${t.kicker}', read: '${t.read}', more: '${t.more}', views: '${t.views}' };
  var tag = '', q = '', shown = PAGE, dirty = false;
  var grid = document.getElementById('grid'), feat = document.getElementById('feat'), more = document.getElementById('more'), empty = document.getElementById('empty'), chips = document.getElementById('chips');
  var fmt = function (d) { return new Date(d + 'T00:00:00').toLocaleDateString(LOCALE, { day: 'numeric', month: 'long', year: 'numeric' }); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  function meta(p) { return '<div class="meta"><span>' + fmt(p.date) + '</span>' + (p.views ? '<span>' + p.views + ' ' + T.views + '</span>' : '') + p.tags.slice(0, 3).map(function (x) { return '<span class="tag">#' + esc(x) + '</span>'; }).join('') + '</div>'; }
  function filtered() { return POSTS.filter(function (p) { return (!tag || p.tags.indexOf(tag) >= 0) && (!q || (p.title + ' ' + p.excerpt).toLowerCase().indexOf(q) >= 0); }); }
  function render() {
    var list = filtered();
    var first = (!tag && !q) ? (list.filter(function (p) { return p.tags.some(function (x) { return CONTENT.indexOf(x) >= 0; }); })[0] || list[0]) : list[0];
    if (feat) {
      if (first) {
        feat.hidden = false; feat.href = PREFIX + '/' + first.id + '/';
        feat.innerHTML = (first.img ? '<img class="feat__img" src="' + first.img + '" alt="" decoding="async">' : '<div class="feat__img feat__img--empty"></div>') +
          '<div class="feat__body"><span class="feat__kicker">' + T.kicker + '</span><h2>' + esc(first.title) + '</h2><p>' + esc(first.excerpt) + '</p>' + meta(first) + '</div>';
      } else { feat.hidden = true; }
    }
    var rest = list.filter(function (p) { return p !== first; }).slice(0, shown);
    grid.innerHTML = rest.map(function (p, i) {
      return '<a class="card" style="--i:' + (i % PAGE) + '" href="' + PREFIX + '/' + p.id + '/">' + (p.img ? '<img class="card__img" src="' + p.img + '" alt="" loading="lazy" decoding="async">' : '') +
        '<h3>' + esc(p.title) + '</h3><p>' + esc(p.excerpt) + '</p>' + meta(p) + '<span class="card__go">' + T.read + ' <i>→</i></span></a>';
    }).join('');
    empty.hidden = list.length > 0;
    var left = Math.max(0, list.length - (first ? 1 : 0) - shown);
    more.hidden = left <= 0; more.textContent = T.more + ' ' + Math.min(PAGE, left);
  }
  chips.addEventListener('click', function (e) { var b = e.target.closest('.chip'); if (!b) return; tag = b.getAttribute('data-tag'); Array.prototype.forEach.call(chips.children, function (c) { c.classList.toggle('is-on', c === b); }); shown = PAGE; render(); });
  document.getElementById('q').addEventListener('input', function (e) { q = e.target.value.trim().toLowerCase(); shown = PAGE; render(); });
  more.addEventListener('click', function () { shown += PAGE; render(); });
})();
</script>`;
  } else {
    const start = (pageNum - 1) * PER_PAGE;
    const slice = items.slice(start, start + PER_PAGE);
    const prevHref = pageNum === 2 ? `${prefix}/` : `${prefix}/page/${pageNum - 1}/`;
    const nextHref = pageNum < totalPages ? `${prefix}/page/${pageNum + 1}/` : null;
    let nums = '';
    for (let i = 1; i <= totalPages; i++) {
      const href = i === 1 ? `${prefix}/` : `${prefix}/page/${i}/`;
      nums += i === pageNum ? `<span class="pag__current">${i}</span>` : `<a href="${href}" class="pag__link">${i}</a>`;
    }
    main = `
<header class="head">
  <div><span class="eyebrow">// ${t.eyebrow}</span><h1>${t.heading}</h1><p>${t.sub} · ${t.page} ${pageNum}</p></div>
  <div class="stats"><div class="stat"><b>${items.length}</b><span>${t.posts}</span></div></div>
</header>
<div class="grid" style="margin-top:22px">${slice.map((p, i) => cardHtml(p, i, t, prefix)).join('\n')}</div>
<nav class="pag">
  <a href="${prevHref}" class="pag__arrow">${t.prev}</a>
  <div class="pag__nums">${nums}</div>
  ${nextHref ? `<a href="${nextHref}" class="pag__arrow">${t.next}</a>` : `<span class="pag__arrow pag__arrow--disabled">${t.next}</span>`}
</nav>`;
  }

  const pageHref = first ? `${prefix}/` : `${prefix}/page/${pageNum}/`;
  return `<!DOCTYPE html>
<html lang="${t.lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${pageTitle}</title>
  <meta name="description" content="${esc(t.sub)} — ${items.length} ${t.posts}" />
  <meta name="author" content="${isEn ? 'Ilya Shmakov' : 'Илья Шмаков'}" />
  <meta name="keywords" content="appsec blog, devsecops blog, application security, geminishkv, безопасность приложений, блог по ИБ" />
  <meta name="robots" content="index, follow" />
  <meta name="theme-color" content="#0a0a0a" />
  <link rel="canonical" href="${BASE_URL}${pageHref}" />
  <link rel="sitemap" href="/sitemap.xml" />
  <link rel="alternate" type="application/rss+xml" title="geminishkv blog" href="${isEn ? '/rss-en.xml' : '/rss.xml'}" />
  <link rel="alternate" hreflang="ru" href="${BASE_URL}/blog/" />
  <link rel="alternate" hreflang="en" href="${BASE_URL}/blog/en/" />
  <link rel="alternate" hreflang="x-default" href="${BASE_URL}/blog/" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${BASE_URL}${pageHref}" />
  <meta property="og:title" content="${t.heading} — geminishkv" />
  <meta property="og:description" content="${esc(t.sub)}" />
  <meta property="og:image" content="${BASE_URL}/img/hero/avatar.jpg" />
  <meta property="og:locale" content="${isEn ? 'en_US' : 'ru_RU'}" />
  <meta property="og:site_name" content="geminishkv" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:site" content="@geminishkv" />
  <meta name="twitter:title" content="${t.heading} — geminishkv" />
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <link rel="stylesheet" href="/fonts/fonts.css" />
  <style>${INDEX_CSS}</style>
</head>
<body>
<div class="wm" aria-hidden="true"></div>
<div class="wrap">
<nav class="nav">
  <a class="nav__brand" href="/"><span class="nav__logo"></span>geminishkv</a>
  <div class="nav__links"><a href="/">${t.nav.home}</a><a class="is-active" href="${prefix}/">${t.nav.blog}</a><a href="/#experience">${t.nav.experience}</a><a href="/#skillset">${t.nav.skillset}</a><a href="/#interests">${t.nav.interests}</a><a href="/#contacts">${t.nav.contacts}</a><a href="https://my.idot.vip/geminishkv" target="_blank" rel="noreferrer">NFC</a></div>
  <a class="nav__lang" href="${t.otherHref}">${t.other}</a>
</nav>
${main}
<footer><span>© ${new Date().getFullYear()} Elijah S Shmakov</span><span><a href="/privacy/">${t.privacy}</a> · <a href="${isEn ? '/rss-en.xml' : '/rss.xml'}">RSS</a> · <a href="/">${t.home}</a></span><span class="disclaimer">${disclaimer}</span></footer>
</div>
</body>
</html>`;
}

/* ══════════════════════════════════════════════════════════
   GENERATE
   ══════════════════════════════════════════════════════════ */

let ruCount = 0, enCount = 0;

for (const post of posts) {
  // RU post page
  const ruDir = path.join(BUILD_DIR, 'blog', String(post.id));
  fs.mkdirSync(ruDir, { recursive: true });
  fs.writeFileSync(path.join(ruDir, 'index.html'), renderPost(post, 'ru'), 'utf8');
  ruCount++;

  // EN post page
  if (post.text_en) {
    const enDir = path.join(BUILD_DIR, 'blog', 'en', String(post.id));
    fs.mkdirSync(enDir, { recursive: true });
    fs.writeFileSync(path.join(enDir, 'index.html'), renderPost(post, 'en'), 'utf8');
    enCount++;
  }
}

// Paginated index pages
const totalPages = Math.ceil(posts.length / PER_PAGE);
let indexCount = 0;

for (const lang of ['ru', 'en']) {
  const prefix = lang === 'en' ? 'blog/en' : 'blog';
  for (let page = 1; page <= totalPages; page++) {
    const slice = posts.slice((page - 1) * PER_PAGE, page * PER_PAGE);
    const dir = page === 1
      ? path.join(BUILD_DIR, prefix)
      : path.join(BUILD_DIR, prefix, 'page', String(page));
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), renderIndex(lang, slice, page, totalPages), 'utf8');
    indexCount++;
  }
}

console.log(`[blog] ${ruCount} RU + ${enCount} EN post pages + ${indexCount} index pages (${totalPages} pages x2 langs)`);
