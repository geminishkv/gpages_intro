#!/usr/bin/env node
'use strict';

const fs   = require('fs');
const path = require('path');

const BASE_URL = 'https://geminishkv.tech';
const today    = new Date().toISOString().slice(0, 10);

const urls = [
  {
    loc:        `${BASE_URL}/`,
    lastmod:    today,
    changefreq: 'weekly',
    priority:   '1.0',
  },
  {
    loc:        `${BASE_URL}/#blog`,
    lastmod:    today,
    changefreq: 'weekly',
    priority:   '0.8',
  },
  {
    loc:        `${BASE_URL}/#experience`,
    lastmod:    today,
    changefreq: 'monthly',
    priority:   '0.9',
  },
  {
    loc:        `${BASE_URL}/#tools`,
    lastmod:    today,
    changefreq: 'monthly',
    priority:   '0.7',
  },
];

const urlEntries = urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
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

const dest = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(dest, xml, 'utf8');
console.log(`[sitemap] written → ${dest}  (lastmod: ${today})`);
