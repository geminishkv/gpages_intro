#!/usr/bin/env node
'use strict';

const fs   = require('fs');
const path = require('path');

const BASE_URL  = 'https://geminishkv.tech';
const DATA_FILE = path.join(__dirname, '..', 'src', 'data', 'tg-posts.json');
const RSS_RU    = path.join(__dirname, '..', 'public', 'rss.xml');
const RSS_EN    = path.join(__dirname, '..', 'public', 'rss-en.xml');

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function extractTitle(text) {
  const first = text.split('\n')[0].trim();
  return first.replace(/[\u{1F300}-\u{1FFFF}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0FF}\u{1F100}-\u{1F1FF}\u{1F200}-\u{1F2FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u2600-\u27BF\u2B50\u2B55\u231A-\u231B\u23E9-\u23F3\u23F8-\u23FA]/gu, '').trim()
    || 'AppSec & DevSecOps';
}

function toRfc822(iso) {
  if (!iso) return new Date().toUTCString();
  return new Date(iso).toUTCString();
}

function renderItem(post, lang) {
  const isEn = lang === 'en';
  const text  = (isEn && post.text_en) ? post.text_en : post.text;
  const title = extractTitle(text);
  const url   = isEn
    ? `${BASE_URL}/blog/en/${post.id}/`
    : `${BASE_URL}/blog/${post.id}/`;
  const description = String(text).replace(/\n+/g, ' ').trim().slice(0, 280);
  const imageUrl = post.image ? `${BASE_URL}${post.image}` : `${BASE_URL}/img/hero/avatar.jpg`;

  return `    <item>
      <title>${escapeXml(title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${toRfc822(post.date)}</pubDate>
      <description>${escapeXml(description)}</description>
      <enclosure url="${imageUrl}" type="image/jpeg" length="0"/>
      <author>shmakovis@inbox.ru (${isEn ? 'Ilya Shmakov' : 'Илья Шмаков'})</author>
    </item>`;
}

function buildFeed(posts, lang) {
  const isEn      = lang === 'en';
  const feedUrl   = isEn ? `${BASE_URL}/rss-en.xml` : `${BASE_URL}/rss.xml`;
  const title     = isEn
    ? 'geminishkv — AppSec &amp; DevSecOps Blog (EN)'
    : 'geminishkv — AppSec &amp; DevSecOps Блог (RU)';
  const langTag   = isEn ? 'en-US' : 'ru-RU';
  const buildDate = new Date().toUTCString();

  const items = posts
    .filter(p => isEn ? Boolean(p.text_en) : true)
    .map(p => renderItem(p, lang))
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${title}</title>
    <link>${BASE_URL}/</link>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
    <description>${isEn ? 'AppSec &amp; DevSecOps blog by Ilya Shmakov (geminishkv)' : 'Блог по AppSec &amp; DevSecOps — Илья Шмаков (geminishkv)'}</description>
    <language>${langTag}</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <managingEditor>shmakovis@inbox.ru (${isEn ? 'Ilya Shmakov' : 'Илья Шмаков'})</managingEditor>
    <image>
      <url>${BASE_URL}/img/hero/avatar.jpg</url>
      <title>${title}</title>
      <link>${BASE_URL}/</link>
    </image>
${items}
  </channel>
</rss>
`;
}

if (!fs.existsSync(DATA_FILE)) {
  console.error('[rss] data file not found:', DATA_FILE);
  process.exit(1);
}

const data  = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
const posts = data.posts ?? [];

fs.writeFileSync(RSS_RU, buildFeed(posts, 'ru'), 'utf8');
console.log(`[rss] written → ${RSS_RU}  (${posts.length} items)`);

const enPosts = posts.filter(p => p.text_en);
fs.writeFileSync(RSS_EN, buildFeed(posts, 'en'), 'utf8');
console.log(`[rss] written → ${RSS_EN}  (${enPosts.length} items)`);
