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

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function textToHtml(text) {
  return text
    .split('\n')
    .map(line => line.trim() ? `<p>${escapeHtml(line)}</p>` : '<div class="gap"></div>')
    .join('\n        ');
}

function extractTitle(text) {
  const first = text.split('\n')[0].trim();
  return first.replace(/[\u{1F300}-\u{1FFFF}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0FF}\u{1F100}-\u{1F1FF}\u{1F200}-\u{1F2FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u2600-\u27BF\u2B50\u2B55\u231A-\u231B\u23E9-\u23F3\u23F8-\u23FA]/gu, '').trim()
    || 'AppSec & DevSecOps';
}

function truncate(text, max = 160) {
  const s = text.replace(/\n+/g, ' ').trim();
  return s.length > max ? s.slice(0, max - 1) + '…' : s;
}

function formatDate(iso, locale) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString(locale, {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

function formatViews(n) {
  if (!n) return null;
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace('.0', '')}\u202fK` : String(n);
}

/* ── template ── */

function renderPost(post, lang = 'ru') {
  const isEn       = lang === 'en';
  const text       = (isEn && post.text_en) ? post.text_en : post.text;
  const locale     = isEn ? 'en-US' : 'ru-RU';
  const title      = extractTitle(text);
  const description = truncate(text);
  const ruUrl      = `${BASE_URL}/blog/${post.id}/`;
  const enUrl      = `${BASE_URL}/blog/en/${post.id}/`;
  const pageUrl    = isEn ? enUrl : ruUrl;
  const imageUrl   = post.image ? `${BASE_URL}${post.image}` : `${BASE_URL}/img/hero/avatar.jpg`;
  const dateStr    = formatDate(post.date, locale);
  const views      = formatViews(post.views);

  const backLabel     = isEn ? '← All posts'          : '← Все посты';
  const tgLabel       = isEn ? 'Open in Telegram'      : 'Открыть в Telegram';
  const homeLabel     = isEn ? 'Home'                  : 'Главная';
  const blogLabel     = isEn ? 'Blog'                  : 'Блог';
  const authorName    = isEn ? 'Ilya Shmakov'           : 'Илья Шмаков';
  const authorFull    = isEn ? 'Ilya Stanislavovich Shmakov' : 'Илья Станиславович Шмаков';
  const footerYear    = '© 2025';

  const tagsHtml = post.tags?.length
    ? post.tags.map(t => `<span class="tag">#${escapeHtml(t)}</span>`).join('')
    : '';

  const articleTagsMeta = post.tags?.length
    ? post.tags.map(t => `  <meta property="article:tag" content="${escapeHtml(t)}" />`).join('\n')
    : '';

  const breadcrumbJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: homeLabel, item: BASE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: blogLabel, item: BASE_URL + '/#blog' },
      { '@type': 'ListItem', position: 3, name: title,     item: pageUrl },
    ],
  });

  const postJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': pageUrl,
    headline: title,
    description,
    url: pageUrl,
    datePublished: post.date,
    dateModified: post.date,
    image: imageUrl,
    inLanguage: lang,
    keywords: post.tags?.join(', '),
    author: {
      '@type': 'Person',
      '@id': `${BASE_URL}/#person`,
      name: authorFull,
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: authorName,
      url: BASE_URL,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
    isPartOf: {
      '@type': 'Blog',
      '@id': `${BASE_URL}/#blog`,
      name: 'shmakovis_appsec',
      url: 'https://t.me/shmakovis_appsec',
    },
  }, null, 2);

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)} — geminishkv</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="author"      content="${authorFull}" />
  <meta name="robots"      content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <meta name="theme-color" content="#0a0a0a" />
  ${post.tags?.length ? `<meta name="keywords" content="${escapeHtml(post.tags.join(', '))}" />` : ''}
  <link rel="canonical"    href="${pageUrl}" />
  <link rel="alternate" hreflang="ru"        href="${ruUrl}" />
  <link rel="alternate" hreflang="en"        href="${enUrl}" />
  <link rel="alternate" hreflang="x-default" href="${ruUrl}" />

  <meta property="og:type"        content="article" />
  <meta property="og:url"         content="${pageUrl}" />
  <meta property="og:title"       content="${escapeHtml(title)} — geminishkv" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:image"       content="${imageUrl}" />
  <meta property="og:image:alt"   content="${escapeHtml(title)}" />
  <meta property="og:locale"      content="${isEn ? 'en_US' : 'ru_RU'}" />
  <meta property="og:locale:alternate" content="${isEn ? 'ru_RU' : 'en_US'}" />
  <meta property="og:site_name"   content="geminishkv" />
  <meta property="article:author"         content="${authorName}" />
  <meta property="article:published_time" content="${post.date}" />
${articleTagsMeta}

  <meta name="twitter:card"        content="summary_large_image" />
  <meta name="twitter:site"        content="@geminishkv" />
  <meta name="twitter:title"       content="${escapeHtml(title)} — geminishkv" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image"       content="${imageUrl}" />

  <script type="application/ld+json">
${postJsonLd}
  </script>
  <script type="application/ld+json">
