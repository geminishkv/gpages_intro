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
  <meta name="author" content="${isEn ? 'Ilya Shmakov' : '\u0418\u043b\u044c\u044f \u0428\u043c\u0430\u043a\u043e\u0432'}" />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
  <meta name="theme-color" content="#0a0a0a" />
  <link rel="canonical" href="${pageUrl}" />
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
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
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

const PER_PAGE = 15;

function renderIndex(lang, pagePosts, pageNum, totalPages) {
  const isEn = lang === 'en';
  const heading = isEn ? 'Blog' : '\u0411\u043b\u043e\u0433';
  const sub = isEn ? 'AppSec & DevSecOps insights' : '\u041c\u0430\u0442\u0435\u0440\u0438\u0430\u043b\u044b \u043f\u043e AppSec & DevSecOps';
  const homeLabel = isEn ? '\u2190 Home' : '\u2190 \u0413\u043b\u0430\u0432\u043d\u0430\u044f';
  const readLabel = isEn ? 'Read \u2192' : '\u0427\u0438\u0442\u0430\u0442\u044c \u2192';
  const disclaimer = isEn ? DISCLAIMER_EN : DISCLAIMER_RU;
  const prefix = isEn ? '/blog/en' : '/blog';

  const cards = pagePosts.map(post => {
    const text = (isEn && post.text_en) ? post.text_en : post.text;
    const title = extractTitle(text);
    const desc = truncate(text, 120);
    const dateStr = fmtDate(post.date, isEn ? 'en-US' : 'ru-RU');
    const href = isEn ? `/blog/en/${post.id}/` : `/blog/${post.id}/`;
    const views = fmtViews(post.views);
    const tags = post.tags?.slice(0, 3).map(t => `<span class="card-tag">#${esc(t)}</span>`).join('') || '';

    return `<a href="${href}" class="card">
        ${post.image ? `<img src="${post.image}" alt="" class="card__cover" loading="lazy" />` : ''}
        <div class="card__body">
          <div class="card__meta"><span>${dateStr}</span>${views ? `<span>\u00b7 ${views}</span>` : ''}</div>
          <h2 class="card__title">${esc(title)}</h2>
          <p class="card__desc">${esc(desc)}</p>
          ${tags ? `<div class="card__tags">${tags}</div>` : ''}
          <span class="card__read">${readLabel}</span>
        </div>
      </a>`;
  }).join('\n');

  // Pagination links
  let paginationHtml = '';
  if (totalPages > 1) {
    const prevHref = pageNum > 1 ? (pageNum === 2 ? `${prefix}/` : `${prefix}/page/${pageNum - 1}/`) : null;
    const nextHref = pageNum < totalPages ? `${prefix}/page/${pageNum + 1}/` : null;
    const prevLabel = isEn ? '\u2190 Prev' : '\u2190 \u041d\u0430\u0437\u0430\u0434';
    const nextLabel = isEn ? 'Next \u2192' : '\u0414\u0430\u043b\u0435\u0435 \u2192';

    let pages = '';
    for (let i = 1; i <= totalPages; i++) {
      const href = i === 1 ? `${prefix}/` : `${prefix}/page/${i}/`;
      pages += i === pageNum
        ? `<span class="pag__current">${i}</span>`
        : `<a href="${href}" class="pag__link">${i}</a>`;
    }

    paginationHtml = `
    <nav class="pag">
      ${prevHref ? `<a href="${prevHref}" class="pag__arrow">${prevLabel}</a>` : `<span class="pag__arrow pag__arrow--disabled">${prevLabel}</span>`}
      <div class="pag__nums">${pages}</div>
      ${nextHref ? `<a href="${nextHref}" class="pag__arrow">${nextLabel}</a>` : `<span class="pag__arrow pag__arrow--disabled">${nextLabel}</span>`}
    </nav>`;
  }

  const pageTitle = pageNum > 1 ? `${heading} \u2014 ${pageNum} \u2014 geminishkv` : `${heading} \u2014 geminishkv`;

  return `<!DOCTYPE html>
<html lang="${isEn ? 'en' : 'ru'}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${pageTitle}</title>
  <meta name="description" content="${esc(sub)} \u2014 ${posts.length} ${isEn ? 'posts' : '\u043f\u043e\u0441\u0442\u043e\u0432'}" />
  <meta name="author" content="${isEn ? 'Ilya Shmakov' : '\u0418\u043b\u044c\u044f \u0428\u043c\u0430\u043a\u043e\u0432'}" />
  <meta name="robots" content="index, follow" />
  <meta name="theme-color" content="#0a0a0a" />
  <link rel="canonical" href="${BASE_URL}${prefix}/" />
  <link rel="alternate" hreflang="ru" href="${BASE_URL}/blog/" />
  <link rel="alternate" hreflang="en" href="${BASE_URL}/blog/en/" />
  <link rel="alternate" hreflang="x-default" href="${BASE_URL}/blog/" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${BASE_URL}${prefix}/" />
  <meta property="og:title" content="${heading} \u2014 geminishkv" />
  <meta property="og:description" content="${esc(sub)}" />
  <meta property="og:image" content="${BASE_URL}/img/hero/avatar.jpg" />
  <meta property="og:locale" content="${isEn ? 'en_US' : 'ru_RU'}" />
  <meta property="og:site_name" content="geminishkv" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:site" content="@geminishkv" />
  <meta name="twitter:title" content="${heading} \u2014 geminishkv" />
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
  <style>${CSS}
    .page { max-width: 1900px; padding: 0 clamp(24px, 5vw, 120px) 64px; }
    .header { margin-bottom: 32px; }
    .header h1 { font-family: 'Unbounded', sans-serif; font-size: 1.6rem; font-weight: 700; margin-bottom: 6px; background: linear-gradient(135deg, var(--accent), var(--gold)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .header p { font-size: 0.8rem; color: var(--muted); }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(270px, 1fr)); gap: 14px; }
    .card { display: flex; flex-direction: column; background: var(--card); border: 1px solid var(--border); border-radius: 6px; overflow: hidden; transition: border-color .2s, transform .2s; }
    .card:hover { border-color: var(--accent); transform: translateY(-2px); }
    .card__cover { width: 100%; height: 200px; object-fit: cover; }
    .card__body { padding: 14px 16px; display: flex; flex-direction: column; gap: 6px; flex: 1; }
    .card__meta { font-size: 0.58rem; color: var(--muted); display: flex; gap: 6px; letter-spacing: 0.06em; text-transform: uppercase; }
    .card__title { font-size: 0.85rem; font-weight: 700; color: #fff; line-height: 1.3; }
    .card__desc { font-size: 0.72rem; color: #aaa; line-height: 1.5; flex: 1; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
    .card__tags { display: flex; gap: 4px; flex-wrap: wrap; }
    .card-tag { font-size: 0.55rem; color: var(--gold); background: rgba(249,179,97,.06); border: 1px solid rgba(249,179,97,.15); border-radius: 3px; padding: 2px 6px; }
    .card__read { font-size: 0.62rem; color: var(--muted); letter-spacing: 0.06em; transition: color .2s; }
    .card:hover .card__read { color: var(--accent); }

    .pag { display: flex; align-items: center; justify-content: center; gap: 12px; margin-top: 32px; }
    .pag__nums { display: flex; gap: 4px; }
    .pag__link, .pag__current { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 4px; font-size: 0.72rem; font-weight: 700; transition: background .2s, color .2s; }
    .pag__link { color: var(--muted); border: 1px solid var(--border); }
    .pag__link:hover { border-color: var(--accent); color: #fff; }
    .pag__current { background: var(--accent); color: #fff; }
    .pag__arrow { font-size: 0.68rem; font-weight: 600; color: var(--muted); border: 1px solid var(--border); border-radius: 4px; padding: 6px 14px; transition: border-color .2s, color .2s; letter-spacing: 0.04em; }
    .pag__arrow:hover { border-color: var(--accent); color: #fff; }
    .pag__arrow--disabled { opacity: 0.3; pointer-events: none; }

    @media (max-width: 900px) { .grid { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); } }
    @media (max-width: 576px) { .grid { grid-template-columns: 1fr; } .header h1 { font-size: 1.2rem; } .pag__nums { display: none; } }
  </style>
</head>
<body>
  <div class="page">
    <nav class="nav">
      <a href="/" class="nav__brand"><img src="/img/logotype/logo_white.svg" alt="" />geminishkv</a>
      <div class="nav__right-group">
        <a href="${isEn ? '/blog/' : '/blog/en/'}" class="lang-toggle">${isEn ? 'RU' : 'EN'}</a>
        <a href="/" class="nav__back">${homeLabel}</a>
      </div>
    </nav>
    <div class="header">
      <h1>${heading}</h1>
      <p>${sub} \u00b7 ${posts.length} ${isEn ? 'posts' : '\u043f\u043e\u0441\u0442\u043e\u0432'}</p>
    </div>
    <div class="grid">${cards}</div>
    ${paginationHtml}
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
