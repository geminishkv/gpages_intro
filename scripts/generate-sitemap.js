#!/usr/bin/env node
'use strict';

const fs   = require('fs');
const path = require('path');

const BASE_URL   = 'https://geminishkv.tech';
const today      = new Date().toISOString().slice(0, 10);
const INDEX_HTML = path.join(__dirname, '..', 'public', 'index.html');
const SITEMAP    = path.join(__dirname, '..', 'public', 'sitemap.xml');
const DATA_FILE  = path.join(__dirname, '..', 'src', 'data', 'tg-posts.json');

function xhtmlLink(rel, hreflang, href) {
  return `    <xhtml:link rel="${rel}" hreflang="${hreflang}" href="${href}"/>`;
}

function urlEntry(loc, lastmod, changefreq, priority, hreflangLinks = []) {
  const links = hreflangLinks.length ? '\n' + hreflangLinks.join('\n') : '';
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>${links}
  </url>`;
}

const entries = [];

// Homepage — RU and EN point to the same URL (SPA i18n)
entries.push(urlEntry(`${BASE_URL}/`, today, 'weekly', '1.0', [
  xhtmlLink('alternate', 'ru', `${BASE_URL}/`),
  xhtmlLink('alternate', 'en', `${BASE_URL}/`),
  xhtmlLink('alternate', 'x-default', `${BASE_URL}/`),
]));

// Blog posts
if (fs.existsSync(DATA_FILE)) {
  const data  = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  const posts = data.posts ?? [];

  for (const post of posts) {
    const ruLoc  = `${BASE_URL}/blog/${post.id}/`;
    const enLoc  = `${BASE_URL}/blog/en/${post.id}/`;
    const lastmod = post.date ?? today;
    const hasEn  = Boolean(post.text_en);

    const ruLinks = hasEn
      ? [
          xhtmlLink('alternate', 'ru', ruLoc),
          xhtmlLink('alternate', 'en', enLoc),
          xhtmlLink('alternate', 'x-default', ruLoc),
        ]
      : [];

    entries.push(urlEntry(ruLoc, lastmod, 'monthly', '0.7', ruLinks));

    if (hasEn) {
      entries.push(urlEntry(enLoc, lastmod, 'monthly', '0.6', [
        xhtmlLink('alternate', 'ru', ruLoc),
        xhtmlLink('alternate', 'en', enLoc),
        xhtmlLink('alternate', 'x-default', ruLoc),
      ]));
    }
  }

  const ruCount = posts.length;
  const enCount = posts.filter(p => p.text_en).length;
  console.log(`[sitemap] ${ruCount} RU + ${enCount} EN blog pages added`);
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;

fs.writeFileSync(SITEMAP, xml, 'utf8');
console.log(`[sitemap] written → ${SITEMAP}  (lastmod: ${today}, total: ${entries.length} URLs)`);

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

// Ping search engines about updated sitemap
const sitemapUrl = encodeURIComponent(`${BASE_URL}/sitemap.xml`);
const pings = [
  `https://webmaster.yandex.ru/ping?sitemap=${sitemapUrl}`,
];

for (const url of pings) {
  const mod = url.startsWith('https') ? require('https') : require('http');
  mod.get(url, (res) => {
    console.log(`[sitemap] ping ${new URL(url).hostname} → ${res.statusCode}`);
  }).on('error', (err) => {
    console.warn(`[sitemap] ping ${new URL(url).hostname} failed: ${err.message}`);
  });
}