${breadcrumbJsonLd}
  </script>

  <link rel="icon" type="image/png" href="/img/hero/logo2.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet" />

  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg:      #0a0a0a;
      --surface: #111111;
      --border:  #1e1e1e;
      --text:    #e8e8e8;
      --muted:   #6b7280;
      --accent:  #cc2200;
      --gold:    #d4a520;
    }

    html, body {
      background: var(--bg);
      color: var(--text);
      font-family: 'Montserrat', system-ui, sans-serif;
      min-height: 100dvh;
      line-height: 1.7;
    }

    a { color: inherit; text-decoration: none; }

    .page {
      max-width: 760px;
      margin: 0 auto;
      padding: 0 20px 80px;
    }

    /* nav */
    .nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 24px 0 40px;
      border-bottom: 1px solid var(--border);
      margin-bottom: 48px;
    }
    .nav__brand {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 15px;
      font-weight: 700;
      color: #fff;
    }
    .nav__brand img { width: 28px; height: 28px; border-radius: 6px; }
    .nav__back {
      font-size: 13px;
      color: var(--muted);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 7px 14px;
      transition: color .2s, border-color .2s;
    }
    .nav__back:hover { color: #fff; border-color: #444; }

    /* cover */
    .cover {
      width: 100%;
      border-radius: 12px;
      overflow: hidden;
      margin-bottom: 36px;
      max-height: 420px;
    }
    .cover img { width: 100%; height: 100%; object-fit: cover; display: block; }

    /* meta */
    .meta {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 24px;
    }
    .meta__date  { font-size: 13px; color: var(--muted); }
    .meta__views { display: flex; align-items: center; gap: 5px; font-size: 13px; color: var(--muted); }

    /* content */
    .content p   { font-size: 15px; line-height: 1.85; color: var(--text); margin-bottom: 8px; }
    .content .gap { height: 10px; }

    /* tags */
    .tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 32px; }
    .tag {
      font-size: 12px;
      color: var(--gold);
      background: rgba(212,165,32,.08);
      border: 1px solid rgba(212,165,32,.18);
      border-radius: 6px;
      padding: 4px 10px;
    }

    /* tg link */
    .tg-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-top: 36px;
      padding: 12px 22px;
      background: rgba(204,34,0,.1);
      border: 1px solid rgba(204,34,0,.25);
      border-radius: 10px;
      color: #fff;
      font-size: 14px;
      font-weight: 600;
      transition: background .2s, border-color .2s;
    }
    .tg-link:hover { background: rgba(204,34,0,.18); border-color: rgba(204,34,0,.4); }

    .divider { height: 1px; background: var(--border); margin: 48px 0; }

    .footer { font-size: 12px; color: var(--muted); text-align: center; }
    .footer a { color: var(--accent); transition: color .2s; }
    .footer a:hover { color: var(--gold); }

    @media (max-width: 480px) {
      .nav { padding: 18px 0 28px; margin-bottom: 32px; }
      .content p { font-size: 14px; }
    }
  </style>
</head>
<body>
  <div class="page">
    <nav class="nav">
      <a href="/" class="nav__brand">
        <img src="/img/hero/logo2.png" alt="geminishkv" />
        geminishkv
      </a>
      <a href="/#blog" class="nav__back">${backLabel}</a>
    </nav>

    ${post.image ? `<div class="cover"><img src="${post.image}" alt="${escapeHtml(title)}" loading="eager" /></div>` : ''}

    <article>
      <div class="meta">
        <span class="meta__date">${dateStr}</span>
        ${views ? `<span class="meta__views"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M1 12C1 12 5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>${views}</span>` : ''}
      </div>

      <div class="content">
        ${textToHtml(text)}
      </div>

      ${tagsHtml ? `<div class="tags">${tagsHtml}</div>` : ''}

      <a href="${post.url}" target="_blank" rel="noreferrer" class="tg-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z"/></svg>
        ${tgLabel}
      </a>
    </article>

    <div class="divider"></div>

    <footer class="footer">
      <p>${footerYear} <a href="/">geminishkv.tech</a> · <a href="https://t.me/shmakovis_appsec" target="_blank" rel="noreferrer">@shmakovis_appsec</a></p>
    </footer>
  </div>
</body>
</html>`;
}

/* ── generate ── */

let generated = 0;
let generatedEn = 0;
for (const post of posts) {
  // Russian page
  const ruDir = path.join(BUILD_DIR, 'blog', String(post.id));
  fs.mkdirSync(ruDir, { recursive: true });
  fs.writeFileSync(path.join(ruDir, 'index.html'), renderPost(post, 'ru'), 'utf8');
  console.log(`[blog] → /blog/${post.id}/`);
  generated++;

  // English page (only when translation is available)
  if (post.text_en) {
    const enDir = path.join(BUILD_DIR, 'blog', 'en', String(post.id));
    fs.mkdirSync(enDir, { recursive: true });
    fs.writeFileSync(path.join(enDir, 'index.html'), renderPost(post, 'en'), 'utf8');
    console.log(`[blog] → /blog/en/${post.id}/`);
    generatedEn++;
  }
}

console.log(`[blog] done — ${generated} RU pages, ${generatedEn} EN pages generated`);
