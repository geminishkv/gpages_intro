#!/usr/bin/env node
'use strict';

const fs   = require('fs');
const path = require('path');

const BASE_URL   = 'https://geminishkv.tech';
const today      = new Date().toISOString().slice(0, 10);
const INDEX_HTML = path.join(__dirname, '..', 'public', 'index.html');
const SITEMAP    = path.join(__dirname, '..', 'public', 'sitemap.xml');
const DATA_FILE  = path.join(__dirname, '..', 'src', 'data', 'tg-posts.json');
const PER_PAGE   = 15;

function xlink(hreflang, href) {
  return `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}"/>`;
}

function url(loc, lastmod, changefreq, priority, links = []) {
  const x = links.length ? '\n' + links.join('\n') : '';
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>${x}
  </url>`;
}

const entries = [];

// ── Homepage (SPA i18n — same URL both langs)
entries.push(url(`${BASE_URL}/`, today, 'weekly', '1.0', [
  xlink('ru', `${BASE_URL}/`),
  xlink('en', `${BASE_URL}/`),
  xlink('x-default', `${BASE_URL}/`),
]));

// ── Privacy
entries.push(url(`${BASE_URL}/privacy/`, today, 'yearly', '0.3'));

// ── Blog
if (fs.existsSync(DATA_FILE)) {
  const data  = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  const posts = data.posts ?? [];
  const totalPages = Math.ceil(posts.length / PER_PAGE);

  // Blog index pages (paginated)
  for (let p = 1; p <= totalPages; p++) {
    const ruLoc = p === 1 ? `${BASE_URL}/blog/` : `${BASE_URL}/blog/page/${p}/`;
    const enLoc = p === 1 ? `${BASE_URL}/blog/en/` : `${BASE_URL}/blog/en/page/${p}/`;

    entries.push(url(ruLoc, today, 'weekly', '0.8', [
      xlink('ru', ruLoc), xlink('en', enLoc), xlink('x-default', ruLoc),
    ]));
    entries.push(url(enLoc, today, 'weekly', '0.7', [
      xlink('ru', ruLoc), xlink('en', enLoc), xlink('x-default', ruLoc),
    ]));
  }

  // Individual blog posts
  for (const post of posts) {
    const ruLoc  = `${BASE_URL}/blog/${post.id}/`;
    const enLoc  = `${BASE_URL}/blog/en/${post.id}/`;
    const lastmod = post.date ?? today;
    const hasEn  = Boolean(post.text_en);

    const links = hasEn
      ? [xlink('ru', ruLoc), xlink('en', enLoc), xlink('x-default', ruLoc)]
      : [xlink('ru', ruLoc), xlink('x-default', ruLoc)];

    entries.push(url(ruLoc, lastmod, 'monthly', '0.6', links));

    if (hasEn) {
      entries.push(url(enLoc, lastmod, 'monthly', '0.5', [
        xlink('ru', ruLoc), xlink('en', enLoc), xlink('x-default', ruLoc),
      ]));
    }
  }

  const ruCount = posts.length;
  const enCount = posts.filter(p => p.text_en).length;
  console.log(`[sitemap] blog: ${ruCount} RU + ${enCount} EN posts, ${totalPages * 2} index pages`);
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;

fs.writeFileSync(SITEMAP, xml, 'utf8');
console.log(`[sitemap] ${entries.length} URLs → ${SITEMAP}`);

// Update dateModified in JSON-LD ProfilePage in index.html
if (fs.existsSync(INDEX_HTML)) {
  const html    = fs.readFileSync(INDEX_HTML, 'utf8');
  const updated = html.replace(
    /"dateModified":\s*"\d{4}-\d{2}-\d{2}"/,
    `"dateModified": "${today}"`,
  );
  if (updated !== html) {
    fs.writeFileSync(INDEX_HTML, updated, 'utf8');
    console.log(`[sitemap] dateModified → ${today}`);
  }
}

// Ping Yandex
const sitemapUrl = encodeURIComponent(`${BASE_URL}/sitemap.xml`);
require('https').get(
  `https://webmaster.yandex.ru/ping?sitemap=${sitemapUrl}`,
  res => console.log(`[sitemap] ping Yandex → ${res.statusCode}`),
).on('error', err => console.warn(`[sitemap] ping failed: ${err.message}`));
