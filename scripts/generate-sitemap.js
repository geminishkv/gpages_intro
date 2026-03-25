#!/usr/bin/env node
'use strict';

const fs   = require('fs');
const path = require('path');

const BASE_URL   = 'https://geminishkv.tech';
const today      = new Date().toISOString().slice(0, 10);
const INDEX_HTML = path.join(__dirname, '..', 'public', 'index.html');
const SITEMAP    = path.join(__dirname, '..', 'public', 'sitemap.xml');

// Только реальные URL — hash-якоря (#blog, #experience и т.д.)
// Google и Yandex не индексируют fragment URLs
const urls = [
  { loc: `${BASE_URL}/`, changefreq: 'weekly', priority: '1.0' },
];

const urlEntries = urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
    <xhtml:link rel="alternate" hreflang="ru"        href="${u.loc}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${u.loc}"/>
  </url>`).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries}
</urlset>
`;

fs.writeFileSync(SITEMAP, xml, 'utf8');
console.log(`[sitemap] written → ${SITEMAP}  (lastmod: ${today})`);

// Обновляем dateModified в JSON-LD ProfilePage в index.html
if (fs.existsSync(INDEX_HTML)) {
  const html    = fs.readFileSync(INDEX_HTML, 'utf8');
  const updated = html.replace(
    /"dateModified":\s*"\d{4}-\d{2}-\d{2}"/,
    `"dateModified": "${today}"`
  );
  if (updated !== html) {
    fs.writeFileSync(INDEX_HTML, updated, 'utf8');
    console.log(`[sitemap] dateModified → ${today}`);
  }
}
